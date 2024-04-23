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
  switch (e.target.getAttribute("id")) {
    case "calc-dot":
      if (!hasDecimalFraction) {
        screenContent = screenContent + ".";
        hasDecimalFraction = true;
      }
      break;

    case "calc-backspace":
      if (screenContent[screenContent.length - 1] === ".") {
        hasDecimalFraction = false;
      }
      screenContent = screenContent.slice(0, -1);
      break;

    case "calc-equals":
      if (operand0 === "" && operator === "" && operand1 === "") {
        return;
      }
      calculateResult();
      break;

    case "calc-clear":
      resetState();
      break;

    default:
      switch (e.target.parentNode.getAttribute("id")) {
        case "calc-numbers":
          if (screenContent === "0" || screenContent === operand0) {
            screenContent = e.target.textContent;
          } else {
            screenContent = screenContent + e.target.textContent;
          }
          break;

        case "calc-operators":
          if (operand0 === "") {
            operand0 = screenContent;
            operator = e.target.textContent;
          } else {
            calculateResult();
          }
          break;
      }
  }
  updateScreen();
}

function calculateResult() {
  if (operand1 === "" || screenContent !== operand0) {
    operand1 = screenContent;
  }
  if (operator === "÷" && operand1 === "0") {
    rejectDivideBy0();
    return;
  }
  screenContent = operate(operator, operand0, operand1);
  screenContent = screenContent.toString();
  hasDecimalFraction = !!screenContent.includes(".");
  operand0 = screenContent;
}

function rejectDivideBy0() {
  resetState();
  const body = document.querySelector("body");
  const p = document.createElement("p");
  p.classList.add("error-message");
  p.textContent = "I'm sorry, Dave. I'm afraid I can't do that.";
  body.appendChild(p);
  setTimeout(() => body.removeChild(p), 5000);
}

function resetState() {
  operand0 = "";
  operator = "";
  operand1 = "";
  screenContent = "0";
  hasDecimalFraction = false;
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
