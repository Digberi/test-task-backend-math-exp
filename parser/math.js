const isNumeric = (num) => !isNaN(num)

const stackIsEmpty = (stack) => !stack.length

// ')'- конечно правая скобка никак не исользуется,
//даже чуть мешает, при подготовке отрицательных чисел,
// но всё-таки когда её нет у меня глаз дергается,
// с ней объект красивее
const operators = {
  '+': { priority: 2, calc: (a, b) => a + b },
  '-': { priority: 2, calc: (a, b) => a - b },
  '*': { priority: 3, calc: (a, b) => a * b },
  '/': { priority: 3, calc: (a, b) => a / b },
  '(': { priority: 1 },
  ')': { priority: 1 },
}

const comparisonPriority = (stack, el) => {
  const lastOfStack = stack[stack.length - 1]
  if (stackIsEmpty(stack) || operators[el].priority > operators[lastOfStack].priority) {
    return true
  } else {
    return false
  }
}

const checkWrongSymbol = (symbol) => {
  if (!(isNumeric(symbol) || symbol in operators)) {
    throw new Error(`Unexpected symbol: ${symbol} `)
  }
}

const checkParenthesis = (expression) => {
  const quantityLeft = (expression.match(/\(/g) || []).length
  const quantityRight = (expression.match(/\)/g) || []).length

  if (quantityLeft !== quantityRight) {
    throw new Error(`There is an unclosed parenthesis : ${expression}`)
  }
}

const deleteSpaces = (expression) => expression.replace(/\s/g, '')

const addMultiplicationSigns = (expression) => {
  return expression
    .replace(/\)\(/g, ')*(')
    .replace(/(\d)\(/g, '$1*(')
    .replace(/\)(\d)/g, ')*$1')
}

const transformToArray = (expression) => expression.split('')

const parseNumber = (expression) => {
  const arrayExpression = []
  let number = ''
  expression.forEach((el) => {
    checkWrongSymbol(el)
    if (isNumeric(el)) {
      number += el
    } else {
      if (number) {
        arrayExpression.push(parseInt(number))
        number = ''
      }
      arrayExpression.push(el)
    }
  })
  if (number) {
    arrayExpression.push(parseInt(number))
    number = ''
  }
  return arrayExpression
}

const negativeNumberHandler = (expressionArray) => {
  const minus = []

  for (let i = 0; i < expressionArray.length; i++) {
    if (
      expressionArray[i] === '-' &&
      (i === 0 || (expressionArray[i - 1] in operators && expressionArray[i - 1] !== ')')) &&
      isNumeric(expressionArray[i + 1])
    ) {
      expressionArray[i + 1] = -expressionArray[i + 1]
      minus.push(i)
    }
  }
  for (let i = minus.length - 1; i >= 0; i--) {
    expressionArray.splice(minus[i], 1)
  }
  return expressionArray
} // Просто очень хотелось, чтобы работало и с отрицательными числами

const toReversePolishNotation = (expressionArray) => {
  const resultArray = []
  const stack = []
  expressionArray.forEach((el) => {
    if (isNumeric(el)) resultArray.push(el)
    else if (el in operators) {
      if (el === '(') stack.push(el)
      else if (el === ')') {
        let sing = null
        while (sing !== '(') {
          sing = stack.pop()
          if (sing !== '(') resultArray.push(sing)
        }
      } else if (comparisonPriority(stack, el)) {
        stack.push(el)
      } else {
        while (!comparisonPriority(stack, el)) {
          resultArray.push(stack.pop())
        }
        stack.push(el)
      }
    }
  })
  while (!stackIsEmpty(stack)) resultArray.push(stack.pop())
  return resultArray
}

const calculateReversePolishNotation = (expressionArray) => {
  const stack = []
  expressionArray.forEach((token) => {
    if (token in operators) {
      let [y, x] = [stack.pop(), stack.pop()]
      stack.push(operators[token].calc(x, y))
    } else {
      stack.push(token)
    }
  })
  return parseFloat(stack[0].toFixed(3))
}

const calculateResult = (expression) => {
  checkParenthesis(expression)
  const expressionWithoutSpace = deleteSpaces(expression)
  const expWithCorrectMultiplaly = addMultiplicationSigns(expressionWithoutSpace)
  const transformedToArray = transformToArray(expWithCorrectMultiplaly)
  const arrayWithHandledNumbers = parseNumber(transformedToArray)
  const arrayWithNegativeNumbers = negativeNumberHandler(arrayWithHandledNumbers)
  const arrayReversePolishNotation = toReversePolishNotation(arrayWithNegativeNumbers)
  const result = calculateReversePolishNotation(arrayReversePolishNotation)
  return result
}

module.exports = calculateResult
