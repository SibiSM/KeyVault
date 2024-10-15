const express = require('express');
const path = require('path');

// Set up Express app
const app = express();
const port = process.env.PORT || 3000; // Use PORT from environment or default to 3000

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Route for the root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Serve the HTML file
});

// Route for another path
app.get('/another', (req, res) => {
    res.send('<h1>Welcome to the Another Page!</h1>');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
