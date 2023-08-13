///require() is a built-in function to include external modules that exist in separate files.
const express = require('express')
const mongoose = require('mongoose');

//import routes.js
const routes = require('./routes/routes');
//import models.js
const Model = require('../models/model');




//import the contents of our .env file in the script file
require('dotenv').config();

//connect to mongoose
const mongoString = process.env.DATABASE_URL
mongoose.connect(mongoString);
const database = mongoose.connection


//database.on means it will try to connect to the database, and throws any error if the connection fails. 
//And database.once means it will run only one time. If it is successful, 
//it will show a message that says Database Connected which can be used to test connection
database.on('error', (error) => {
    console.log(error)
})
database.once('connected', () => {
    console.log('Database Connected');
})

const app = express()

//use express's json middleware for body praser
app.use(express.json());

////routes路由对象中的路由都会匹配到"/api"路由后面
app.use('/api', routes);


//define the base endpoint
app.use('/api', routes)
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(3000, () => console.log('Server ready'))

