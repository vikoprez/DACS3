var express = require('express')
const db = require('../database')
var router = express.Router()
var md5 = require("md5")

// Get list of users
router.get('/users', (req, res, next) => {
    var sql = 'SELECT * FROM USER'
    var params = []

    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({
                'error': err.message
            })
            return
        }
        res.json({
            'message': 'Success',
            'data': rows
        })
    })
})

// Get user by id
router.get('/user/:id', (req, res, next) => {
    var sql = 'SELECT * FROM USER WHERE id = ?'
    var params = [req.params.id]

    db.get(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({
                'error': err.message
            });
            return;
        }
        res.json({
            'message': 'Success',
            'data': row
        })
    })
})

// Add user
router.post('/user/', (req, res, next) => {
    var errors = []

    if (!req.body.password) {
        errors.push('No password specified.')
    }
    if (!req.body.email) {
        errors.push('No email specified.')
    }
    if (errors.length) {
        res.status(400).json({
            'error': errors.join(',')
        })
        return
    }

    var data = {
        name: req.body.name,
        email: req.body.email,
        password: md5(req.body.password)
    }
    var sql = 'INSERT INTO user (name, email, password) VALUES (?, ?, ?)'
    var params = [data.name, data.email, data.password]

    db.get(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({
                'error': err.message
            });
            return;
        }
        res.json({
            'message': 'Success',
            'data': data,
            'id': this.lastID
        })
    })
})

// Update an user
router.patch('/user/:id', (req, res, next) => {
    var data = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password ? md5(req.body.password) : null
    }
    
    db.run(
        `UPDATE user SET
            name = COALESCE(?, name),
            email = COALESCE(?, email),
            name = COALESCE(?, name),
            WHERE id = ?`,
        [data.name, data.email, data.password, req.params.id],
        function (err, result) {
            if (err) {
                res.status(400).json({'error': res.message})
                return
            }
            res.json({
                message: 'Success',
                data: data,
                changes: this.changes
            })
        }
    )
})

// Delete an user
router.delete('/user/:id', (req, res, next) => {
    db.run(
        `DELETE FROM user WHERE id = ?`,
        req.params.id,
        function (err, result) {
            if (err) {
                res.status(400).json({'error': res.message})
                return
            }
            res.json({
                message: 'Deleted',
                changes: this.changes
            })
        }
    )
})

module.exports = router