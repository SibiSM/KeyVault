const express = require('express');
require('dotenv').config();
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
    // try {
    //     // Logging the environment variables
    //     console.log('Key Vault Name:', process.env.KEY_VAULT_NAME);
    //     console.log('Secret Name:', process.env.SECRET_NAME);

    //     const secretName = process.env.SECRET_NAME; // Get from environment variable
    //     if (!secretName) {
    //         throw new Error("SECRET_NAME is not defined");
    //     }
    //     if (!process.env.KEY_VAULT_NAME) {
    //         throw new Error("KEY_VAULT_NAME is not defined");
    //     }

    //     // Attempt to retrieve the secret
    //     const retrievedSecret = await client.getSecret(secretName);
    //     res.send(`The secret value is: ${retrievedSecret.value}`);
    // } catch (err) {
    //     console.error('Error retrieving secret:', err.message);
    //     res.status(500).send('Error retrieving secret: ' + err.message); // Send back the error message
    // }
    try {
        console.log("Welcome");
        res.send("Welcome to the Key Vault Application!"); // Responding to the request
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("An error occurred: " + error.message); // Send back error message
    }
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
