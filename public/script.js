document.getElementById('calculate').addEventListener('click', () => {
    const name1 = document.getElementById('name1').value.trim();
    const name2 = document.getElementById('name2').value.trim();

    if (!name1 || !name2) {
        alert('Please enter both names!');
        return;
    }

    fetch('/calculate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name1, name2 }),
    })
    .then(response => response.json())
    .then(data => {
        const query = `name1=${encodeURIComponent(data.name1)}&name2=${encodeURIComponent(data.name2)}&percentage=${data.percentage}&message=${encodeURIComponent(data.message)}`;
        window.location.href = `/result.html?${query}`;
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Oops! Something went wrong.');
    });
});