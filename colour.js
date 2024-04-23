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

function updateColourButton() {
  if (html.classList.contains("dark-mode")) {
    colourButton.textContent = "Light";
  } else {
    colourButton.textContent = "Dark";
  }
}
updateColourButton();
