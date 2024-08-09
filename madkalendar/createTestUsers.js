// createTestUsers.js
const PouchDB = require('pouchdb');
const db = new PouchDB('users');

async function createUser() {
    try {
        const user = {
            _id: 'bob@bob.com', // Use the email as the document ID
            email: 'bob@bob.com',
            password: 'bob'
        };

        const result = await db.put(user);
        console.log('User created:', result);
    } catch (error) {
        console.error('Error creating user:', error);
    }
}

createUser();