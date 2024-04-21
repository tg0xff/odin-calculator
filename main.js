let operand0 = "";
let operator = "";
let operand1 = "";
let operationToFunction = {
  "+": add,
  "−": subtract,
  "×": multiply,
  "÷": divide,
}
let screenContent = "0";

const calcInputs = document.querySelector(".calc-inputs");
calcInputs.addEventListener("click", main);
const screen = document.querySelector(".screen");

function main(e) {
  if (e.target.parentNode.classList.contains("calc-numbers")) {
    screenContent = screenContent + e.target.textContent;
    screen.textContent = screenContent;
  }
}

function operate(operation, x, y) {
  let operF = operationToFunction[operation];
  return operF(+x, +y);
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
