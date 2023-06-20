const express = require('express')
const router = express.Router()
const Book = require('./bookSchema')
const User = require('./userSchema')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const saltRounds = 10;


router.get("/login", (req, res)=>{
    res.render('userlog')
})

router.post("/db",async (req,res)=>{
    const check = req.body.pass
    const uname = req.body.uname
    const data = await User.findOne({username: uname})
    console.log(data)
    if(data !== null) {
        const hash = data.password
        console.log(req.body)
        console.log(hash)
    
        bcrypt.compare(check, hash, (err, result) => {
            console.log(result)
            if(result == true) {
                res.render('querypage')
            }
            else {
                res.render('userlog')
            }
        })
    }
    else res.render('userlog')
})

router.get("/all", async (req,res)=>{
    const result = await Book.find()
    res.send(result)
})
router.get("/find", async (req, res)=>{
    const id = req.query.qid
    const result = await Book.find({id: parseInt(id)})
    res.send(result)
})

module.exports = router