import requests
import time
import base64
import json

BASE_URL = "http://localhost:8080"
TIMEOUT = 30

# Assuming we have credentials for hospital admin profile for authentication
AUTH_CREDENTIALS = {
    "username": "hospital_admin",
    "password": "securepassword123"
}

def authenticate_get_jwt():
    url = f"{BASE_URL}/auth/login"
    headers = {"Content-Type": "application/json"}
    resp = requests.post(url, json=AUTH_CREDENTIALS, headers=headers, timeout=TIMEOUT)
    assert resp.status_code == 200, f"Authentication failed with status {resp.status_code}"
    json_resp = resp.json()
    assert "access_token" in json_resp, "No access_token in authentication response"
    return json_resp["access_token"]

def decode_jwt_payload(token):
    try:
        _, payload_b64, _ = token.split('.')
        padding = '=' * (-len(payload_b64) % 4)
        payload_b64 += padding
        decoded_bytes = base64.urlsafe_b64decode(payload_b64)
        payload = json.loads(decoded_bytes)
        return payload
    except Exception as e:
        assert False, f"Failed to decode JWT payload: {str(e)}"

def test_hospital_dashboard_operational_indicators():
    token = None
    headers = None
    try:
        # Authenticate to get JWT token
        token = authenticate_get_jwt()
        headers = {
            "Authorization": f"Bearer {token}",
            "Accept": "application/json"
        }

        # 1. Validate Hospital Dashboard Operational Indicators
        dashboard_url = f"{BASE_URL}/api/dashboard/hospital/operational-indicators"
        resp = requests.get(dashboard_url, headers=headers, timeout=TIMEOUT)
        assert resp.status_code == 200, f"Dashboard API returned {resp.status_code}"
        data = resp.json()

        # Check existence and types of key operational indicators
        expected_keys = [
            "bedManagement",
            "billingInfo",
            "analysisReports",
            "operationalMetrics"
        ]
        for key in expected_keys:
            assert key in data, f"Missing key '{key}' in dashboard response"

        # Validate bed management data format
        beds = data["bedManagement"]
        assert isinstance(beds, dict), "bedManagement should be a dictionary"
        assert "totalBeds" in beds and isinstance(beds["totalBeds"], int), "totalBeds missing or not integer"
        assert "occupiedBeds" in beds and isinstance(beds["occupiedBeds"], int), "occupiedBeds missing or not integer"
        assert 0 <= beds["occupiedBeds"] <= beds["totalBeds"], "occupiedBeds out of valid range"

        # Validate billing information format
        billing = data["billingInfo"]
        assert isinstance(billing, dict), "billingInfo should be a dictionary"
        assert "totalBilled" in billing and isinstance(billing["totalBilled"], (int, float)), "totalBilled missing or invalid"
        assert "pendingPayments" in billing and isinstance(billing["pendingPayments"], (int, float)), "pendingPayments missing or invalid"

        # Validate analysis reports presence
        reports = data["analysisReports"]
        assert isinstance(reports, list), "analysisReports should be a list"
        # If reports not empty, check structure of first report
        if reports:
            report = reports[0]
            assert isinstance(report, dict), "Each report should be a dict"
            assert "reportId" in report and isinstance(report["reportId"], str), "reportId missing or invalid"
            assert "title" in report and isinstance(report["title"], str), "title missing or invalid"
            assert "generatedAt" in report, "generatedAt missing"

        # Validate operational metrics
        metrics = data.get("operationalMetrics")
        assert metrics and isinstance(metrics, dict), "operationalMetrics missing or invalid"
        # Example: check 'averageLengthOfStay' metric
        avg_los = metrics.get("averageLengthOfStay")
        assert avg_los is not None and isinstance(avg_los, (int, float)), "averageLengthOfStay metric missing or invalid"
        assert avg_los > 0, "averageLengthOfStay should be positive"

        # 2. Test backend database integrations by checking RTD/Supabase health endpoint
        health_url = f"{BASE_URL}/api/health"
        health_resp = requests.get(health_url, headers=headers, timeout=TIMEOUT)
        assert health_resp.status_code == 200, f"Health check returned {health_resp.status_code}"
        health_data = health_resp.json()
        # Check db and external integrations status keys are present
        for service in ["database", "supabaseAuth", "datasusApis", "erpIntegration"]:
            assert service in health_data, f"Health status missing {service}"
            assert health_data[service] == "ok", f"{service} status not ok: {health_data[service]}"

        # 3. Security checks: Validate JWT token structure and expiration
        try:
            payload = decode_jwt_payload(token)
            assert "exp" in payload, "JWT token missing expiration"
            exp = payload["exp"]
            now = int(time.time())
            assert exp > now, "JWT token expired"
        except Exception as e:
            assert False, f"JWT token decode error: {str(e)}"

        # 4. Rate limiting and performance basic check: issue multiple calls under short delay
        times = []
        for _ in range(3):
            start = time.time()
            r = requests.get(dashboard_url, headers=headers, timeout=TIMEOUT)
            duration = time.time() - start
            times.append(duration)
            assert r.status_code == 200, f"Dashboard API call failed with status {r.status_code}"

        avg_response = sum(times) / len(times)
        assert avg_response < 2, f"Average response time {avg_response}s exceeds 2s performance requirement"

    except requests.RequestException as e:
        assert False, f"Request failed: {str(e)}"
    finally:
        # Optionally, perform logout or cleanup if the API supports it
        if token and headers:
            try:
                requests.post(f"{BASE_URL}/auth/logout", headers=headers, timeout=TIMEOUT)
            except Exception:
                pass


test_hospital_dashboard_operational_indicators()