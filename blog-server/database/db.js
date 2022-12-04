const mongoose = require('mongoose')
require('dotenv').config()
const Connection = async () => {
    const URL = process.env.MONGO_URI
    try {
        await mongoose.connect(URL, { useNewUrlParser: true })
        console.log('Database connected successfully')
    } catch (error) {
        console.log('Error while connecting to database ', error)
    }
}

module.exports = Connection;