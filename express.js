const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

//Routes
const orderRoutes = require('./routes/order');
const userRoutes = require('./routes/user')


mongoose.connect('mongodb://localhost:27017/myapp', {useNewUrlParser: true})
  .then(() => {
      console.log('connected to database')
  })
  .catch(() => {
      console.log('connection failed')
  })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept,Authorization");
    res.setHeader("Access-Control-Allow-Methods","GET,POST,PATCH,PUT,DELETE,OPTIONS");
    next();
})



app.use('/users',userRoutes)


app.use('/orders',orderRoutes)

module.exports = app;