import * as esprima from 'esprima'
const Compare = function(left: any, operator: string, right: any) {
  console.log(operator, 'operator')
  switch (operator) {
    case '+':
      return left + right
    case '-':
      return left - right
    case '*':
      return left * right
    case '/':
      return left / right
    case '%':
      return left % right
    case '**':
      return left ** right
    case '&&':
      return left && right
    case '||':
      return left || right
    case 'in':
      return left in right
    case 'instanceof':
      return left instanceof right
    case '<':
      return left < right
    case '>':
      return left > right
    case '==':
      return left == right
    case '===':
      return left === right
    case '>=':
      return left >= right
    case '<=':
      return left <= right
    case '!=':
      return left != right
    case '!==':
      return left !== right
  }
}
type Operator = '++' | '--'
const Update = function(value: number, operator: Operator, prefix: boolean) {
  switch (operator) {
    case '++':
      if (prefix) {
        return ++value
      } else {
        return value++
      }
    case '--':
      if (prefix) {
        return --value
      } else {
        return value--
      }
  }
}
type Value = string | number | object | boolean | JSNode
type JSNode = {
  type:
    | 'Literal'
    | 'ConditionalExpression'
    | 'Identifier'
    | 'BinaryExpression'
    | 'LogicalExpression'
    | 'UpdateExpression'
    | 'MemberExpression'
  value: Value
  name: string
  consequent: JSNode
  alternate: JSNode
  test: JSNode
  left: JSNode
  right: JSNode
  operator: '++' | '--' | string
  argument: JSNode
  prefix: boolean
  object: JSNode
  property: JSNode
}
const run = function<T extends { [key: string]: any }>(
  node: JSNode,
  objValue: T
): Value {
  if (node.type === 'Literal') {
    return node.value
  }
  if (node.type === 'Identifier') {
    return objValue[node.name]
  }
  if (node.type === 'ConditionalExpression') {
    let result = run<T>(node.test, objValue)
    if (result) return run<T>(node.consequent, objValue)
    else return run<T>(node.alternate, objValue)
  }

  if (node.type === 'BinaryExpression' || node.type === 'LogicalExpression') {
    let left = run<T>(node.left, objValue)
    let right = run<T>(node.right, objValue)
    return Compare(left, node.operator, right)
  }

  if (node.type === 'UpdateExpression') {
    return Update(
      run<T>(node.argument, objValue) as number,
      node.operator as Operator,
      node.prefix
    )
  }

  if (node.type === 'MemberExpression') {
    let propValue = run<T>(node.object, objValue) as object
    return run(node.property, propValue)
  }
  return objValue
}

export default function ExpressionRun<T = any>(expression: string, value: T) {
  let program = esprima.parseScript(expression)
  if (program.body[0].type !== 'ExpressionStatement') return false
  let exp = program.body[0].expression as JSNode
  return run<T>(exp, value)
}
