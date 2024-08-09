// migrateToSupabase.js
const PouchDB = require('pouchdb');
const supabase = require('./supabaseClient');

const db = new PouchDB('users');

async function migrateUsers() {
    try {
        const result = await db.allDocs({ include_docs: true });
        const users = result.rows.map(row => row.doc);

        for (const user of users) {
            const { data, error } = await supabase
                .from('users')
                .insert([{ email: user.email, password: user.password }]);

            if (error) {
                console.error('Error inserting user:', error);
            } else {
                console.log('User inserted:', data);
            }
        }
    } catch (error) {
        console.error('Error migrating users:', error);
    }
}

migrateUsers();