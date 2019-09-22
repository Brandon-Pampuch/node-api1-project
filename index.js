const express = require('express')
const db = require('./data/db')


const server = express()
server.use(express.json())

server.listen(3000, () => 'listening on 3000')



server.get('/', (req, res) => {
    db.find()
        .then(data => {
            res.json(data)
        })
        .catch(err => {
            res.status(500).json({
                err: err,
                message: 'failed to get hubs'

            })
        })
})
