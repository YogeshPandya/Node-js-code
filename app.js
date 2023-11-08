const express = require('express');
const app = express();
const db = require('./database/db.js'); // Import the database connection
const userRoutes = require('./routes/userRoutes.js'); // Import your user routes
const bodyParser = require('body-parser');

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use the user routes
app.use('/users', userRoutes);

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
