const msal = require('@azure/msal-node');
const config = {
    auth: {
        clientId: 'YOUR_CLIENT_ID',
        authority: 'https://login.microsoftonline.com/YOUR_TENANT_ID',
        clientSecret: 'YOUR_CLIENT_SECRET'
    }
};
const cca = new msal.ConfidentialClientApplication(config);

async function getAccessToken() {
    const authResult = await cca.acquireTokenByClientCredential({
        scopes: ["https://graph.microsoft.com/.default"]
    });
    return authResult.accessToken;
}

module.exports = getAccessToken;
