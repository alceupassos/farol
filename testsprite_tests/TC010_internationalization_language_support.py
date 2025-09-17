import requests
import time

BASE_URL = "http://localhost:8080"
TIMEOUT = 30
HEADERS = {
    "Accept": "application/json"
}

def test_internationalization_language_support():
    """
    Test the internationalization system for PT, EN, ES, FR languages.
    It will check REST API and Supabase authentication endpoints that support language param,
    verify translations keys and also test selecting dashboards with language headers.
    """

    languages = {
        "pt": "Português",
        "en": "English",
        "es": "Español",
        "fr": "Français"
    }

    # 1. Test authentication endpoint supports language param and returns messages in the selected language
    auth_url = f"{BASE_URL}/auth/login"
    # Dummy credentials for test; if auth service requires actual, adapt as needed.
    credentials = {"email": "testuser@example.com", "password": "TestPass123!"}

    for lang_code, lang_name in languages.items():
        try:
            # Sending Accept-Language header to test backend language recognition
            headers = HEADERS.copy()
            headers["Accept-Language"] = lang_code

            # POST login
            resp = requests.post(auth_url, json=credentials, headers=headers, timeout=TIMEOUT)
            assert resp.status_code in (200, 401), f"Unexpected status {resp.status_code} on login with lang {lang_code}"
            resp_json = resp.json()

            # Check that response message (if any) contains expected language keywords for validation
            # We use a simple heuristic: check known common messages or welcome text translations
            messages = [
                # Common login errors translations:
                {"pt": "senha", "en": "password", "es": "contraseña", "fr": "mot de passe"},
            ]

            # Check at least one keyword from messages for each language is found in response texts (keys and values)
            matching = any(
                (lang_code in messages[0] and messages[0][lang_code].lower() in str(resp_json).lower())
                for _ in [0]
            )
            # If 401 unauthorized, message usually contain the password word in their language
            assert matching or resp.status_code == 200, f"Response does not contain expected language elements for {lang_name}"

        except Exception as e:
            raise AssertionError(f"Auth endpoint language test failed for {lang_name}: {str(e)}")

    # 2. Test localization endpoint or public translations files availability (simulate fetching common translation resource)
    # Assuming an endpoint convention: GET /locales/{lang}/common.json or similar
    for lang_code, lang_name in languages.items():
        try:
            url = f"{BASE_URL}/locales/{lang_code}/common.json"
            r = requests.get(url, headers=HEADERS, timeout=TIMEOUT)
            assert r.status_code == 200, f"Failed to get translations JSON for language {lang_name}"
            json_data = r.json()
            # Basic validation: check some keys known in translations e.g. "welcome", "logout"
            expected_keys = ["welcome", "logout", "login", "dashboard"]
            missing_keys = [k for k in expected_keys if k not in json_data]
            assert not missing_keys, f"Missing keys in {lang_name} translation JSON: {missing_keys}"

        except Exception as e:
            raise AssertionError(f"Translations file test failed for {lang_name}: {str(e)}")

    # 3. Test dashboard redirect with Accept-Language header for different profiles returns content in right language
    # Step 1: Authenticate and get JWT token for a test user with multi-profile (simulate or create user)
    auth_login_url = f"{BASE_URL}/auth/login"
    user_credentials = {"email": "testuser@example.com", "password": "TestPass123!"}

    token = None
    try:
        res = requests.post(auth_login_url, json=user_credentials, headers=HEADERS, timeout=TIMEOUT)
        assert res.status_code == 200, "Failed to login test user for dashboard test"
        data = res.json()
        token = data.get("access_token") or data.get("token")
        assert token, "No access token received"
    except Exception as e:
        raise AssertionError(f"Authentication failed: {str(e)}")

    # Profiles to test dashboard redirection and language content
    profiles = {
        "gestor": "/dashboard/municipal",
        "hospital": "/dashboard/hospital",
        "medico": "/dashboard/medical",
        "paciente": "/dashboard/patient"
    }

    headers_auth = HEADERS.copy()
    headers_auth["Authorization"] = f"Bearer {token}"

    for lang_code, lang_name in languages.items():
        for profile, endpoint in profiles.items():
            try:
                headers_profile = headers_auth.copy()
                headers_profile["Accept-Language"] = lang_code

                url = f"{BASE_URL}{endpoint}"
                resp = requests.get(url, headers=headers_profile, timeout=TIMEOUT)
                assert resp.status_code == 200, f"Dashboard {profile} failed with status {resp.status_code} for language {lang_name}"
                content = resp.text.lower()

                # Check that content includes translated keywords typical for dashboards
                # Heuristic checks for presence of translated role name or dashboard keyword
                expected_strings = {
                    "pt": ["dashboard", "kpi", "gestor", "hospital", "médico", "paciente"],
                    "en": ["dashboard", "kpi", "manager", "hospital", "doctor", "patient"],
                    "es": ["tablero", "kpi", "gestor", "hospital", "médico", "paciente"],
                    "fr": ["tableau", "kpi", "gestionnaire", "hôpital", "médecin", "patient"]
                }
                check_strings = expected_strings.get(lang_code, [])
                found = any(s in content for s in check_strings)
                assert found, f"Dashboard content for profile {profile} missing translated keywords in {lang_name}"

            except Exception as e:
                raise AssertionError(f"Dashboard language test failed for profile {profile} in {lang_name}: {str(e)}")

    # 4. Test edge functions and real-time subscriptions language support (simulate call to edge function create-demo-user with language header)
    try:
        edge_url = f"{BASE_URL}/edge-functions/create-demo-user"
        for lang_code, lang_name in languages.items():
            headers_edge = HEADERS.copy()
            headers_edge["Accept-Language"] = lang_code
            resp = requests.post(edge_url, headers=headers_edge, timeout=TIMEOUT)
            assert resp.status_code == 200, f"Edge function create-demo-user failed for language {lang_name}"
            data = resp.json()
            # Check that any message in response is in the expected language (heuristic)
            msg = "message"
            if msg in data:
                msg_text = data[msg].lower()
                # Basic keywords check
                keywords = {
                    "pt": ["usuário", "criado"],
                    "en": ["user", "created"],
                    "es": ["usuario", "creado"],
                    "fr": ["utilisateur", "créé"]
                }
                key_checks = keywords.get(lang_code, [])
                found_key = any(k in msg_text for k in key_checks)
                assert found_key, f"Edge function message not localized properly for {lang_name}"

    except Exception as e:
        raise AssertionError(f"Edge function internationalization test failed: {str(e)}")

    # 5. Rate limiting and error handling tests with language headers
    # Send repeated invalid requests with Accept-Language header and check error messages are localized
    try:
        invalid_url = f"{BASE_URL}/auth/login"
        for lang_code, lang_name in languages.items():
            headers_invalid = HEADERS.copy()
            headers_invalid["Accept-Language"] = lang_code
            payload = {"email": "invalid", "password": ""}
            resp = requests.post(invalid_url, json=payload, headers=headers_invalid, timeout=TIMEOUT)
            assert resp.status_code in (400,401), f"Expected 400 or 401 on invalid login for {lang_name}"
            j = resp.json()
            # Check error message localized heuristically
            err_msg = str(j).lower()
            error_keywords = {
                "pt": ["inválido", "erro", "senha", "email"],
                "en": ["invalid", "error", "password", "email"],
                "es": ["inválido", "error", "contraseña", "correo"],
                "fr": ["invalide", "erreur", "mot de passe", "email"]
            }
            assert any(k in err_msg for k in error_keywords.get(lang_code, [])), f"Error message not localized for {lang_name}"

    except Exception as e:
        raise AssertionError(f"Error handling internationalization test failed: {str(e)}")

    # 6. Check that DATASUS external endpoints receive Accept-Language and respond correctly (simulate a simple GET with header)
    datasus_endpoints = [
        "/datasus/rnds",
        "/datasus/cnes",
        "/datasus/sigtap",
        "/datasus/esus-aps/ledi"
    ]

    for lang_code, lang_name in languages.items():
        headers_ds = HEADERS.copy()
        headers_ds["Accept-Language"] = lang_code
        for path in datasus_endpoints:
            try:
                url = f"{BASE_URL}{path}"
                resp = requests.get(url, headers=headers_ds, timeout=TIMEOUT)
                assert resp.status_code == 200, f"DATASUS endpoint {path} failed for language {lang_name}"
                json_data = resp.json()
                # Basic validation: keys present (simulate expected keys)
                expected_keys = {
                    "/datasus/rnds": ["patients", "last_update"],
                    "/datasus/cnes": ["facilities", "region"],
                    "/datasus/sigtap": ["procedures", "codes"],
                    "/datasus/esus-aps/ledi": ["configurations", "status"]
                }
                keys_needed = expected_keys.get(path, [])
                missing_keys = [k for k in keys_needed if k not in json_data]
                assert not missing_keys, f"Missing keys in {path} response for {lang_name}: {missing_keys}"
            except Exception as e:
                raise AssertionError(f"DATASUS endpoint {path} internationalization test failed for {lang_name}: {str(e)}")

    print("Test TC010 internationalization language support passed successfully.")

test_internationalization_language_support()