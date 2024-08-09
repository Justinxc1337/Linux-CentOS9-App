// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const supabase = require('./supabaseClient');
const app = express();
const port = 3000;

app.use(cors()); // Enable CORS
app.use(bodyParser.json());
app.use(express.static('public'));

// Handle login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const { data: user, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .eq('password', password)
            .single();

        if (error) throw error;

        if (user) {
            res.json({ success: true, userId: user.id });
        } else {
            res.status(401).json({ success: false, message: 'Invalid email or password' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Serve the login page
app.get('/login', async (req, res) => {
    const email = req.query.email;
    try {
        const { data: user, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();

        if (error) throw error;
        res.json(user);
    } catch (error) {
        res.status(404).json({ message: 'User not found' });
    }
});

// Serve the calendar page
app.get('/calendar', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'calendar.html'));
});

// Serve the users page
app.get('/users', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'users.html'));
});

// Handle user selections
app.get('/calendar', async (req, res) => {
    try {
        const { data: calendar, error } = await supabase
            .from('calendar')
            .select('*')
            .eq('userId', req.query.userId)
            .single();

        if (error) throw error;
        res.json(calendar);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});