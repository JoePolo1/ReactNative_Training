
require('./models/user')
require('./models/track')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/authRoutes')
const trackRoutes = require('./routes/trackRoutes')
const requireAuth = require('./middlewares/requireAuth')
const app = express()

app.use(bodyParser.json())
app.use(authRoutes)
app.use(trackRoutes)

const mongoUri = 'mongodb+srv://joepolo:yaD9TUAi1UuWdd9T@cluster0.gddw745.mongodb.net/'
mongoose.connect(mongoUri)
mongoose.connection.on('connected', () => {
  console.log('You are now connected to the mongo instance.');
})
mongoose.connection.on('error', () => {
  console.error('There was an error connecting to mongo', err)
})

app.get('/', requireAuth, (req, res) => {

  res.send(`Your email is: ${req.user.email}`)
})

app.listen(3000, () => {
  console.log('Yo! We are listening on port 3000');
})