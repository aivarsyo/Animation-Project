window.addEventListener("DOMContentLoaded", start);

let root = document.documentElement;
let currentPos = 0;
let moveDelay = 10;
let moveAmount = 0;
const acceleration = 0.5;
const friction = 1;
const topSpeed = 10;
let mousePressed = false;

function start() {
  loadSVG("/background.svg", document.querySelector("#background"));
  loadSVG("/car.svg", document.querySelector("#car"));
  loadSVG("/moveBackButton.svg", document.querySelector("#button1"));
  loadSVG("/moveForwardButton.svg", document.querySelector("#button2"));
  document.querySelector("#button1").addEventListener("mousedown", () => {
    mousePressed = true;
    moveCar("left");
  });
  document.querySelector("#button2").addEventListener("mousedown", () => {
    mousePressed = true;
    moveCar("right");
  });
  document.addEventListener("mouseup", () => {
    mousePressed = false;
  });
}

async function loadSVG(url, parent) {
  let response = await fetch(url);
  let mySVG = await response.text();

  parent.innerHTML = mySVG;
}

function moveCar(direction) {
  if (!mousePressed && Math.round(moveAmount) == 0) return;

  if (direction == "right") {
    currentPos -= getMoveSpeed();
  }
  if (direction == "left") {
    currentPos += getMoveSpeed();
  }
  root.style.setProperty("--bgPos", currentPos + "px");
  console.log(currentPos);
  setTimeout(function() {
    moveCar(direction);
  }, moveDelay);
}

function getMoveSpeed() {
  if (mousePressed) {
    if (moveAmount < topSpeed) {
      moveAmount += acceleration;
    } else {
      moveAmount = topSpeed;
    }
  } else {
    if (moveAmount > 0) {
      moveAmount -= friction;
    }
    if (moveAmount < 0) {
      moveAmount += friction;
    }
  }
  return moveAmount;
}

async function makeSmoke() {
  let s = document.createElement("div");
  s.classList.add("smokeAnim");
  let response = await fetch(url);
  let mySVG = await response.text();
  s.innerHTML = mySVG;
  s.addEventListener("animationEnd", () => {
    s.remove();
  });
  document.querySelector("#car").appendChild(s);
}
