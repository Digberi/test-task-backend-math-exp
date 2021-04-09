const calculateResult = require('./math/math')

const parser = (JSON) => {
  const results = []
  if (JSON.expressions) {
    JSON.expressions.map((el) => results.push(calculateResult(el)))
  } else {
    throw new Error('JSON should contain field "expressions"')
  }
  return results
}

module.exports = parser
