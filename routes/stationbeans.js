const express = require('express')
const router = express.Router()

router.get('/',  (req, res) => {
    res.send('We are on Login page')
})



module.exports = router