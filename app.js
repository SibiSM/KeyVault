const express = require('express');
require('dotenv').config();
const { DefaultAzureCredential } = require('@azure/identity');
const { SecretClient } = require('@azure/keyvault-secrets');

// Set up Express app
const app = express();
const port = 3000;

// Serve static files (HTML) from the "public" folder
app.use(express.static('public'));

// Azure Key Vault details
const keyVaultName = process.env.KEY_VAULT_NAME; // Get from environment variable
const KVUri = `https://${keyVaultName}.vault.azure.net`;

// Use DefaultAzureCredential to authenticate
const credential = new DefaultAzureCredential();
const client = new SecretClient(KVUri, credential);

// API route to fetch secret from Azure Key Vault
app.get('/api/getSecret', async (req, res) => {
    try {
        const secretName = process.env.SECRET_NAME; // Get from environment variable
        if (!secretName) {
            throw new Error("SECRET_NAME is not defined");
        }
        if (!process.env.KEY_VAULT_NAME) {
            throw new Error("KEY_VAULT_NAME is not defined");
        }

        // Attempt to retrieve the secret
        const retrievedSecret = await client.getSecret(secretName);
        res.json({ secret: retrievedSecret.value }); // Send the secret as a JSON response
    } catch (err) {
        console.error('Error retrieving secret:', err.message);
        res.status(500).json({ error: 'Error retrieving secret: ' + err.message }); // Send back the error message as JSON
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
