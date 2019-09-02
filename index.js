const express = require('express');

const mongoose = require('mongoose');
require('env2')('config.env');

const app = express();

// Import Routes
const authRoute = require('./routes/auth');

// conncet to mongodb atlas
mongoose.connect(
  process.env.MONGODB_CONNECT,
  { useNewUrlParser: true },
  ()=>{
    console.log('conncetion estaplished to remote DB');
  }
);

// Middlewares
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

// Router middleware 
app.use('/api/user', authRoute);

const port = 3000 || process.env.PORT;

app.listen(port, ()=>{
  console.log(`server is up to http://localhost:${port}`);
});