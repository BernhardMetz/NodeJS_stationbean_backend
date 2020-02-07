const express=require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv/config')

const loginRoute = require('./routes/login')
const registerRoute = require('./routes/register')

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use('/api/login', loginRoute)
app.use('/api/user', registerRoute)


const PORT = process.env.PORT || 3001
app.listen(PORT)