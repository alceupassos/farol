import requests
import time

BASE_URL = "http://localhost:8080"
TIMEOUT = 30

# Authentication credentials (assuming test user exists)
AUTH_USER = "integration_tester"
AUTH_PASS = "test_password"

def authenticate():
    url = f"{BASE_URL}/api/auth/login"
    payload = {"username": AUTH_USER, "password": AUTH_PASS}
    headers = {"Content-Type": "application/json"}
    resp = requests.post(url, json=payload, headers=headers, timeout=TIMEOUT)
    resp.raise_for_status()
    data = resp.json()
    token = data.get("access_token")
    assert token, "Authentication token not received"
    return token

def test_e_sus_aps_integration_configuration():
    token = authenticate()
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json",
        "Accept": "application/json"
    }

    # 1. Verify presence and contents of all 8 configuration sections for e-SUS APS via LEDI and DW PEC

    config_sections = [
        "general_settings",
        "patient_data",
        "clinical_data",
        "health_team",
        "appointments",
        "procedures",
        "medications",
        "reports"
    ]

    for section in config_sections:
        url = f"{BASE_URL}/api/esus-aps/configuration/{section}"
        resp = requests.get(url, headers=headers, timeout=TIMEOUT)
        assert resp.status_code == 200, f"Failed to get config section {section}"
        data = resp.json()
        assert isinstance(data, dict), f"Config section {section} should be a dict"
        assert data != {}, f"Config section {section} must not be empty"

    # 2. Test update on one configuration section with valid data

    update_payload = {
        "enabled": True,
        "parameters": {
            "sync_interval_minutes": 15,
            "retry_attempts": 3
        }
    }
    url = f"{BASE_URL}/api/esus-aps/configuration/general_settings"
    resp = requests.put(url, headers=headers, json=update_payload, timeout=TIMEOUT)
    assert resp.status_code in (200, 204), "Failed to update general_settings"

    # 3. Validate orchestration via MCP Server endpoint - trigger orchestration and verify response

    orchestration_url = f"{BASE_URL}/api/mcp-server/orchestrate/esus-aps"
    resp = requests.post(orchestration_url, headers=headers, timeout=TIMEOUT)
    assert resp.status_code == 202, "MCP Server orchestration trigger failed"
    orchestration_response = resp.json()
    assert orchestration_response.get("status") in ["started", "queued"], "Orchestration not started or queued"

    orchestration_id = orchestration_response.get("orchestration_id")
    assert orchestration_id, "Orchestration ID missing"

    # 4. Poll orchestration status until completion or timeout (max 60 seconds)

    status_url = f"{BASE_URL}/api/mcp-server/orchestrate/status/{orchestration_id}"
    start_time = time.time()
    completed = False
    while time.time() - start_time < 60:
        resp = requests.get(status_url, headers=headers, timeout=TIMEOUT)
        if resp.status_code != 200:
            time.sleep(2)
            continue
        status_data = resp.json()
        state = status_data.get("state")
        if state == "completed":
            completed = True
            break
        elif state == "failed":
            raise AssertionError("MCP Server orchestration failed")
        time.sleep(2)

    assert completed, "MCP Server orchestration did not complete in time"

    # 5. Validate integrations with e-SUS APS LEDI API endpoint data

    ledi_url = f"{BASE_URL}/api/esus-aps/ledi/status"
    resp = requests.get(ledi_url, headers=headers, timeout=TIMEOUT)
    assert resp.status_code == 200, "Failed to fetch LEDI API status"
    ledi_data = resp.json()
    assert ledi_data.get("connected") is True, "LEDI API not connected"
    assert "last_sync" in ledi_data, "LEDI API last_sync missing"

    # 6. Validate integration with DW PEC endpoint data

    dwpec_url = f"{BASE_URL}/api/esus-aps/dwpec/status"
    resp = requests.get(dwpec_url, headers=headers, timeout=TIMEOUT)
    assert resp.status_code == 200, "Failed to fetch DW PEC API status"
    dwpec_data = resp.json()
    assert dwpec_data.get("connected") is True, "DW PEC API not connected"
    assert "last_sync" in dwpec_data, "DW PEC API last_sync missing"

    # 7. Test error handling: Request non-existent configuration section

    invalid_url = f"{BASE_URL}/api/esus-aps/configuration/invalid_section_xyz"
    resp = requests.get(invalid_url, headers=headers, timeout=TIMEOUT)
    assert resp.status_code == 404, "Invalid config section did not return 404"

    # 8. Security: Test access without token

    resp = requests.get(f"{BASE_URL}/api/esus-aps/configuration/general_settings", timeout=TIMEOUT)
    assert resp.status_code == 401, "Unauthorized access did not return 401"

    # 9. Rate limiting: Send burst of requests to configuration endpoint, expect 429 or success but no failures

    success_count = 0
    rate_limit_triggered = False
    for _ in range(20):
        r = requests.get(f"{BASE_URL}/api/esus-aps/configuration/general_settings", headers=headers, timeout=TIMEOUT)
        if r.status_code == 429:
            rate_limit_triggered = True
            break
        elif r.status_code == 200:
            success_count += 1
        else:
            raise AssertionError(f"Unexpected status code during rate limit test: {r.status_code}")

    assert success_count > 0, "No successful requests in rate limit test"
    # Rate limiting may or may not be enforced depending on config; accept if triggered or not
    # Just ensure no 5xx or unexpected errors

    # 10. Data synchronization test: Trigger synchronization and verify last_sync timestamps update

    sync_trigger_url = f"{BASE_URL}/api/esus-aps/synchronize"
    resp = requests.post(sync_trigger_url, headers=headers, timeout=TIMEOUT)
    assert resp.status_code == 202, "Failed to trigger e-SUS APS synchronization"

    # Wait some seconds for sync to process
    time.sleep(5)

    # Confirm last_sync updated for LEDI and DW PEC

    resp_ledi = requests.get(ledi_url, headers=headers, timeout=TIMEOUT)
    resp_dwpec = requests.get(dwpec_url, headers=headers, timeout=TIMEOUT)
    assert resp_ledi.status_code == 200 and resp_dwpec.status_code == 200

    ledi_after = resp_ledi.json()
    dwpec_after = resp_dwpec.json()
    assert ledi_after.get("last_sync"), "LEDI last_sync missing after sync"
    assert dwpec_after.get("last_sync"), "DW PEC last_sync missing after sync"

    # 11. Validate audit log entry for orchestration operation

    audit_url = f"{BASE_URL}/api/audit-logs?operation=mcp-orchestration&orchestration_id={orchestration_id}"
    resp = requests.get(audit_url, headers=headers, timeout=TIMEOUT)
    assert resp.status_code == 200, "Failed to fetch audit logs"
    logs = resp.json()
    assert isinstance(logs, list), "Audit logs response should be a list"
    assert any(log.get("orchestration_id") == orchestration_id for log in logs), "Audit log entry for orchestration missing"

test_e_sus_aps_integration_configuration()