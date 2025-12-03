# ['23.020 V', '0.01599 V', '1598.000 mA', '3.8352 W']

import requests
import json

data = {
    'voltage': '23.020 V',
    'bus_voltage': "0.01599 V",
    'current': '1598.000 mA',
    'power': '5 W'
}

headers = {'Content-Type': 'application/json'}
# response = requests.post('https://vertical-farm-dashboard.vercel.app/api/uploadData', data=json.dumps(data), headers=headers)
response = requests.post('http://localhost:4321/api/uploadData', data=json.dumps(data), headers=headers)
print("Response:", response.status_code, response.reason, response.content)