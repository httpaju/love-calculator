require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const calculations = new Map(); // In-memory storage for user data
const adminCredentials = {
    username: process.env.ADMIN_USERNAME || 'cupid',
    password: process.env.ADMIN_PASSWORD || 'cupid123'
};

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

    // Store the calculation with a unique ID
    const id = Date.now().toString();
    calculations.set(id, { user: name1, userGender: gender1, crush: name2, crushGender: gender2, percentage, message, timestamp: new Date().toISOString() });

    res.json({ name1, gender1, name2, gender2, percentage, message });
});

// POST endpoint for admin login (more secure than GET with query params)
app.post('/admin/login', (req, res) => {
    const { username, password } = req.body;
    if (username !== adminCredentials.username || password !== adminCredentials.password) {
        return res.status(401).json({ error: 'Incorrect username or password' });
    }
    const data = Array.from(calculations.entries()).map(([id, calc]) => ({ id, ...calc }));
    res.json(data);
});

function calculateLovePercentage(name1, name2) {
    const combined = (name1 + name2).toLowerCase().replace(/\s/g, '');
    let score = 0;
    for (let char of combined) {
        score += char.charCodeAt(0);
    }
    return (score % 100) + 1;
}

function getLoveMessage(score) {
    if (score < 50) return "Love is a journey—keep exploring!";
    if (score < 75) return "Sparks are flying—could this be fate?";
    return "A match made in heaven!";
}

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
