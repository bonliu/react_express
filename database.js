// This code is for connecting to the in-memory database

// The.verbose() modifier is to get extrea information for debugging
const sqlite3 = require('sqlite3').verbose()

// MD5 is used to create a hash for stored passwords, avoiding to save plain text passwords.
const md5 = require('md5')

const DBSOURCE = "db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message)
        throw err
    } else {
        console.log('Connected to the SQLite database.')
        db.run(
            `CREATE TABLE user (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                first_name text,
                last_name text,
                email text UNIQUE,
                password text,
                balance_in_cent integer,
                CONSTRAINT email_unique UNIQUE (email)
            )`,
            (err) => {
                if (err) {
                    // Table already created
                } else {
                    // Table just created, createing some rows
                    var insert = 'INSERT INTO user (first_name, last_name, email, password, balance_in_cent) VALUES (?, ?, ?, ?, ?)'
                    db.run(insert, ["jd", "admin", "admin@example.com", md5("incorrect"), 500000])
                    // db.run(insert, ["foo", "admin", "admin@example.com", "incorrect"])
                }
            });
    }
});

module.exports = db

