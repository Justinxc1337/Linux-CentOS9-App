const express = require('express');
const { Client } = require('@microsoft/microsoft-graph-client');
require('isomorphic-fetch');
const getAccessToken = require('./auth');

const app = express();
const PORT = process.env.PORT || 3000;

async function getClient() {
    const accessToken = await getAccessToken();
    const client = Client.init({
        authProvider: (done) => {
            done(null, accessToken);
        }
    });
    return client;
}

app.get('/api/frokost-deltagelse', async (req, res) => {
    try {
        const client = await getClient();
        const events = await client.api('/me/calendar/events')
            .filter("subject eq 'Frokost'")
            .select('subject,start,attendees')
            .get();

        const lunchEvents = events.value.map(event => ({
            dato: event.start.dateTime,
            deltagere: event.attendees.filter(attendee => attendee.status.response === 'accepted').map(attendee => attendee.emailAddress.name)
        }));

        res.json(lunchEvents);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Serveren er på port ${PORT}`);
});
