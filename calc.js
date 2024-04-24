let operand0 = "";
let operator = "";
let operand1 = "";
let screenContent = "0";
let hasDecimalFraction = false;
let changedNumberInput = false;
let useCommaSeparator = false;
let screenMaxChars = 13;

const buttonIdToFunc = {
  one: enterNumber,
  two: enterNumber,
  three: enterNumber,
  four: enterNumber,
  five: enterNumber,
  six: enterNumber,
  seven: enterNumber,
  eight: enterNumber,
  nine: enterNumber,
  nought: enterNumber,
  dot: enterDot,
  backspace: enterBackspace,
  clear: resetState,
  plus: enterOperator,
  minus: enterOperator,
  multiplication: enterOperator,
  division: enterOperator,
  equals: enterEquals,
};
const buttonIdToNumber = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
  nought: "0",
};
const buttonIdToOperation = {
  plus: add,
  minus: subtract,
  multiplication: multiply,
  division: divide,
};

const commaButton = document.querySelector("#comma");
commaButton.addEventListener("click", () => {
  useCommaSeparator = !useCommaSeparator;
  commaButton.textContent = useCommaSeparator ? "." : ",";
  updateScreen();
});

const calcInputs = document.querySelector("#inputs");
calcInputs.addEventListener("click", main);
const screen = document.querySelector("#screen");

// Dynamically calculate how many characters can the calculator screen contain
// without overflowing every time the screen element is resized. It's not a
// perfect solution, its effectiveness depends on the font that's being
// rendered. It also makes the page performance somewhat worse. Nevertheless, I
// think this is better than just letting it overflow or hardcoding a character
// limit.
const screenObserver = new ResizeObserver((entries) => {
  for (const entry of entries) {
    const screenWidth = entry.borderBoxSize[0].inlineSize;
    const screenFontSize = window.getComputedStyle(entry.target, null).getPropertyValue('font-size');
    let screenEm = screenFontSize.slice(0, -2);
    screenEm = +screenEm;
    const screenCh = screenEm * 0.7;
    screenMaxChars = Math.round(screenWidth / screenCh);
    updateScreen();
  }
});
screenObserver.observe(screen);

function main(e) {
  const buttonId = e.target.getAttribute("id");
  const buttonFunction = buttonIdToFunc[buttonId];
  if (buttonFunction !== undefined) {
    buttonFunction(e);
    updateScreen();
  }
}

function enterOperator(e) {
  if (operand0 === "") {
    operand0 = screenContent;
    operator = e.target.getAttribute("id");
  } else if (changedNumberInput) {
    operand1 = screenContent;
    calculateResult();
    operator = e.target.getAttribute("id");
  }
  changedNumberInput = false;
}

function enterNumber(e) {
  const buttonId = e.target.getAttribute("id");
  const number = buttonIdToNumber[buttonId];
  if (screenContent === "0" || !changedNumberInput) {
    screenContent = number;
  } else {
    screenContent = screenContent + number;
  }
  changedNumberInput = true;
}

function enterEquals() {
  if (operand0 === "" && operator === "" && operand1 === "") {
    return;
  }

  if (screenContent === operand0 && !changedNumberInput) {
    calculateResult();
  } else {
    operand1 = screenContent;
    calculateResult();
  }
  changedNumberInput = false;
}

function enterBackspace() {
  if (screenContent.length > 1) {
    if (screenContent[screenContent.length - 1] === ".") {
      hasDecimalFraction = false;
    }
    screenContent = screenContent.slice(0, -1);
  } else {
    screenContent = "0";
  }
}

function enterDot() {
  if (!hasDecimalFraction) {
    screenContent = screenContent + ".";
    hasDecimalFraction = true;
  }
}

function calculateResult() {
  if (operator === "division" && operand1 === "0") {
    rejectDivideBy0();
    return;
  }
  let result = operate(operator, operand0, operand1);
  result = result.toFixed(0);
  if (result.length > screenMaxChars) {
    result = Number.parseFloat(result);
    screenContent = result.toExponential(3);
  } else {
    screenContent = result;
  }
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
  changedNumberInput = false;
}

function updateScreen() {
  let newScreen;

  if (screenContent.length > screenMaxChars) {
    newScreen = "…" + screenContent.slice(-screenMaxChars);
  } else {
    newScreen = screenContent;
  }

  if (useCommaSeparator) {
    newScreen = newScreen.replace(".", ",");
  }

  screen.textContent = newScreen;
}

function operate(operation, x, y) {
  x = +x;
  y = +y;
  const operationFunction = buttonIdToOperation[operation];
  return operationFunction(x, y);
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
