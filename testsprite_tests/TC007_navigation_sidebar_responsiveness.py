import requests
import time

BASE_URL = "http://localhost:8080"
TIMEOUT = 30

# Sample user profiles with expected layout indicators for validation
USER_PROFILES = [
    {
        "role": "Gestor",
        "auth_payload": {"email": "gestor@example.com", "password": "GestorPass123"},
        "expected_redirect": "/dashboard/municipal",
        "sidebar_indicator": "Municipal KPIs",
        "navbar_indicator": "Gestor Menu",
    },
    {
        "role": "Hospital",
        "auth_payload": {"email": "hospital@example.com", "password": "HospitalPass123"},
        "expected_redirect": "/dashboard/hospital",
        "sidebar_indicator": "Gestão de Leitos",
        "navbar_indicator": "Hospital Menu",
    },
    {
        "role": "Médico",
        "auth_payload": {"email": "medico@example.com", "password": "MedicoPass123"},
        "expected_redirect": "/dashboard/medico",
        "sidebar_indicator": "Protocolos Clínicos",
        "navbar_indicator": "Médico Menu",
    },
    {
        "role": "Paciente",
        "auth_payload": {"email": "paciente@example.com", "password": "PacientePass123"},
        "expected_redirect": "/dashboard/paciente",
        "sidebar_indicator": "Histórico Médico",
        "navbar_indicator": "Paciente Menu",
    },
]

def test_navigation_sidebar_responsiveness():
    session = requests.Session()
    session.headers.update({"Content-Type": "application/json"})

    try:
        for profile in USER_PROFILES:
            # Authenticate user and get JWT token
            auth_resp = session.post(
                f"{BASE_URL}/auth/login",
                json=profile["auth_payload"],
                timeout=TIMEOUT
            )
            assert auth_resp.status_code == 200, f"Auth failed for {profile['role']}"
            auth_data = auth_resp.json()
            token = auth_data.get("access_token")
            assert token, f"No token received for {profile['role']}"

            # Update session headers with Authorization for subsequent requests
            session.headers.update({"Authorization": f"Bearer {token}"})

            # Access profile switch endpoint to emulate dynamic profile switching
            switch_resp = session.post(
                f"{BASE_URL}/auth/switch-profile",
                json={"role": profile["role"]},
                timeout=TIMEOUT
            )
            assert switch_resp.status_code == 200, f"Profile switch failed for {profile['role']}"
            switch_data = switch_resp.json()
            
            # Verify redirection URL for dashboard based on profile
            redirect_url = switch_data.get("redirect_url")
            assert redirect_url == profile["expected_redirect"], \
                f"Redirect URL mismatch for {profile['role']}: expected {profile['expected_redirect']}, got {redirect_url}"

            # Access the dashboard page for the profile
            dash_resp = session.get(f"{BASE_URL}{redirect_url}", timeout=TIMEOUT)
            assert dash_resp.status_code == 200, f"Dashboard access failed for {profile['role']}"

            dash_json = dash_resp.json()

            # Validate presence of dynamic sidebar data appropriate for profile
            sidebar = dash_json.get("sidebar")
            assert sidebar, f"No sidebar data for {profile['role']}"
            assert profile["sidebar_indicator"] in sidebar.get("content", ""), \
                f"Sidebar content mismatch for {profile['role']}"

            # Validate presence of navbar info appropriate for profile
            navbar = dash_json.get("navbar")
            assert navbar, f"No navbar data for {profile['role']}"
            assert profile["navbar_indicator"] in navbar.get("content", ""), \
                f"Navbar content mismatch for {profile['role']}"

            # Validate specialized layout configuration for the profile
            layout = dash_json.get("layout")
            assert layout, f"No layout data for {profile['role']}"
            assert layout.get("profile") == profile["role"], \
                f"Layout profile mismatch for {profile['role']}"

            # Additional backend checks for responsiveness: quick response time
            response_time = dash_resp.elapsed.total_seconds()
            assert response_time < 2, f"Dashboard response time too high for {profile['role']}: {response_time}s"

            # Emulate rapid profile switching to test dynamic behavior
            for switch_role in USER_PROFILES:
                if switch_role["role"] == profile["role"]:
                    continue
                sr_resp = session.post(
                    f"{BASE_URL}/auth/switch-profile",
                    json={"role": switch_role["role"]},
                    timeout=TIMEOUT
                )
                assert sr_resp.status_code == 200, f"Rapid switch failed from {profile['role']} to {switch_role['role']}"

            # Clear Authorization header for next profile test
            session.headers.pop("Authorization", None)

    except requests.RequestException as e:
        assert False, f"Request failed: {str(e)}"


test_navigation_sidebar_responsiveness()
