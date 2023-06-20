const express = require('express')
const mongoose = require('mongoose')
const user = require('./user')
const admin = require('./admin')
// var session = require('express-session')
var logon = false


const app = express()
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
// app.use(session({
//     secret: 'Ghy',
//     resave: false,
//     saveUninitialized: false
// }));

app.get("/", (req,res)=>{
    logon = false
    res.render("login")
})



app.use("/user", user)
app.use("/admin", admin)

app.listen(3000, ()=>{
    console.log("Listening on 3000")
})

module.exports = logon