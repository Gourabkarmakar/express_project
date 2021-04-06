const express = require("express")
const port = 80;
const path = require("path")
const app = express();
const statusCode = 200;
const pug = require('pug')
const fs = require("fs")
const mongoose = require("mongoose")
const bodyparser = require("body-parser")


mongoose.connect('mongodb://localhost/conatactsda', { useNewUrlParser: true })

var contactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  aadhar: String,
  add: String
})

var contact = mongoose.model("contact", contactSchema)

// Express specific staff
app.use("/static", express.static('static'))
app.use(express.urlencoded({ extended: true }))

// Template Engines For pug
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, "views"))



// app.get("/",(req,res)=>{
//   res.status(200).send("This is a demo app with node js");
// })
app.get("/about", (req, res) => {
  res.status(200).send("This is about section of demo app with node js");
})
// app.post("/",(req,res)=>{
//   res.status(200).send("This is a post app with node js");
// })

// End point
app.get('/', (req, res) => {

  const params = {}
  res.status(200).render('home.pug', params);
})

app.get('/contact', (req, res) => {
  const params = {}
  // console.log(typeof(params))
  res.status(200).render('contact.pug', params);

})
app.post('/contact', (req, res) => {
  var myData = new contact(req.body);
  myData.save().then(() => {

    console.log("This data save into contact database");
    res.send("This data save into contact database")

  }).catch(() => {
    console.log("Throgh some error Check it again");
    rse.send("Throgh some error Check it again")

  })
  // res.status(200).render('contact.pug');

})

// Listening end Point
app.listen(port, () => {
  console.log(`This application running on port No ${port}`);
})
