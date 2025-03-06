const express = require('express');
const app = express();
const port = 3000;

// Middleware
app.use(express.json()); // For JSON payloads
app.use(express.urlencoded({ extended: true })); // For form data (optional here)
app.use(express.static('public')); // Serve static files from 'public' folder

// POST endpoint to calculate love percentage
app.post('/calculate', (req, res) => {
    const { name1, name2 } = req.body;
    const percentage = calculateLovePercentage(name1, name2);
    const message = getLoveMessage(percentage);
    res.json({ name1, name2, percentage, message });
});

// Function to calculate love percentage
function calculateLovePercentage(name1, name2) {
    const combined = (name1 + name2).toLowerCase().replace(/\s/g, '');
    let score = 0;
    for (let char of combined) {
        score += char.charCodeAt(0);
    }
    return (score % 100) + 1; // Returns a number between 1 and 100
}

// Function to get a love message based on percentage
function getLoveMessage(score) {
    if (score < 50) return "Love is a journey—keep exploring!";
    if (score < 75) return "Sparks are flying—could this be fate?";
    return "A match made in heaven!";
}

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});