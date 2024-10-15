const express = require('express');
require('dotenv').config();
const path = require('path');
const { DefaultAzureCredential } = require('@azure/identity');
const { SecretClient } = require('@azure/keyvault-secrets');

// Set up Express app
const app = express();
const port = process.env.PORT || 3000; // Use environment PORT or default to 3000

// Azure Key Vault details
const keyVaultName = process.env.KEY_VAULT_NAME;
const KVUri = `https://${keyVaultName}.vault.azure.net`;

// Use DefaultAzureCredential to authenticate
const credential = new DefaultAzureCredential();
const client = new SecretClient(KVUri, credential);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// API route to retrieve secret
app.get('/api/getSecret', async (req, res) => {
    try {
        const secretName = process.env.SECRET_NAME;
        if (!secretName) throw new Error("SECRET_NAME is not defined");

        const retrievedSecret = await client.getSecret(secretName);
        res.json({ secret: retrievedSecret.value });
    } catch (err) {
        console.error('Error retrieving secret:', err.message);
        res.status(500).json({ error: err.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
