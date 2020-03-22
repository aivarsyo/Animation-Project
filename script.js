require("@babel/polyfill");
import { gsap } from "gsap";
import { Power1 } from "gsap";

window.addEventListener("DOMContentLoaded", start);

async function start() {

    let response = await fetch("carParts.svg");

    let mySvgData = await response.text();

    document.querySelector("#carParts").innerHTML = mySvgData;

    moveCarParts();
}

function moveCarParts() {
    var _container = document.querySelector("#CarParts");
    var _parts = document.querySelectorAll('#CarParts > g');
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

        gsap.to(part, random(5, 10), {
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
    for (var i = 0; i < _parts.length; i++) {
        _NextMovement(_parts[i]);
    }
};


