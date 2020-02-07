const express=require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv/config')

const stationbeansRoute = require('./routes/stationbeans')

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use('/api/getstaionbeans', stationbeansRoute)


const PORT = process.env.PORT || 3001
app.listen(PORT)