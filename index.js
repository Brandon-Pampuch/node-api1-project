//required files
const express = require('express')
const db = require('./data/db')

//server init
const server = express()
//middleware
server.use(express.json())
//sets server to listening
server.listen(3000, () => 'listening on 3000')


//endpoints
server.get('/api/users', (req, res) => {
    db.find()
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.status(500).json({
                err: err,
                message: 'failed to get hobbits'

            })
        })
})
server.post('/api/users', (req, res) => {
    const newHobbit = req.body
    db.insert(newHobbit)
        .then(data => {
            res.json(req.body)
        })
        .catch(err => {
            res.status(500).json({
                err: err,
                message: 'failed to post hobbits'

            })
        })
})
server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params
    db.remove(id)
        .then(deletedHub => {

            if (deletedHub) {
                res.json(deletedHub)
            }
        })
        .catch(err => {
            res.status(500).json({
                err: err,
                message: 'could not remove hobbit'

            })
        })
})
server.get('/api/users/:id', (req, res) => {
    const { id } = req.params
    db.findById(id)
        .then(foundHobbit => {
            if (foundHobbit) {
                res.json(foundHobbit)
            }
        })
        .catch(err => {
            res.status(500).json({
                err: err,
                message: 'could not find hobbit'

            })
        })
})
server.put('/api/users/:id', (req, res) => {
    const { id } = req.params
    const changes = req.body
    db.update(id, changes)
        .then((updated) => {
            if (updated) {
                res.json(updated)
            } else {
                res.status(404).json({
                    message: "invalid hub id"
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                err: err,
                message: 'could not find hobbit'

            })
        })
})
