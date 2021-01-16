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

// designates port that app listens to for incoming requests
const port = 8001
app.listen(port, ()=> console.log(`App listening on port ${port}!`))

// API Endpoint
const data = []

// Server setup for production mode
app.use(express.static('dist'))
app.get('/', (req, res)=> res.sendFile('dist/index.html'))

// GET request from client that runs the API
app.get('/api', (req, res)=> {
    const location = req.query.location
    const departure = req.query.departure
    const returnValue = req.query.returnValue

    apiRunner(location, departure, returnValue)
    .then((object)=>{
        console.log(object);
        data.push(object)
        res.send(object)
    })
})