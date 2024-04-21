let operand0;
let operator;
let operand1;
let operationToFunction = {
  "+": add,
  "−": subtract,
  "×": multiply,
  "÷": divide,
}

function add(x, y) {
  return x + y;
}

function subtract(x, y) {
  return x - y;
}

function multiply(x, y) {
  return x * y;
}

function divide(x, y) {
  return x / y;
}

function operate(operation, x, y) {
  let operF = operationToFunction[operation];
  return operF(x, y);
}
