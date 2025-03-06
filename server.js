const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/calculate', (req, res) => {
    const { name1, name2 } = req.body;
    const percentage = calculateLovePercentage(name1, name2);
    const message = getLoveMessage(percentage);
    res.json({ name1, name2, percentage, message });
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
