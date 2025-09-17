import requests
import time

BASE_URL = "http://localhost:8080"
TIMEOUT = 30
HEADERS = {
    "Content-Type": "application/json"
}

def authenticate_user(username: str, password: str) -> str:
    """
    Authenticate user and return JWT token.
    """
    url = f"{BASE_URL}/api/auth/login"
    payload = {
        "username": username,
        "password": password
    }
    response = requests.post(url, json=payload, timeout=TIMEOUT)
    response.raise_for_status()
    token = response.json().get("access_token")
    assert token, "Authentication failed, no access token received."
    return token

def create_test_user():
    """
    Create a demo user using Supabase edge function 'create-demo-user'.
    Returns the user's credentials and user id.
    """
    url = f"{BASE_URL}/api/supabase/create-demo-user"
    response = requests.post(url, timeout=TIMEOUT)
    response.raise_for_status()
    data = response.json()
    user_id = data.get("id")
    username = data.get("username")
    password = data.get("password")
    assert user_id and username and password, "User creation failed or incomplete data."
    return user_id, username, password

def delete_test_user(user_id: str, token: str):
    """
    Delete the created test user by user_id using admin endpoint.
    """
    url = f"{BASE_URL}/api/users/{user_id}"
    headers = {
        **HEADERS,
        "Authorization": f"Bearer {token}"
    }
    response = requests.delete(url, headers=headers, timeout=TIMEOUT)
    assert response.status_code in (200, 204), f"Failed to delete test user: {response.text}"

def get_user_profile_alerts(token: str):
    """
    Fetch epidemic alerts, risk maps, and neighborhood indicators for authenticated user.
    """
    url = f"{BASE_URL}/api/epidemic/alerts"
    headers = {
        **HEADERS,
        "Authorization": f"Bearer {token}"
    }
    response = requests.get(url, headers=headers, timeout=TIMEOUT)
    return response

def test_epidemic_alert_notifications():
    """
    Test the epidemic alert system:
    - Authenticate user (create demo user if needed)
    - Validate automatic notifications are sent
    - Validate risk maps and indicators by neighborhood per user profile
    - Authentication using Supabase edge function
    - Test error handling for invalid token
    - Check response performance (response time < 2 seconds)
    """
    user_id = None
    token = None
    try:
        # Create demo user and get credentials
        user_id, username, password = create_test_user()

        # Authenticate to get JWT token
        token = authenticate_user(username, password)

        # Check epidemic alerts endpoint with valid token
        start_time = time.time()
        response = get_user_profile_alerts(token)
        duration = time.time() - start_time

        assert response.status_code == 200, f"Unexpected status code: {response.status_code}"
        data = response.json()

        # Validate structure of response (risk maps, notifications, indicators)
        assert "notifications" in data, "Missing 'notifications' in response"
        assert isinstance(data["notifications"], list), "'notifications' should be a list"

        assert "risk_maps" in data, "Missing 'risk_maps' in response"
        assert isinstance(data["risk_maps"], dict), "'risk_maps' should be a dict"

        assert "neighborhood_indicators" in data, "Missing 'neighborhood_indicators' in response"
        assert isinstance(data["neighborhood_indicators"], list), "'neighborhood_indicators' should be a list"

        # Check notifications have expected fields
        for notif in data["notifications"]:
            assert "id" in notif and "message" in notif and "date" in notif, "Notification missing expected fields"

        # Check risk_maps contains keys representing neighborhoods or areas
        assert any(isinstance(v, dict) for v in data["risk_maps"].values()), "Risk maps data malformed"

        # Check response time performance (less than 2 seconds)
        assert duration < 2, f"API response time too high: {duration}s"

        # Test with invalid token: expect 401 Unauthorized
        invalid_headers = {
            **HEADERS,
            "Authorization": "Bearer invalid.token.here"
        }
        invalid_resp = requests.get(f"{BASE_URL}/api/epidemic/alerts", headers=invalid_headers, timeout=TIMEOUT)
        assert invalid_resp.status_code == 401, f"Expected 401 for invalid token, got {invalid_resp.status_code}"

    finally:
        # Cleanup: Delete test user if created and token available
        if user_id and token:
            try:
                delete_test_user(user_id, token)
            except Exception as e:
                print(f"Warning: failed to delete test user: {e}")

test_epidemic_alert_notifications()