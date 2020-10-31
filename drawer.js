const canvas = document.querySelector('canvas');
canvas.style.border = '2px black solid';
canvas.width = document.querySelector('.col').offsetWidth * 0.97;
canvas.height = 600;

const BEZIER_COLOR     = 'red';
const FRAMEPOINT_COLOR = 'black'
const FRAMELINE_COLOR  = 'grey';
const FIRST_COLOR      = 'green';
const SECOND_COLOR     = 'blue'

window.onresize = () => { canvas.width = document.querySelector('.col').offsetWidth * 0.97; renderCanvas(); }

const ctx = canvas.getContext('2d');
ctx.lineWidth = 2;

function drawPoint(point, color) {
    ctx.beginPath();
    ctx.ellipse(point.x, point.y, 5, 5, 0, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.strokeStyle = color;
    ctx.fill();
    ctx.closePath();
}

function drawLine(origin, destination, color) {
    ctx.beginPath();
    ctx.moveTo(origin.x, origin.y);
    ctx.lineTo(destination.x, destination.y);
    ctx.strokeStyle = color;
    ctx.stroke();
    ctx.closePath();
}

function renderCanvas() {
    if (!checkTrace.checked) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    for(let i = 1; i < framePoints.length; i++) {
        const prev = framePoints[i - 1];
        const curr = framePoints[i];
        if (checkLine.checked) { drawLine(prev, curr, FRAMELINE_COLOR); }
    }
    
    for (const point of framePoints) {
        drawPoint(point, FRAMEPOINT_COLOR);
    }

    const selectorValue = Number(selector.value);
    for (let i = 0; i < selectorValue; i++) {
        let drawColor = FIRST_COLOR;
        if (selectorValue === 1) { drawColor = BEZIER_COLOR; }

        if (checkPoint.checked || selectorValue === 1) { drawPoint(linearPoints[i], drawColor); }

        if (i > 0) {
            if (checkLine.checked) { drawLine(linearPoints[i - 1], linearPoints[i], drawColor); }
        }
    }

    for (let i = 0; i < (selectorValue - 1); i++) {
        let drawColor = SECOND_COLOR;
        if (selectorValue === 2) { drawColor = BEZIER_COLOR; }

        if (checkPoint.checked || selectorValue === 2) { drawPoint(quadraticPoints[i], drawColor); }
        if (i > 0) {
            if (checkLine.checked) { drawLine(quadraticPoints[i - 1], quadraticPoints[i], drawColor); }
        }
    }

    for (let i = 0; i < (selectorValue - 2); i++) {
        drawPoint(cubicPoints[i], BEZIER_COLOR);
        if (i > 0) {
            drawLine(cubicPoints[i - 1], cubicPoints[i], BEZIER_COLOR);
        }
    }
}

canvas.addEventListener('mousedown', evt => mouseDownEvent(evt, canvas.getBoundingClientRect()));
canvas.addEventListener('mousemove', evt => mouseMoveEvent(evt, canvas.getBoundingClientRect()));
canvas.addEventListener('mouseup',   ()  => mouseUpEvent());