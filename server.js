const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve the main HTML file at the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'page1.html'));
});

// Export the app for testing
module.exports = app;

// Start the server on port 3000 
const PORT = process.env.PORT || 3000;
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}
