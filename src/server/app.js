const path = require('path')
const express = require ('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const fetch = require('node-fetch')
const { apiRunner } = require('./api')
const dotenv = require('dotenv')

dotenv.config()

const weatherbitKey = process.env.WEATHERBIT_KEY
const geonamesUser = process.env.GEONAMES_USER
const pixabayKey = process.env.PIXABAY_KEY

// Express
const app = express()

// Middleware
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


// Server setup for production mode
app.use(express.static('dist'))
app.get('/', (req, res)=> res.sendFile('dist/index.html'))

// API Endpoint
const data = []

// GET request from client that runs the API
app.post('/api', (req, res)=> {
    const location = req.body.location
    const daysAway = req.body.daysAway

    apiRunner(location, daysAway)
    .then((obj)=>{
        console.log(obj);
        data.push(obj)
        console.log(data);
        res.send(obj)
    })
})

app.get('/test', (req, res) => res.send('Test passed'))

module.exports = app