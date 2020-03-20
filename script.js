

window.addEventListener("DOMContentLoaded", start);

async function start() {

    let response = await fetch("Car_Parts/carParts.svg");

    let mySvgData = await response.text();

    document.querySelector("#carParts").innerHTML = mySvgData;
}