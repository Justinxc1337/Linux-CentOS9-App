const express = require('express');
const { getLunchEvents } = require('./calendar');

const app = express();
const port = 3000;

// Serve static files from the "public" directory
app.use(express.static('public'));

// API endpoint to get lunch attendance data
app.get('/lunch-attendance', async (req, res) => {
    try {
        const lunchEvents = await getLunchEvents();
        res.json(lunchEvents);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
