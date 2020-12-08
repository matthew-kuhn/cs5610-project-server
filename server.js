require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const session = require('express-session');

app.use(session({
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    secret: 'adopifjqeporihgepoih349ru834tgihej'
}));

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const mongoose = require('mongoose')
mongoose.connect(`mongodb+srv://${process.env.DB_ADMIN_NAME}:${process.env.DB_PASSWORD}@cluster0.ecgcm.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true })

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}))

require('./controllers/users.controller.server')(app)
require('./controllers/reviews.controller.server')(app)

app.listen(8080)

