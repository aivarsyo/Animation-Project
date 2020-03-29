require("@babel/polyfill");
import { gsap } from "gsap";
import { Power1 } from "gsap";
import { Power2 } from "gsap";
import { Linear } from "gsap";
import { showAlert } from "./ending.js";

window.addEventListener("DOMContentLoaded", start);

async function start() {

    let response = await fetch("CarParts4.svg");

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

    FordLogo.addEventListener("touchstart", function () {
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

    //when ford clicked, assembly line shows up and parts drop on it, as well kills the animation for random movement

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

    // as well shows general info for this car as imported svg

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
    redButton.addEventListener("touchstart", redButtonClicked);
}

function redButtonClicked() {

    // when button clicked, parts move out of the screen and current objects disappear - next scene shows up

    const redButton = document.querySelector("#redButton");

    redButton.style.display = "none";

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
//defines the values for clicking on pedals and moving the car

let root = document.documentElement;
let currentPos = 0;
const endPos = -1000;
let moveDelay = 10;
let moveAmount = 0;
const acceleration = 0.5;
const friction = 1;
const topSpeed = 10;
let mousePressed = false;

function moveClouds() {

    // makes clouds move randomly in calculated distance

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

function skewFlags() {

    // skews flags forth and back

    gsap.to("#checkpoints > g > path:nth-child(1)", 2, {
        skewY: 10,
        yoyo: true,
        ease: Linear.easeNone,
        repeat: -1
    })

}

async function importsSecondScene() {

    document.querySelector("#firstScene").innerHTML = "";

    document.querySelector("body").classList.add("body-bck");

    document.querySelectorAll("#background, #car, #pedalsSection").forEach(element => {
        element.classList.remove("hidden");
    })

    let response = await fetch("background3.svg");
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
    importFilesForFlags();
    skewFlags();
}

function pedalsClicked() {

    // adds holding function on pedals, so that car can move forwards and backwards

    const wheels = document.querySelectorAll("#firstWheel, #secondWheel");
    const carDrives = document.querySelector("#carDrives");

    document.querySelector("#pedalsGroup > image:nth-child(1)").addEventListener("mousedown", () => {
        mousePressed = true;
        moveCar("left");

        carDrives.play();

        gsap.to(wheels, 3, {
            rotation: -360,
            repeat: -1,
            ease: Linear.easeNone,
            transformOrigin: "center"
        })

        event.preventDefault();
    });

    document.querySelector("#pedalsGroup > image:nth-child(2)").addEventListener("mousedown", () => {
        mousePressed = true;
        moveCar("right");

        carDrives.play();

        gsap.to(wheels, 3, {
            rotation: 360,
            repeat: -1,
            ease: Linear.easeNone,
            transformOrigin: "center"
        })

        event.preventDefault();
    });

    document.addEventListener("mouseup", () => {
        mousePressed = false;

        carDrives.pause();

        gsap.killTweensOf(wheels);

        event.preventDefault();
    });

    document.querySelector("#pedalsGroup > image:nth-child(1)").addEventListener("touchstart", () => {
        mousePressed = true;
        moveCar("left");

        carDrives.play();

        gsap.to(wheels, 3, {
            rotation: -360,
            repeat: -1,
            ease: Linear.easeNone,
            transformOrigin: "center"
        })

        event.preventDefault();
    });

    document.querySelector("#pedalsGroup > image:nth-child(2)").addEventListener("touchstart", () => {
        mousePressed = true;
        moveCar("right");

        carDrives.play();

        gsap.to(wheels, 3, {
            rotation: 360,
            repeat: -1,
            ease: Linear.easeNone,
            transformOrigin: "center"
        })

        event.preventDefault();
    });

    document.addEventListener("touchend", () => {
        mousePressed = false;

        carDrives.pause();

        gsap.killTweensOf(wheels);

        event.preventDefault();
    });

}

function moveCar(direction) {

    makeSmoke();
    let globalID;
    function repeatOften() {

        if (!mousePressed && Math.round(moveAmount) == 0) return;

        if (direction == "right") {
            currentPos -= getMoveSpeed();
        }
        if (direction == "left") {
            currentPos += getMoveSpeed();
        }

        if (currentPos > 0) {
            currentPos = 0;
        } else if (currentPos < -1010) {
            currentPos = -1010;
        }

        root.style.setProperty("--bgPos", currentPos + "px");
        document.querySelector("body").style.backgroundPositionX = "var(--bgPos)";

        checkForEnding();

        globalID = requestAnimationFrame(repeatOften);
    }
    globalID = requestAnimationFrame(repeatOften);
}

function checkForEnding() {

    // checks the current position of car and when it's at the end, fuel alerts shows up

    if (currentPos <= endPos) {
        showAlert();
    } else if (currentPos > endPos) {
        // or if car goes back, the alert disappears for UX
        document.querySelector("#fuelAlert").classList.add("hidden");
    }
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

function makeSmoke() {

    // svg of smoke shows up when car is moved and pedal pressed, duplicates itself
    // and when released, disappears

    if (!mousePressed) return;
    let s = document.createElement("div");
    loadSVG("smoke.svg", s);
    s.classList.add("smokeAnim");
    s.addEventListener("animationend", () => {
        s.remove();
    });
    document.querySelector("#car").appendChild(s);
    setTimeout(() => {
        makeSmoke();
    }, 100);
}

async function loadSVG(url, parent) {
    let response = await fetch(url);
    let mySVG = await response.text();
    parent.innerHTML = mySVG;
}

/* --------------------------------- */

async function importFilesForFlags() {

    let response = await fetch("engine4.svg");
    let mySvgData = await response.text();
    document.querySelector("#modalEngine").innerHTML = mySvgData;

    fetch('carInfo.json')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            //console.log(data)
            data.forEach(oneFlagClicked);
        });


}

function oneFlagClicked(data) {

    // if a specific flag is clicked, the engine svg shows up and inserts
    // the needed json data

    console.log(data);

    let flag = document.getElementById(`${data.id}`);

    if (data.id == flag.id) {
        flag.addEventListener("click", clickFlag)
        flag.addEventListener("touchstart", clickFlag)
    } else {
        console.log("else")
    }

    function clickFlag() {

        flag.childNodes[1].style.fill = "#13D821";

        const bigEngine = document.querySelector("#modalEngine > svg");
        const containerOfEngine = document.querySelector("#modalEngine");
        let textOfModal = document.querySelector("#engineModal > g > text:nth-child(4)");
        let titleOfModal = document.querySelector("#engineModal > g > text:nth-child(6)");

        containerOfEngine.classList.remove("hidden");

        gsap.set(bigEngine, {
            transformOrigin: "center",
            scale: 0
        })

        gsap.to(bigEngine, {
            scale: 1
        })

        const span = document.createElement("span");
        span.classList.add("close");
        document.querySelector("#modalEngine").appendChild(span);

        span.innerHTML = "&times;";

        span.addEventListener("click", function () {
            containerOfEngine.classList.add("hidden");
        })
        span.addEventListener("touchstart", function () {
            containerOfEngine.classList.add("hidden");
        })

        titleOfModal.textContent = data.title;
        textOfModal.textContent = data.description;

        document.querySelectorAll("#titleOfModal, #descOfModal").forEach(element => {
            d3plus.textwrap()
                .container(d3.select(element))
                .resize(true)
                .draw();
        })


    }

}

