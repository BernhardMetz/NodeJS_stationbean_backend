const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')

router.get('/',  (req, res) => {
    res.send('We are on Login page')
})

router.post('/', async (req, res) => {
    
    const {email, password} = req.body

    try {
        let searchedUser = await User.findOne({'email' : email})
        if (!searchedUser)
            return res.json({message: 'Incorrect email or password'})
        var isEqual = await bcrypt.compare(password, searchedUser.password)
                // Issue token
        if (isEqual) {
            const payload = {'email': email};
            const token = jwt.sign(payload, process.env.SECRET, {
                expiresIn: '1h'
            });

            return res.json({
                user: searchedUser,
                token
            })
        }
        return res.json({message: 'Invalid email or password'})
    } catch(err) {
        return res.status(400).json({message: err})
    }
})

module.exports = router