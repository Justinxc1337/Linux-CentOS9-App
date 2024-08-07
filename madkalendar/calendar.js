const { Client } = require('@microsoft/microsoft-graph-client');
require('isomorphic-fetch');
const { getToken } = require('./auth');

async function getLunchEvents() {
    const token = await getToken();

    const client = Client.init({
        authProvider: (done) => {
            done(null, token);
        }
    });

    // Fetch events from the calendar
    const events = await client.api('/users/mikskogstad@ssitcloud.dk/calendar/events')
        .filter("start/dateTime ge '2023-01-01T00:00:00Z' and start/dateTime lt '2023-12-31T23:59:59Z'")
        .get();

    // Extract attendee information from events
    const lunchEvents = events.value.map(event => {
        return {
            subject: event.subject,
            start: event.start.dateTime,
            attendees: event.attendees.filter(attendee => attendee.status.response === 'accepted').map(attendee => attendee.emailAddress.address)
        };
    });

    return lunchEvents;
}

module.exports = { getLunchEvents };
