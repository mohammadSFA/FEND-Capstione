const path = require('path')
const express = require ('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const fetch = require('node-fetch')
const { apiRunner } = require('./api')

// Express
const app = express()

// Middleware
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// API Endpoint
const data = []

// Server setup for production mode
app.use(express.static('dist'))
app.get('/', (req, res)=> res.sendFile('dist/index.html'))

// GET request from client that runs the API
app.get('/api', (req, res)=> {
    const location = req.query.location
    const daysAway = req.query.daysAway

    apiRunner(location, daysAway)
    .then((obj)=>{
        console.log(obj);
        data.push(obj)
        console.log(data);
        res.send(obj)
    })
})

module.exports = app