const { Router } = require('express')
const { getResults, postResults } = require('../data/dbms')
const expressionRouter = Router()

expressionRouter.route('/data').post((req, res) => {
  try {
    postResults(req.body)
    res.status(200).send('done')
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

expressionRouter.route('/result').get(async (req, res) => {
  try {
    const results = await getResults()
    res.status(200).json(results)
  } catch (error) {
    res.status(500)
  }
})

module.exports = expressionRouter
