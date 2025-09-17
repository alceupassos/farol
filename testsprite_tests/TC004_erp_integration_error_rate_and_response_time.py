import requests
import time

BASE_URL = "http://localhost:8080"
TIMEOUT = 30
HEADERS = {
    "Accept": "application/json",
    "Content-Type": "application/json"
}

# Endpoints for ERP integrations and DATASUS APIs as available (simulate checking several)
ERP_ENDPOINTS = [
    "/api/erp/philips-tasy/status",
    "/api/erp/soul-mv/status"
]

DATASUS_ENDPOINTS = [
    "/api/datasus/rnds/status",
    "/api/datasus/cnes/status",
    "/api/datasus/sigtap/status",
    "/api/datasus/esus-aps-ledi/status"
]

def test_erp_and_datasus_integration_error_rate_and_response_time():
    total_requests = 0
    total_errors = 0
    max_response_time_ms = 0

    def check_endpoints(endpoints, source_name):
        nonlocal total_requests, total_errors, max_response_time_ms
        for endpoint in endpoints:
            url = f"{BASE_URL}{endpoint}"
            try:
                start = time.time()
                resp = requests.get(url, headers=HEADERS, timeout=TIMEOUT)
                elapsed_ms = (time.time() - start) * 1000
                total_requests += 1
                max_response_time_ms = max(max_response_time_ms, elapsed_ms)

                # Check HTTP status 200 OK
                assert resp.status_code == 200, f"{source_name} endpoint {endpoint} returned status {resp.status_code}"

                # Basic content validation: expect JSON with a 'status' field = 'ok' or similar
                json_data = resp.json()
                status = json_data.get("status") or json_data.get("connection_status") or ""
                assert status.lower() in ("ok", "connected", "success"), f"{source_name} endpoint {endpoint} status not ok: {status}"

                # Response time under 500 ms
                assert elapsed_ms < 500, f"{source_name} endpoint {endpoint} response time {elapsed_ms:.2f}ms exceeds 500ms"

            except (requests.Timeout, requests.ConnectionError) as e:
                total_requests += 1
                total_errors += 1
            except AssertionError as e:
                total_errors += 1
                raise
            except Exception as e:
                total_requests += 1
                total_errors += 1
                raise

    try:
        # Check ERP endpoints
        check_endpoints(ERP_ENDPOINTS, "ERP")

        # Check DATASUS endpoints
        check_endpoints(DATASUS_ENDPOINTS, "DATASUS")

        # Calculate error rate
        if total_requests == 0:
            raise AssertionError("No requests were made to ERP or DATASUS endpoints")

        error_rate = (total_errors / total_requests) * 100

        assert error_rate < 1, f"Error rate too high: {error_rate:.2f}% (Must be below 1%)"
        assert max_response_time_ms < 500, f"Some requests exceeded max response time: {max_response_time_ms:.2f}ms (Must be below 500ms)"
    except AssertionError:
        raise
    except Exception as exc:
        raise AssertionError(f"An unexpected error occurred during ERP and DATASUS integration testing: {exc}")


test_erp_and_datasus_integration_error_rate_and_response_time()