const path = require('path')
const express = require ('express')
const bodyParser = require('body-parser')
const cors = require('cors')

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
const data = {}

// Server setup for production mode
app.use(express.static('dist'))
app.get('/', (req,res)=> res.sendFile('dist/index.html'))

// POST Request after Geonames GET Request