import requests
import base64
import json
import time

BASE_URL = "http://localhost:8080"
TIMEOUT = 30

# Dummy credentials for authentication - replace with valid test credentials
TEST_USER = {
    "email": "municipal_gestor@test.com",
    "password": "TestPass123!"
}

def authenticate(email, password):
    url = f"{BASE_URL}/login"
    payload = {"email": email, "password": password}
    headers = {"Content-Type": "application/json"}
    try:
        response = requests.post(url, json=payload, headers=headers, timeout=TIMEOUT)
        response.raise_for_status()
        data = response.json()
        token = data.get("access_token") or data.get("token")
        assert token, "Authentication token not found in response"
        return token
    except requests.RequestException as e:
        raise AssertionError(f"Authentication request failed: {e}")
    except ValueError:
        raise AssertionError("Invalid JSON response during authentication")

def get_municipal_dashboard(token):
    url = f"{BASE_URL}/dashboard/municipal"
    headers = {
        "Authorization": f"Bearer {token}",
        "Accept": "application/json"
    }
    try:
        response = requests.get(url, headers=headers, timeout=TIMEOUT)
        return response
    except requests.RequestException as e:
        raise AssertionError(f"Municipal dashboard request failed: {e}")

def decode_jwt_no_verify(token):
    # JWT format: header.payload.signature
    try:
        payload_part = token.split('.')[1]
        # Pad base64 string
        padding = '=' * (-len(payload_part) % 4)
        payload_bytes = base64.urlsafe_b64decode(payload_part + padding)
        payload_json = payload_bytes.decode('utf-8')
        return json.loads(payload_json)
    except Exception as e:
        raise AssertionError(f"JWT token decoding failed: {e}")

def test_municipal_dashboard_kpi_display():
    # Authenticate user to get valid JWT token
    token = authenticate(TEST_USER["email"], TEST_USER["password"])

    # Validate JWT token structure and expiry
    payload = decode_jwt_no_verify(token)
    assert "exp" in payload, "Token missing expiry"
    assert payload["exp"] > time.time(), "Token expired"
    # Role or scope validation
    roles = payload.get("roles") or payload.get("role") or []
    if isinstance(roles, str):
        roles = [roles]
    assert any(role in ["gestor", "municipal_manager"] for role in roles), "User role does not have municipal dashboard access"

    # Request municipal dashboard data
    response = get_municipal_dashboard(token)
    assert response.status_code == 200, f"Expected status 200, got {response.status_code}"

    try:
        data = response.json()
    except ValueError:
        raise AssertionError("Response is not valid JSON")

    # Validate key parts of dashboard response
    # KPIs
    kpis = data.get("kpis")
    assert isinstance(kpis, dict), "KPIs section missing or not a dict"
    assert "updatedAt" in data, "Dashboard data missing update timestamp"
    assert isinstance(kpis.get("indicators_sus"), dict), "SUS indicators missing or invalid"

    # Validate presence and correctness of key SUS indicators
    indicators = kpis.get("indicators_sus")
    essential_indicators = [
        "coverage_rate",
        "immunization_index",
        "hospital_admissions",
        "primary_care_score",
        "health_service_access"
    ]
    for indicator in essential_indicators:
        val = indicators.get(indicator)
        assert val is not None, f"Indicator '{indicator}' missing in SUS indicators"
        assert isinstance(val, (int, float)), f"Indicator '{indicator}' must be numeric"

    # Validate dark theme and glassmorphism style flags (backend flags)
    ui_config = data.get("ui_config")
    assert ui_config, "UI config missing in dashboard data"
    # Theme validation
    theme = ui_config.get("theme")
    assert theme == "dark", f"Expected theme 'dark', got '{theme}'"
    # Glassmorphism effect flag
    glassmorphism = ui_config.get("glassmorphism")
    assert isinstance(glassmorphism, bool), "Glassmorphism flag missing or not boolean"
    assert glassmorphism is True, "Glassmorphism style flag should be true"

    # Additional schema sanity checks: timestamps, data types
    updated_at = data.get("updatedAt")
    assert isinstance(updated_at, str), "updatedAt should be a string timestamp"
    # Optionally parse ISO8601 timestamp
    from datetime import datetime
    try:
        datetime.fromisoformat(updated_at.replace("Z", "+00:00"))
    except Exception:
        raise AssertionError("updatedAt timestamp is not valid ISO8601 format")

    # Security headers check (common security headers)
    # Example: check CORS and CSP headers are present
    security_headers = ["Content-Security-Policy", "X-Content-Type-Options", "Strict-Transport-Security", "X-Frame-Options"]
    for header in security_headers:
        # header names can vary, ignore case
        if not any(h.lower() == header.lower() for h in response.headers):
            # Not all headers may be present, just warn/assert some critical ones:
            if header in ["Content-Security-Policy", "X-Content-Type-Options"]:
                raise AssertionError(f"Security header '{header}' missing in response")


test_municipal_dashboard_kpi_display()
