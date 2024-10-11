const express = require('express');
const { DefaultAzureCredential } = require('@azure/identity');
const { SecretClient } = require('@azure/keyvault-secrets');

// Set up Express app
const app = express();
const port = 3000;

// Azure Key Vault details
const keyVaultName = process.env.KEY_VAULT_NAME; // Get from environment variable
const KVUri = `https://${keyVaultName}.vault.azure.net`;

// Use DefaultAzureCredential to authenticate
const credential = new DefaultAzureCredential();
const client = new SecretClient(KVUri, credential);

app.get('/', async (req, res) => {
    try {
        // Fetch secret from Azure Key Vault
        const secretName = process.env.SECRET_NAME; // Get from environment variable
        const retrievedSecret = await client.getSecret(secretName);
        
        // Return the secret value
        res.send(`The secret value is: ${retrievedSecret.value}`);
    } catch (err) {
        console.error('Error retrieving secret:', err);
        res.status(500).send('Error retrieving secret');
    }
});

app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
