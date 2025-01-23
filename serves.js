const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes.js'); 
const app = express();
const PORT = 3001;

// Middleware
app.use(bodyParser.json());

// Use routes
app.use('/api', routes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
