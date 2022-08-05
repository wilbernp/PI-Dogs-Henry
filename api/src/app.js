const express = require('express')
const morgan = require('morgan')
const router = require('./routes/index')
const cors = require('cors')

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

app.use("/api", router)

app.get("/", (req, res) => res.send("get a /"))
module.exports = app