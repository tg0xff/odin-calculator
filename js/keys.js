const keyToId = {
  Digit1: "one",
  Digit2: "two",
  Digit3: "three",
  Digit4: "four",
  Digit5: "five",
  Digit6: "six",
  Digit7: "seven",
  Digit8: "eight",
  Digit9: "nine",
  Digit0: "nought",
  Numpad1: "one",
  Numpad2: "two",
  Numpad3: "three",
  Numpad4: "four",
  Numpad5: "five",
  Numpad6: "six",
  Numpad7: "seven",
  Numpad8: "eight",
  Numpad9: "nine",
  Numpad0: "nought",
  Period: "dot",
  NumpadDecimal: "dot",
  Backspace: "backspace",
  Delete: "clear",
  Escape: "clear",
  NumpadAdd: "plus",
  NumpadSubtract: "minus",
  NumpadMultiply: "multiplication",
  NumpadDivide: "division",
  NumpadEnter: "equals",
  Enter: "equals",
  Equal: "equals",
};

window.addEventListener("keydown", (e) => {
  const button = getButtonElement(e);
  if (button !== null) {
    button.click();
    button.classList.add("active");
  }
});

window.addEventListener("keyup", (e) => {
  const button = getButtonElement(e);
  if (button !== null) {
    button.classList.remove("active");
  }
});

function getButtonElement(e) {
  const buttonId = keyToId[e.code];
  return document.querySelector(`#${buttonId}`);
}
