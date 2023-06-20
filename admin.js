const express = require('express')
const router = express.Router()
const Book = require('./bookSchema')
const Admin = require('./adminSchema')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const saltRounds = 10;
// var session = require('./app')
var logon = false


router.get("/login", (req, res)=>{
    logon = false
    res.render('adminlog')
})

router.post("/db",async (req,res)=>{
    
    

    const check = req.body.pass
    const uname = req.body.uname
    const data = await Admin.findOne({username: uname})
    
    if(data !== null) {
        const hash = data.password
        console.log(req.body)
        console.log(hash)
    
        bcrypt.compare(check, hash, (err, result) => {
            console.log(result)
            if(result == true) {
                logon = true
                res.render('querypageAdmin')
            }
            else {
                
                res.render('adminlog')
            }
        })
    }
    else res.render('adminlog')

})

router.get("/all", checkLog, async (req,res)=>{
    const result = await Book.find()
    res.send(result)
})
router.get("/find", checkLog, async (req, res)=>{
    const id = req.query.qid
    const result = await Book.find({id: parseInt(id)})
    res.send(result)
})

router.post("/insert", checkLog, async (req, res)=>{
    const id = req.body.Iid
    const bname = req.body.bname
    const aname = req.body.aname
    try {
    const result = await Book.create({id: parseInt(id), name: bname, author: aname})
    } catch (e) {
        console.log(e.message)
    }
    res.send("Inserted")
})
router.post("/update", checkLog,async (req, res)=>{
    const id = req.body.Iid
    const bname = req.body.bname
    const aname = req.body.aname
    console.log(req.body)
    try {
        const result = await Book.updateMany({id: parseInt(id)}, {id: parseInt(id), name: bname, author: aname})
    } catch (e) {
        console.log(e.message)
    }
    res.send("Updated")

})


function checkLog(req, res, next) {
    if(logon) {
        next()
    }
    else {
        res.redirect("/admin/login")
    }
}



module.exports = router