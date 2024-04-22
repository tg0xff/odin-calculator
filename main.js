let operand0 = "0";
let operator = "+";
let operand1 = "0";
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
  if (e.target.textContent === "C") {
    operand0 = "0";
    operator = "+";
    operand1 = "0";
    screenContent = "0";
  } else if (e.target.textContent === "=") {
    operand1 = screenContent;
    screenContent = operate(operator, operand0, operand1);
    screenContent = screenContent.toString();
  } else if (e.target.textContent === "⌫") {
    screenContent = screenContent.slice(0, -1);
  } else if (e.target.parentNode.getAttribute("id") === "calc-operators") {
    operand0 = screenContent;
    operator = e.target.textContent;
    screenContent = "0";
  } else if (e.target.parentNode.getAttribute("id") === "calc-numbers") {
    screenContent = screenContent + e.target.textContent;
  }
  updateScreen();
}

function updateScreen() {
  let newScreen;
  if (screenContent.length > 13) {
    newScreen = "…" + screenContent.slice(-13);
  } else {
    newScreen = screenContent;
  }
  screen.textContent = newScreen;
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
