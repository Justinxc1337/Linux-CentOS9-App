// db.js
const PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-find'));

const usersDB = new PouchDB('users');
const calendarDB = new PouchDB('calendar');

module.exports = { usersDB, calendarDB };
