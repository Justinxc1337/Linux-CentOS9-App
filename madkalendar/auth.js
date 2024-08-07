const msal = require('@azure/msal-node');

const config = {
    auth: {
        clientId: '',
        authority: 'https://login.microsoftonline.com/',
        clientSecret: ''
    }
};

const cca = new msal.ConfidentialClientApplication(config);

async function getToken() {
    const authResponse = await cca.acquireTokenByClientCredential({
        scopes: ["https://graph.microsoft.com/.default"]
    });
    return authResponse.accessToken;
}

module.exports = { getToken };