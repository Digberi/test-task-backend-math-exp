const fs = require('fs')
const util = require('util')
const parser = require('../parser')

const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

const writeData = (data) => writeFile('data/results/results.txt', data)
const readData = () => readFile('data/results/results.txt', 'utf-8')

const getResults = async () => {
  const object = {
    results: [],
  }
  await readData().then((data) => {
    object.results = data.split('\n').map((el) => parseFloat(el))
  })
  return object
}

const postResults = (JSON) => {
  const newResults = parser(JSON).join('\n')
  writeData(newResults)
}

module.exports = { getResults, postResults }
