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
        db.run(`CREATE TABLE users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            full_name VARCHAR NOT NULL, 
            email VARCHAR UNIQUE NOT NULL, 
            password VARCHAR NOT NULL,
            created_at TIME, 
            CONSTRAINT email_unique UNIQUE (email)
        )`,
        (err) => {
            if (err) {
                // Table already created
            } else {
                // Table created, add rows
                var insert = 'INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)'
                db.run(insert, ['admin', 'admin@example.com', md5('admin123456')])
                db.run(insert, ['user', 'user@example.com', md5('user123456')])
            }
        })
        // Create table product
        db.run(`CREATE TABLE products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name VARCHAR NOT NULL,
            price INT NOT NULL,
            status TEXT CHECK (status IN ('out_of_stock', 'in_stock', 'running_low')) NOT NULL DEFAULT 'in_stock',
            created_at DATETIME
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
        db.run(`CREATE TABLE orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INT REFERENCES users(id) NOT NULL,
            status TEXT CHECK (status IN ('cart', 'pending', 'completed')),
            created_at VARCHAR
        )`,
        (err) => {
            if (err) {
                // Table already created
            } else {
                // Table created, add rows again
                var insert = 'INSERT INTO product (pname, pdesc, pprice, pIsAvailable) VALUES (?, ?, ?, ?)'
                
            }
        })
        db.run(`CREATE TABLE order_items (
            order_id INT REFERENCES orders(id),
            product_id INT REFERENCES products(id),
            quantity INT
        )`,
        (err) => {
            if (err) {
                // Table already created
            } else {
                // Table created, add rows again
                var insert = 'INSERT INTO product (pname, pdesc, pprice, pIsAvailable) VALUES (?, ?, ?, ?)'
                
            }
        })
    }
})

module.exports = db