const express=require("express");
const path=require("path");
const bodyParser= require("body-parser")
const app=express();
const port=80;

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/appointment', {useNewUrlParser: true, useUnifiedTopology: true});

//This Schema Is Updated For Our Form Data

const appointmentSchema = new mongoose.Schema({
    name: String,
    age: String,
    gender: String,
    email: String,
    TestDescription: String
    
  });

  const appointmentData = mongoose.model('Appointment', appointmentSchema);

// app.use(express.static('static',options))
//EXPRESS SPECIFIC STUFF
 
app.use('/static',express.static('static'));
app.use(express.urlencoded());

//PUG SPECIFIC STUFF
// app.set('view engine','html')//Set The Template engine as pug
// app.set('views',path.join(__dirname,'views'))//Set the views directory
var engines = require('consolidate');

app.set('views', __dirname + '/views');
app.engine('html', engines.mustache);
app.set('view engine', 'html');

app.get('/', function (req, res) {
 
    const params={}
    res.status(200).render('index.html',params);
   });
   app.get('/AboutUs', function (req, res) {
 
    const params={}
    res.status(200).render('appointment.html',params);
   });
   // This is post Request for app.
   app.post('/AboutUs', function (req, res) {
    var MyData=new appointmentData(req.body);
    MyData.save().then(()=>{
        res.send("This Item Is Saved");
        
    }).catch(()=>{
        res.status(400).send("Item Was Not Saved To Database");
    });
   
    // res.status(200).render('appointment.html');
   });

   app.listen(port,()=>{
    console.log(`The app is runnimg on port ${port}`)
    
});