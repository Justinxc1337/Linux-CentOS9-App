from flask import Flask, render_template, request, redirect, url_for
from msal import ConfidentialClientApplication
import requests

app = Flask(__name__)

# Configurations
CLIENT_ID = 'YOUR_CLIENT_ID'
CLIENT_SECRET = 'YOUR_CLIENT_SECRET'
TENANT_ID = 'YOUR_TENANT_ID'
AUTHORITY = f'https://login.microsoftonline.com/{TENANT_ID}'
REDIRECT_URI = 'https://jxc.seesafeit.dk/madkalendar/getAToken'
SCOPE = ['https://graph.microsoft.com/.default']

# MSAL Confidential Client
app_client = ConfidentialClientApplication(CLIENT_ID, authority=AUTHORITY, client_credential=CLIENT_SECRET)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/login')
def login():
    auth_url = app_client.get_authorization_request_url(SCOPE, redirect_uri=REDIRECT_URI)
    return redirect(auth_url)

@app.route('/getAToken')
def authorized():
    code = request.args.get('code')
    result = app_client.acquire_token_by_authorization_code(code, scopes=SCOPE, redirect_uri=REDIRECT_URI)

    if 'access_token' in result:
        access_token = result['access_token']
        return redirect(url_for('calendar', token=access_token))
    else:
        return 'Login failed'

@app.route('/calendar')
def calendar():
    token = request.args.get('token')
    headers = {'Authorization': f'Bearer {token}'}
    graph_data = requests.get('https://graph.microsoft.com/v1.0/me/calendar/events', headers=headers).json()

    return render_template('calendar.html', events=graph_data['value'])

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
