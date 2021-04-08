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

const checkParenthesis = (expression) => {
  const quantityLeft = (expression.match(/\(/g) || []).length
  const quantityRight = (expression.match(/\)/g) || []).length

  if (quantityLeft !== quantityRight) {
    throw new Error(`There is an unclosed parenthesis : ${expression}`)
  }
}

const checkWrongSymbol = (symbol) => {
  if (!(isNumeric(symbol) || symbol in operators)) {
    throw new Error(`Unexpected symbol: ${symbol} `)
  }
}

const prepareExpression = (expression) => {
  checkParenthesis(expression)

  expression = expression.replace(/\s/g, '').split('')
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
  return arrayExpression // возвращает массив без пробелов и c объединенными цифрами в числа
}

const comparisonPriority = (stack, el) => {
  const lastOfStack = stack[stack.length - 1]
  if (
    stackIsEmpty(stack) ||
    operators[el].priority > operators[lastOfStack].priority
  ) {
    return true
  } else {
    return false
  }
}

const toReversePolishNotation = (expression) => {
  const expressionArray = prepareExpression(expression)
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

const calculateReversePolishNotation = (arrExpression) => {
  const stack = []
  arrExpression.forEach((token) => {
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
  const arrExpression = toReversePolishNotation(expression)
  const result = calculateReversePolishNotation(arrExpression)
  return result
}

module.exports = calculateResult
