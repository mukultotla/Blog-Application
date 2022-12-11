const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const Connection = require('./database/db.js')
const Route = require('./routes/route')
require('dotenv').config()
const app = express()
app.use(cors())
app.use(bodyParser.json({extended: true}))
app.use(bodyParser.urlencoded({extended: true}))

app.use('/', Route)
const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port:${PORT}`)
})
Connection()