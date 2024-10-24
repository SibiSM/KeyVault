// app.js

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World from Node.js!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

/*
const express = require('express');
require('dotenv').config();
const { DefaultAzureCredential } = require('@azure/identity');
const { SecretClient } = require('@azure/keyvault-secrets');

// Set up Express app
const app = express();
const port = process.env.PORT || 3000; // Use PORT from environment variable or default to 3000

// Serve static files (HTML) from the "public" folder
app.use(express.static('public'));

// Azure Key Vault details
const keyVaultName = process.env.KEY_VAULT_NAME; // Get from environment variable
const KVUri = `https://${keyVaultName}.vault.azure.net`;

// Use DefaultAzureCredential to authenticate
const credential = new DefaultAzureCredential();
const client = new SecretClient(KVUri, credential);

// API route to fetch secret from Azure Key Vault
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
        console.log(`Retrieved secret: ${retrievedSecret.value}`);  // Log the secret value (for debugging)
        res.json({ secret: retrievedSecret.value }); // Send the secret as a JSON response
    } catch (err) {
        console.error('Error retrieving secret:', err);  // Log the entire error object for debugging
        res.status(500).json({ error: 'Error retrieving secret: ' + err.message }); // Send back the error message as JSON
    }
});

// API route to test environment variables
app.get('/api/testEnv', (req, res) => {
    res.json({
        KEY_VAULT_NAME: process.env.KEY_VAULT_NAME,
        SECRET_NAME: process.env.SECRET_NAME,
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
*/
