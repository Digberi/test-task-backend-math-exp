const fs = require('fs')
const util = require('util')
const parser = require('../parser')

const pathToDB = 'data/results/results.txt'

const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

const writeData = (data) => writeFile(pathToDB, data)
const readData = () => readFile(pathToDB, 'utf-8')

const getResults = async () => {
  const object = {
    results: [],
  }
  if (fs.existsSync(pathToDB)) {
    await readData().then((data) => {
      object.results = data.split('\n').map((el) => parseFloat(el))
    })
  }

  return object
}

const postResults = (JSON) => {
  const newResults = parser(JSON).join('\n')
  writeData(newResults)
}

module.exports = { getResults, postResults }
