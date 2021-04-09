const express = require('express')

const expressionRouter = require('./routes/expression')

const app = express()

app.use(express.json())

app.use('/', expressionRouter)

const PORT = 3002
app.listen(PORT, () => console.log(`Server is running on ${PORT}`))
