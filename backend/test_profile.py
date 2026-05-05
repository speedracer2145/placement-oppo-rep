import requests

url = "http://127.0.0.1:8000/api/profile/extract"
files = {'resume': ('mock_resume.pdf', open('mock_resume.pdf', 'rb'), 'application/pdf')}

try:
    print("Sending POST request to /api/profile/extract...")
    response = requests.post(url, files=files)
    print(f"Status Code: {response.status_code}")
    print(f"Response Body: {response.text}")
except Exception as e:
    print(f"Request failed: {e}")
