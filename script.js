require("@babel/polyfill");
import { gsap } from "gsap";
import { Power1 } from "gsap";
import { Power2 } from "gsap";
import { Linear } from "gsap";
import { Bounce } from "gsap";

let myAnimation;

window.addEventListener("DOMContentLoaded", start);

async function start() {

    let response = await fetch("carParts4.svg");

    let mySvgData = await response.text();

    document.querySelector("#carParts").innerHTML = mySvgData;

    moveCarParts();

    importAssemblyLine();
}

function moveCarParts() {

    var _container = document.querySelector("#CarParts");
    var _parts = document.querySelectorAll('#CarParts > g:not(#FordLogo)');
    var _maxY = _container.getBBox().height;
    var _maxX = _container.getBBox().width;

    function _NextMovement(part) {
        var r = 10,
            minY = r,
            minX = r,
            maxY = _maxY - r,
            maxX = _maxX - r,
            randY = random(minY, maxY),
            randX = random(minX, maxX);

        part.gsap = gsap.to(part, random(5, 10), {
            x: randX / 20,
            y: randY / 20,
            ease: Power1.easeInOut,
            onComplete: function () {
                _NextMovement(part);
            }
        });
    }


    function random(min, max) {
        if (max == null) {
            max = min;
            min = 0;
        }
        return Math.random() * (max - min) + Number(min);
    }

    // initialize
    for (let i = 0; i < _parts.length; i++) {
        _NextMovement(_parts[i]);
    }
};

async function importAssemblyLine() {

    const FordLogo = document.querySelector("#FordLogo");

    FordLogo.addEventListener("click", function () {
        fordLogoClicked();
    });
}

async function fordLogoClicked() {

    let response = await fetch("assemblyLine2.svg");

    let mySvgData = await response.text();

    document.querySelector("#assemblyLine").innerHTML = mySvgData;

    continueFordClicked();
}

function continueFordClicked() {

    const assemblyLine = document.createElementNS('http://www.w3.org/2000/svg', 'use');

    assemblyLine.setAttribute("href", "#AssemblyLine");

    document.querySelector("#CarParts").appendChild(assemblyLine);

    assemblyLine.y.baseVal.value = 300;

    var parts = document.querySelectorAll('#CarParts > g:not(#FordLogo)');

    gsap.killTweensOf(parts);

    gsap.to(parts, {
        y: (index, element) => {
            var box = element.getBBox();
            return 630 - box.y - box.height;
        },
        ease: Power2.easeOut,
    });

    document.querySelector("#FordLogo").style.display = "none";

    importsMainInfo();

}

async function importsMainInfo() {

    let response = await fetch("infoMain3.svg");

    let mySvgData = await response.text();

    document.querySelector("#infoMain").innerHTML = mySvgData;

    showsMainInfo();
}

function showsMainInfo() {

    const mainInfo = document.createElementNS('http://www.w3.org/2000/svg', 'use');

    mainInfo.setAttribute("href", "#InfoMain");

    document.querySelector("#CarParts").appendChild(mainInfo);

    clickRedButton();
}

function clickRedButton() {

    const redButton = document.querySelector("#redButton");

    redButton.addEventListener("click", redButtonClicked);
}

function redButtonClicked() {

    const engineSound = document.querySelector("#engineSound");

    engineSound.play();

    const engines = document.querySelectorAll("#AssemblyLine > g:not(#conveyer)");

    gsap.to(engines, 3, {
        rotation: 360,
        repeat: -1,
        ease: Linear.easeNone,
        transformOrigin: "center"
    })

    const carParts = document.querySelectorAll("#CarParts > g:not(#FordLogo)")

    gsap.to(carParts, 3, {
        x: 1000,
        ease: Linear.easeNone,
        onComplete: function () {
            introScreenDisappears();
            engineSound.pause();
        }
    })

    function introScreenDisappears() {

        gsap.killTweensOf(engines);

        const allSvgs = document.querySelectorAll("#CarParts");

        gsap.to(allSvgs, 2, {
            opacity: 0,
            onComplete: function () {
                importsSecondScene();
            }
        })
    }

}

/* ------------------------------------------- */

let root = document.documentElement;
let currentPos = 0;
let moveDelay = 10;
let moveAmount = 0;
const acceleration = 0.5;
const friction = 1;
const topSpeed = 10;
let mousePressed = false;

function moveClouds() {

    var _container = document.querySelector("#backgroundSecondScene");
    var _parts = document.querySelectorAll('#clouds > *');
    var _maxY = _container.getBBox().height;
    var _maxX = _container.getBBox().width;

    function _NextMovement(part) {
        var r = 50,
            minY = r,
            minX = r,
            maxY = _maxY - r,
            maxX = _maxX - r,
            randY = random(minY, maxY),
            randX = random(minX, maxX);

        part.gsap = gsap.to(part, random(5, 10), {
            y: randY / 10,
            ease: Power1.easeInOut,
            onComplete: function () {
                _NextMovement(part);
            }
        });
    }


    function random(min, max) {
        if (max == null) {
            max = min;
            min = 0;
        }
        return Math.random() * (max - min) + Number(min);
    }

    // initialize
    for (let i = 0; i < _parts.length; i++) {
        _NextMovement(_parts[i]);
    }
};



async function importsSecondScene() {

    document.querySelector("#firstScene").innerHTML = "";

    document.querySelector("body").classList.add("body-bck");

    document.querySelectorAll("#background, #car, #pedalsSection").forEach(element => {
        element.classList.remove("hidden");
    })

    let response = await fetch("background2.svg");
    let mySvgData = await response.text();
    document.querySelector("#background").innerHTML = mySvgData;

    let response2 = await fetch("fordCar6.svg");
    let mySvgData2 = await response2.text();
    document.querySelector("#car").innerHTML = mySvgData2;

    let response3 = await fetch("pedals2.svg");
    let mySvgData3 = await response3.text();
    document.querySelector("#pedalsSection").innerHTML = mySvgData3;

    pedalsClicked();
    moveClouds();
}

function pedalsClicked() {

    const wheels = document.querySelectorAll("#firstWheel, #secondWheel");

    document.querySelector("#pedalsGroup > image:nth-child(1)").addEventListener("mousedown", () => {
        mousePressed = true;
        moveCar("left");

        const carDrives = document.querySelector("#carDrives");
        carDrives.play();

        gsap.to(wheels, 3, {
            rotation: -360,
            repeat: -1,
            ease: Linear.easeNone,
            transformOrigin: "center"
        })
    });
    document.querySelector("#pedalsGroup > image:nth-child(2)").addEventListener("mousedown", () => {
        mousePressed = true;
        moveCar("right");

        const carDrives = document.querySelector("#carDrives");
        carDrives.play();

        gsap.to(wheels, 3, {
            rotation: 360,
            repeat: -1,
            ease: Linear.easeNone,
            transformOrigin: "center"
        })
    });
    document.addEventListener("mouseup", () => {
        mousePressed = false;

        const carDrives = document.querySelector("#carDrives");
        carDrives.pause();

        gsap.killTweensOf(wheels);
    });
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
    document.querySelector("body").style.backgroundPositionX = "var(--bgPos)";

    if (currentPos > 0) {
        currentPos = 0;
    } /* else if (currentPos < -625) {
        currentPos = -625;
    } */

    setTimeout(function () {
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
