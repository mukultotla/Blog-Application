const express = require('express');
const Connection = require('./database/db.js')
const signupRoute = require('./routes/route')
const app = express()

app.use('/', signupRoute)
const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port:${PORT}`)
})
Connection()