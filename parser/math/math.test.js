const calculateResult = require('./math')

test('Operator +', () => {
  expect(calculateResult('2+2')).toBe(4)
})
test('Operator -', () => {
  expect(calculateResult('5-7')).toBe(-2)
})
test('Operator *', () => {
  expect(calculateResult('6*5')).toBe(30)
})
test('Operator /', () => {
  expect(calculateResult('42/6')).toBe(7)
})
test('Expression with negative numbers', () => {
  expect(calculateResult('42*-7')).toBe(-294)
})
test('Check priority of operation in simple expression', () => {
  expect(calculateResult('2+2*2')).toBe(6)
})
test('Expression with parenthesis', () => {
  expect(calculateResult('(2+2)*2')).toBe(8)
})
test('Сomplex expression with parenthesis', () => {
  expect(calculateResult('(2+4)(6-4)+(7+17)/8')).toBe(15)
})

test('Expression with spaces', () => {
  expect(calculateResult('   8   /(  5  +  3   )')).toBe(1)
})

test('Expression with unmatched parenthesis', () => {
  expect(() => calculateResult('(6+7)/(8+3')).toThrow(
    'There is an unclosed parenthesis: (6+7)/(8+3'
  )
})
test('Expression with wrong symbol', () => {
  expect(() => calculateResult('2+2b')).toThrow('Unexpected symbol: b')
})
test('Division by zero', () => {
  expect(() => calculateResult('(15 + 5)/(8 - 8)')).toThrow('Division by zero :(15 + 5)/(8 - 8)')
})
