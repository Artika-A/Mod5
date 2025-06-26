const express =  require("express");
const router = express.Router()
const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


router.post("/register", async (req, res)=> {
    const hashed = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({email: req.body.email, password: hashed})
    const  saved = await newUser.save()
    res.json(saved)

})

router.post("/login", async (req, res) =>{
    const user = await User.findOne({email: req.body.email})
    const isMatch = await brycpt.compare(req.body.password, user.password)
    if (!isMatch) 
        return res.status(401).send("Invalid credentials");    
    const token = jwt.sign({ id: user_id}, "secret_key", { expiresIn: "3"})
    React.json({token})
})

module.exports = router