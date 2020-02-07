const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.get('/',  (req, res) => {
    res.send('We are on Register page')
})

router.post('/register', async (req, res) => {

    const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        discordid: req.body.discordid,
        email: req.body.email,
        password: req.body.password
    })

    const saveUser = async () => {
        try {
            user.password = await bcrypt.hash(user.password, 10)
            const savedUser = await user.save()
            if (saveUser)
                return res.json(savedUser)
            else
                return res.json({message: "Failed to signup!!!"})
        } catch(err) {
            res.status(400).json({message: err})
        }
    }
    
    saveUser()
})

router.post('/updatepass', async (req, res) => {
    const {email, password, newpass} = req.body
    try {
        const searchedUser = await User.findOne({'email' : email})
        if (!searchedUser)
            return res.json({message: 'Incorrect email or password'})
        var isEqual = await bcrypt.compare(password, searchedUser.password)
        if (isEqual) {
            searchedUser.password = await bcrypt.hash(newpass, 10)
            const updatedUser = await User.findByIdAndUpdate(searchedUser.id, searchedUser)
            if (updatedUser && updatedUser.email)
                return res.json(updatedUser)
            return res.json({message: 'Failed to reset password'})
        }
        return res.json({message: 'Invalid email or password'})
    } catch(err) {
        return res.status(400).json({message: err})
    }
})

router.post('/me', async (req, res) => {
    const token =
    req.body.token ||
    req.query.token ||
    req.headers['x-access-token'] ||
    req.cookies.token;
    if (!token)
        return res.json({message: 'Unauthorized: No token provided'})
    try {
        const authData = await jwt.verify(token, process.env.SECRET)
        if (!authData)
            return res.json({message: 'Token has been expired!'})
        const searchedUser = await User.findOne({'email' : authData.email})
        if (!searchedUser)
            return res.json({message: 'Wrong token!'})
        return res.json({user:searchedUser})
    } catch(err) {
        res.json({message: 'Token issue! Please try again.'})
    }
})

module.exports = router