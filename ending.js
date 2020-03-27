window.addEventListener("DOMContentLoaded", start);

const fuel = document.querySelector("#fuelAlert");
const adviceBox = document.querySelector("#adviceBox");

async function start() {
  let response = await fetch("/fuelalert.svg");
  let mySvg = await response.text();

  fuel.innerHTML = mySvg;
}

export function showAlert() {
  // start animation
  fuel.classList.remove("hidden");
  fuel.classList.add("fuelAnim");
  fuel.addEventListener("click", redirectToBeginning);
}

function redirectToBeginning() {
  window.location.href = "index.html";
}

function showAdvicePopup() {
  hideElement(fuel);
  document.querySelector("#adviceBox").classList.remove("hidden");
  document.querySelector("#adviceBox").addEventListener("click", hideAdvicePopup);
}

function hideAdvicePopup() {
  adviceBox.addEventListener("animationend", hideElement(adviceBox));
}

function hideElement(e) {
  e.classList.add("hidden");
}
