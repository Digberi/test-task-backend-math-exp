const express = require('express')
const bodyParser = require('body-parser')
const { getResults, postResults } = require('./data/dbms')

const app = express()

app.use(bodyParser.json())

app.get('/result', async (req, res) => {
  try {
    const results = await getResults()
    res.status(200).json(results)
  } catch (error) {
    res.status(500)
  }
})

app.post('/data', (req, res) => {
  try {
    postResults(req.body)
    res.status(200).send('done').end()
  } catch (error) {
    res.status(400).json({ message: error.message }).end()
  }
})

const PORT = 3002
app.listen(PORT, () => console.log(`Server is running on ${PORT}`))
