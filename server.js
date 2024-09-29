const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json()); // Allows parsing of JSON bodies
app.use(cors()); // Allows cross-origin requests (e.g., from your front end)

// Serve the main HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'page1.html'));
});

// Store saved equations in memory (temporary, as this will be lost when server restarts)
let savedEquations = [];

// Route to save the equation
app.post('/save-equation', (req, res) => {
  const { equation } = req.body; // Extract equation from the request body
  if (equation) {
    savedEquations.push(equation);
    res.status(200).send({ message: 'Equation saved successfully!' });
  } else {
    res.status(400).send({ message: 'No equation provided.' });
  }
});

// Route to get all saved equations (optional)
app.get('/equations', (req, res) => {
  res.status(200).send(savedEquations);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
