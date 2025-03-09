const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const calculations = new Map(); // In-memory storage for user data
const adminCredentials = { username: 'cupid', password: 'cupid123' }; // Admin username and password

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// POST endpoint to calculate love percentage and store data
app.post('/calculate', (req, res) => {
    const { name1, gender1, name2, gender2 } = req.body;

    // Enforce opposite-gender pairing
    if (gender1 === gender2) {
        return res.status(400).json({ error: 'Calculation is only allowed for opposite genders (male and female).' });
    }

    const percentage = calculateLovePercentage(name1, name2);
    const message = getLoveMessage(percentage);

    // Store the calculation with a unique ID (e.g., timestamp)
    const id = Date.now().toString();
    calculations.set(id, { user: name1, userGender: gender1, crush: name2, crushGender: gender2, percentage, message, timestamp: new Date().toISOString() });

    res.json({ name1, gender1, name2, gender2, percentage, message });
});

// GET endpoint for admin to view all calculations
app.get('/admin', (req, res) => {
    const { username, password } = req.query;
    if (username !== adminCredentials.username || password !== adminCredentials.password) {
        return res.status(401).send('Unauthorized: Incorrect username or password');
    }
    const data = Array.from(calculations.entries()).map(([id, calc]) => ({ id, ...calc }));
    res.json(data);
});

// Function to calculate love percentage
function calculateLovePercentage(name1, name2) {
    const combined = (name1 + name2).toLowerCase().replace(/\s/g, '');
    let score = 0;
    for (let char of combined) {
        score += char.charCodeAt(0);
    }
    return (score % 100) + 1;
}

// Function to get a love message
function getLoveMessage(score) {
    if (score < 50) return "Love is a journey—keep exploring!";
    if (score < 75) return "Sparks are flying—could this be fate?";
    return "A match made in heaven!";
}

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
