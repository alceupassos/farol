import requests
import time

BASE_URL = "http://localhost:8080"
TIMEOUT = 30

def get_jwt_token():
    auth_url = f"{BASE_URL}/auth/login"
    auth_payload = {
        "email": "demo@saudepublica.br",
        "password": "DemoPass123!"
    }
    resp = requests.post(auth_url, json=auth_payload, timeout=TIMEOUT)
    if resp.status_code == 404:
        assert False, f"Authentication endpoint not found at {auth_url}. Please verify the auth API implementation."
    resp.raise_for_status()
    return resp.json().get("access_token")

def create_demo_health_data(token):
    url = f"{BASE_URL}/health-data"
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}
    payload = {
        "patientId": "demo-patient-001",
        "metrics": {
            "heartRate": 72,
            "bloodPressure": "120/80",
            "glucoseLevel": 90,
            "oxygenSaturation": 98
        },
        "timestamp": int(time.time())
    }
    resp = requests.post(url, json=payload, headers=headers, timeout=TIMEOUT)
    resp.raise_for_status()
    return resp.json().get("id")

def delete_health_data(resource_id, token):
    url = f"{BASE_URL}/health-data/{resource_id}"
    headers = {"Authorization": f"Bearer {token}"}
    resp = requests.delete(url, headers=headers, timeout=TIMEOUT)
    if resp.status_code not in (204, 200, 404):
        resp.raise_for_status()

def test_ai_analytics_predictive_insights():
    token = get_jwt_token()
    headers = {"Authorization": f"Bearer {token}"}

    # Create sample health data to trigger predictive analytics
    resource_id = create_demo_health_data(token)

    try:
        # Call the AI analytics dashboard predictive insights endpoint
        url = f"{BASE_URL}/analytics/ai/predictive-insights"
        params = {"patientId": "demo-patient-001"}
        resp = requests.get(url, headers=headers, params=params, timeout=TIMEOUT)

        # Validate response status code
        assert resp.status_code == 200, f"Expected 200 OK, got {resp.status_code}"

        data = resp.json()

        # Validate presence of required fields
        assert "predictiveAnalysis" in data, "'predictiveAnalysis' missing in response"
        assert "advancedInsights" in data, "'advancedInsights' missing in response"

        predictive = data["predictiveAnalysis"]
        insights = data["advancedInsights"]

        # Check predictiveAnalysis structure and reasonable values
        assert isinstance(predictive, dict), "'predictiveAnalysis' should be a dict"
        for key in ["riskScore", "trend", "recommendations"]:
            assert key in predictive, f"'{key}' missing in predictiveAnalysis"
        assert 0 <= predictive["riskScore"] <= 1, "'riskScore' should be between 0 and 1"
        assert isinstance(predictive["recommendations"], list), "'recommendations' should be a list"
        assert len(predictive["recommendations"]) > 0, "'recommendations' should not be empty"

        # Check advancedInsights structure
        assert isinstance(insights, dict), "'advancedInsights' should be a dict"
        assert "summary" in insights, "'summary' missing in advancedInsights"
        assert "detailedMetrics" in insights, "'detailedMetrics' missing in advancedInsights"
        assert isinstance(insights["detailedMetrics"], dict), "'detailedMetrics' should be a dict"

        # Validate that detailedMetrics keys correspond to input health metrics (example)
        expected_metrics = {"heartRate", "bloodPressure", "glucoseLevel", "oxygenSaturation"}
        metric_keys = set(insights["detailedMetrics"].keys())
        assert expected_metrics.issubset(metric_keys), "Some expected detailedMetrics keys are missing"

        # Additional sanity checks on values (example)
        hr = insights["detailedMetrics"]["heartRate"]
        assert isinstance(hr, (int, float)) and hr > 0, "Invalid heartRate in detailedMetrics"

        # Check response headers for security
        assert "content-security-policy" in resp.headers or "Content-Security-Policy" in resp.headers

    finally:
        # Clean up created health data
        delete_health_data(resource_id, token)

test_ai_analytics_predictive_insights()
