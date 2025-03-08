document.getElementById('calculate').addEventListener('click', () => {
    const name1 = document.getElementById('name1').value.trim();
    const gender1 = document.getElementById('gender1').value;
    const name2 = document.getElementById('name2').value.trim();
    const gender2 = document.getElementById('gender2').value;

    if (!name1 || !gender1 || !name2 || !gender2) {
        alert('Please fill in all fields!');
        return;
    }

    fetch('/calculate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name1, gender1, name2, gender2 }),
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(err => { throw new Error(err.error || 'Calculation failed'); });
        }
        return response.json();
    })
    .then(data => {
        const query = `name1=${encodeURIComponent(data.name1)}&gender1=${data.gender1}&name2=${encodeURIComponent(data.name2)}&gender2=${data.gender2}&percentage=${data.percentage}&message=${encodeURIComponent(data.message)}`;
        window.location.href = `/result.html?${query}`;
        document.getElementById('share-link').href = `/`;
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error: ' + error.message);
    });
});