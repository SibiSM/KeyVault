const express = require('express');

// Set up Express app
const app = express();
const port = process.env.PORT || 3000; // Use PORT from environment or default to 3000

app.get('/', (req, res) => {
    res.send('<h1>Welcome to the Simple Node.js Web App!</h1>');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
