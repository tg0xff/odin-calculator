const html = document.querySelector("html");
const colourButton = document.querySelector("#colourscheme");
colourButton.addEventListener("click", () =>
  html.classList.toggle("dark-mode"),
);

const prefersColor = window.matchMedia("(prefers-color-scheme: dark)");
prefersColor.addEventListener("change", (e) => {
  if (e.matches) {
    html.classList.add("dark-mode");
  } else {
    html.classList.remove("dark-mode");
  }
});
