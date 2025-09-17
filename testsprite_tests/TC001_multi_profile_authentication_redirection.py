import requests
from requests.exceptions import RequestException, Timeout

BASE_URL = "http://localhost:8080"
TIMEOUT = 30  # seconds
HEADERS = {
    "Content-Type": "application/json"
}

# Profiles and their expected dashboard paths for redirection
PROFILE_DASHBOARD_PATHS = {
    "Gestor": "/dashboard/gestor",
    "Hospital": "/dashboard/hospital",
    "Médico": "/dashboard/medico",
    "Paciente": "/dashboard/paciente",
}

def create_demo_user():
    """
    Uses the Supabase edge function to create a demo user with multiple profiles.
    Returns the user credentials and user ID.
    """
    url = f"{BASE_URL}/edge-functions/create-demo-user"
    try:
        response = requests.post(url, timeout=TIMEOUT)
        response.raise_for_status()
        return response.json()  # Expecting at least { "email": ..., "password": ..., "user_id": ... }
    except (RequestException, Timeout) as e:
        raise RuntimeError(f"Failed to create demo user: {e}")

def delete_user(user_id, jwt_token):
    """
    Deletes a user by ID using the authentication service or user management API.
    Assumes an endpoint DELETE /users/{user_id} with JWT auth.
    """
    url = f"{BASE_URL}/api/users/{user_id}"
    headers = HEADERS.copy()
    headers["Authorization"] = f"Bearer {jwt_token}"
    try:
        response = requests.delete(url, headers=headers, timeout=TIMEOUT)
        response.raise_for_status()
    except (RequestException, Timeout):
        # Try best effort, do not fail test on cleanup
        pass

def authenticate_user(email, password):
    """
    Authenticates user credentials to receive a JWT token.
    Expects POST /auth/login with JSON body {email, password} returning {access_token, refresh_token, profiles}
    """
    url = f"{BASE_URL}/api/auth/login"
    payload = {
        "email": email,
        "password": password
    }
    try:
        response = requests.post(url, json=payload, headers=HEADERS, timeout=TIMEOUT)
        response.raise_for_status()
        data = response.json()
        if "access_token" not in data or "profiles" not in data:
            raise RuntimeError("Authentication response missing required fields.")
        return data
    except (RequestException, Timeout) as e:
        raise RuntimeError(f"Authentication failed: {e}")

def switch_profile(token, profile):
    """
    Switches the active profile using an API endpoint.
    POST /api/auth/switch-profile with JSON {profile} and Authorization header.
    Returns redirect URL in response JSON {redirect_url}
    """
    url = f"{BASE_URL}/api/auth/switch-profile"
    headers = HEADERS.copy()
    headers["Authorization"] = f"Bearer {token}"
    payload = {"profile": profile}
    try:
        response = requests.post(url, json=payload, headers=headers, timeout=TIMEOUT)
        response.raise_for_status()
        data = response.json()
        if "redirect_url" not in data:
            raise RuntimeError("Profile switch response missing redirect_url.")
        return data["redirect_url"]
    except (RequestException, Timeout) as e:
        raise RuntimeError(f"Profile switch failed for profile '{profile}': {e}")

def test_multi_profile_authentication_redirection():
    demo_user = None
    jwt_token = None
    user_id = None

    try:
        # Step 1: Create demo user with multiple profiles
        demo_user = create_demo_user()
        email = demo_user.get("email")
        password = demo_user.get("password")
        user_id = demo_user.get("user_id")
        assert email and password and user_id, "Demo user response missing required fields."
        
        # Step 2: Authenticate user to get JWT token and available profiles
        auth_data = authenticate_user(email, password)
        jwt_token = auth_data["access_token"]
        profiles = auth_data["profiles"]  # Expecting list of profile names
        
        # Validate all expected profiles exist
        expected_profiles = set(PROFILE_DASHBOARD_PATHS.keys())
        user_profiles = set(profiles)
        assert expected_profiles.issubset(user_profiles), f"User profiles {user_profiles} do not include all expected {expected_profiles}"
        
        # Step 3 & 4: For each profile, switch profile and validate redirect URL matches expected dashboard
        for profile in expected_profiles:
            redirect_url = switch_profile(jwt_token, profile)
            assert redirect_url.startswith(BASE_URL), f"Redirect URL does not start with base URL: {redirect_url}"
            expected_path = PROFILE_DASHBOARD_PATHS[profile]
            assert redirect_url.endswith(expected_path), (
                f"Redirect URL '{redirect_url}' does not end with expected dashboard path '{expected_path}' for profile '{profile}'"
            )
    finally:
        # Cleanup: delete demo user if created and JWT token available
        if user_id and jwt_token:
            delete_user(user_id, jwt_token)

test_multi_profile_authentication_redirection()