const express = require('express')
const bodyParser = require('body-parser')

const expressionRouter = require('./routes/expression')

const app = express()

app.use(bodyParser.json())

app.use('/', expressionRouter)

const PORT = 3002
app.listen(PORT, () => console.log(`Server is running on ${PORT}`))
