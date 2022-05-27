var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')

const DBSOURCE = 'db.sqlite'

var db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        // Can't open database
        console.log(err.message)
        throw err
    } else {
        console.log('Connected to the SQLite database.')
        // Create table user
        db.run(`CREATE TABLE user (
            uid INTEGER PRIMARY KEY AUTOINCREMENT,
            uname text, 
            email text UNIQUE, 
            password text, 
            CONSTRAINT email_unique UNIQUE (email)
        )`,
        (err) => {
            if (err) {
                // Table already created
            } else {
                // Table created, add rows
                var insert = 'INSERT INTO user (uname, email, password) VALUES (?, ?, ?)'
                db.run(insert, ['admin', 'admin@example.com', md5('admin123456')])
                db.run(insert, ['user', 'user@example.com', md5('user123456')])
            }
        })
        // Create table product
        db.run(`CREATE TABLE product (
            pid INTEGER PRIMARY KEY AUTOINCREMENT,
            pname text,
            pdesc text,
            pprice int,
            pIsAvailable boolean
        )`,
        (err) => {
            if (err) {
                // Table already created
            } else {
                // Table created, add rows again
                var insert = 'INSERT INTO product (pname, pdesc, pprice, pIsAvailable) VALUES (?, ?, ?, ?)'
                db.run(insert, ['Black coffee', 'A deep black and strong smell coffee can wake your mind up.', 10, 1])
                db.run(insert, ['White coffee', 'A deep white and light smell coffee can somewhat calm your stressing day.', 10, 0])
            }
        })
    }
})

module.exports = db