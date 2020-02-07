const express = require('express')
const router = express.Router()
const request = require('request');



router.get('/',  (req, res) => {
    request('http://citibikenyc.com/stations/json', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.send(body)
        }
    })
})



module.exports = router