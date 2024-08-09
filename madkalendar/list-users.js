// list-users.js
const PouchDB = require('pouchdb');
const db = new PouchDB('users');

async function listUsers() {
    try {
        const result = await db.allDocs({ include_docs: true });
        console.log('Users:', result.rows.map(row => row.doc));
    } catch (error) {
        console.error('Error listing users:', error);
    }
}

listUsers();
