const canvas = document.querySelector('canvas');
canvas.style.border = '2px black solid';
canvas.width = document.querySelector('.col').offsetWidth;
canvas.height = 600;

const ctx = canvas.getContext('2d');
ctx.lineWidth = 2;

function createPoint(point, color) {
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
        if (checkLine.checked) { drawLine(prev, curr, 'black'); }
    }
    
    for (const point of framePoints) {
        createPoint(point, 'blue');
    }

    const selectorValue = Number(selector.value);
    for (let i = 0; i < selectorValue; i++) {
        if (checkPoint.checked) { createPoint(linearPoints[i], 'red'); }
        if (i > 0) {
            if (checkLine.checked) { drawLine(linearPoints[i - 1], linearPoints[i], 'red'); }
        }
    }

    for (let i = 0; i < (selectorValue - 1); i++) {
        if (checkPoint.checked || selectorValue === 2) { createPoint(quadraticPoints[i], 'green'); }
        if (i > 0) {
            if (checkLine.checked) { drawLine(quadraticPoints[i - 1], quadraticPoints[i], 'green'); }
        }
    }

    for (let i = 0; i < (selectorValue - 2); i++) {
        createPoint(cubicPoints[i], 'black');
        if (i > 0) {
            drawLine(cubicPoints[i - 1], cubicPoints[i], 'black');
        }
    }
}

canvas.addEventListener('mousedown', evt => mouseDownEvent(evt, canvas.getBoundingClientRect()));
canvas.addEventListener('mousemove', evt => mouseMoveEvent(evt, canvas.getBoundingClientRect()));
canvas.addEventListener('mouseup',   ()  => mouseUpEvent());