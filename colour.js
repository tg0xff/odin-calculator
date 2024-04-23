const html = document.querySelector("html");
const colourButton = document.querySelector("#colourscheme");
colourButton.addEventListener("click", () => {
  html.classList.toggle("dark-mode");
  updateColourButton();
});

const prefersColor = window.matchMedia("(prefers-color-scheme: dark)");
prefersColor.addEventListener("change", (e) => {
  if (e.matches) {
    html.classList.add("dark-mode");
  } else {
    html.classList.remove("dark-mode");
  }
  updateColourButton();
});

const buttonIcon = colourButton.querySelector("span");
function updateColourButton() {
  if (html.classList.contains("dark-mode")) {
    if (buttonIcon.classList.contains("fa-moon")) {
      buttonIcon.classList.remove("fa-moon");
    }
    buttonIcon.classList.add("fa-sun");
  } else {
    if (buttonIcon.classList.contains("fa-sun")) {
      buttonIcon.classList.remove("fa-sun");
    }
    buttonIcon.classList.add("fa-moon");
  }
}
updateColourButton();
