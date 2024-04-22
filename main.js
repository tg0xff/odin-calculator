let operand0 = "";
let operator = "";
let operand1 = "";
let screenContent = "0";
let hasDecimalFraction = false;
let operationToFunction = {
  "+": add,
  "−": subtract,
  "×": multiply,
  "÷": divide,
};

const calcInputs = document.querySelector("#calc-inputs");
calcInputs.addEventListener("click", main);
const screen = document.querySelector("#screen");

function main(e) {
  if (e.target.textContent === ".") {
    if (!hasDecimalFraction) {
      screenContent = screenContent + ".";
      hasDecimalFraction = true;
    }
  } else if (e.target.textContent === "⌫") {
    if (screenContent[screenContent.length - 1] === ".") {
      hasDecimalFraction = false;
    }
    screenContent = screenContent.slice(0, -1);
  } else if (e.target.parentNode.getAttribute("id") === "calc-numbers") {
    if (screenContent === "0" || screenContent === operand0) {
      screenContent = e.target.textContent;
    } else {
      screenContent = screenContent + e.target.textContent;
    }
  } else if (e.target.textContent === "=") {
    if (operand0 === "" && operator === "" && operand1 === "") {
      return;
    }
    calculateResult();
  } else if (e.target.textContent === "C") {
    operand0 = "";
    operator = "";
    operand1 = "";
    screenContent = "0";
    hasDecimalFraction = false;
  } else if (e.target.parentNode.getAttribute("id") === "calc-operators") {
    if (operand0 === "") {
      operand0 = screenContent;
      operator = e.target.textContent;
    } else {
      calculateResult();
    }
  }
  updateScreen();
}

function calculateResult() {
  if (operand1 === "" || screenContent !== operand0) {
    operand1 = screenContent;
  }
  screenContent = operate(operator, operand0, operand1);
  screenContent = screenContent.toString();
  hasDecimalFraction = !!screenContent.includes(".");
  operand0 = screenContent;
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
