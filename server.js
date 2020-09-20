const routes = require('./server/routes/routes').routes;
var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var bodyParser=require('body-parser')
var cors = require('cors');
var autoIncrement = require('mongoose-auto-increment');
var app = express();



const uri=process.env.MONGO_URL;
mongoose.connect(uri,{
  useNewUrlParser: true,
    useUnifiedTopology:true,
  serverSelectionTimeoutMS:5000});



const connection=mongoose.connection;
connection.on('error', console.error.bind(console,'connection error:'));
connection.once('open',()=>{
  console.log("Mongo connected successfully");
})


app.use(cors())

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

routes(app);

// Not found middleware
app.use((req, res, next) => {
  return next({status: 404, message: 'not found'})
})

// Error Handling middleware
app.use((err, req, res, next) => {
  let errCode, errMessage

  if (err.errors) {
    // mongoose validation error
    errCode = 400 // bad request
    const keys = Object.keys(err.errors)
    // report the first validation error
    errMessage = err.errors[keys[0]].message
  } else {
    // generic or custom error
    errCode = err.status || 500
    errMessage = err.message || 'Internal Server Error'
  }
  res.status(errCode).type('txt')
    .send(errMessage)
})






const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
