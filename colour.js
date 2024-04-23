const html = document.querySelector("html");
const colourButton = document.querySelector("#colourscheme");
colourButton.addEventListener("click", () => html.classList.toggle("dark-mode"));
