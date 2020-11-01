const selector   = document.querySelector('#version-selection');
const checkTrace = document.querySelector('#trace-check');
const checkLine  = document.querySelector('#line-check');
const checkPoint = document.querySelector('#point-check');
const rangeInp   = document.querySelector('#range-state');
const startBtn   = document.querySelector('#btn-start');
const pauseBtn   = document.querySelector('#btn-pause');
const roundBtn   = document.querySelector('#btn-round');
const resetBtn   = document.querySelector('#btn-reset');

startBtn.onclick    = () => start();
pauseBtn.onclick    = () => pause();
roundBtn.onclick    = () => { autoRestart = true; start(); }
resetBtn.onclick    = () => reset();
checkTrace.onchange = () => renderCanvas();
checkLine.onchange  = () => renderCanvas();
checkPoint.onchange = () => renderCanvas();
rangeInp.oninput    = () => { movePercentage = Number(rangeInp.value); setNextPointPosition(); renderCanvas(); };
selector.onchange   = () => renderCanvas();

const disableElements = [startBtn, roundBtn, checkTrace, checkLine, checkPoint, rangeInp, selector];

// initial fix points
const framePointsLocations = [
    { x: 100, y: 250 },
    { x: 400, y: 50 },
    { x: 500, y: 500 },
    { x: 750, y: 200 },
];

let framePoints     = [];
let linearPoints    = [];
let quadraticPoints = [];
let cubicPoints     = [];

let movePercentage  = 0;
let interval        = null;
let dragIdx         = -1;
let autoRestart     = false;

function reset() {
    flipDisabledState(true);

    clearInterval(interval);

    autoRestart     = false;
    movePercentage  = 0;
    framePoints     = [];
    linearPoints    = [];
    quadraticPoints = [];
    cubicPoints     = [];

    framePointsLocations.forEach( (p) => {
        framePoints.push(     { x: p.x, y: p.y } );
        linearPoints.push(    { x: p.x, y: p.y } );
        quadraticPoints.push( { x: p.x, y: p.y } );
        cubicPoints.push(     { x: p.x, y: p.y } );
    });
    linearPoints.pop();
    quadraticPoints.pop();
    quadraticPoints.pop();
    cubicPoints.pop();
    cubicPoints.pop();
    cubicPoints.pop();

    const traceState   = checkTrace.checked;
    checkTrace.checked = false;
    renderCanvas();

    rangeInp.value     = movePercentage;
    checkTrace.checked = traceState;
}

function start() {
    flipDisabledState();

    if ( (1 - movePercentage) < 0.01) { movePercentage = 0; }
    interval = setInterval(() => {
        setNextPointPosition();
        renderCanvas();
    }, 10);
}

function pause() {
    flipDisabledState();
    clearInterval(interval);
    autoRestart = false;
}

function setNextPointPosition() {
    if (movePercentage <= 1) {
        calculateNextPosition(linearPoints, framePoints);
        calculateNextPosition(quadraticPoints, linearPoints);
        calculateNextPosition(cubicPoints, quadraticPoints);

        movePercentage += 0.003;
        if (rangeInp.hasAttribute('disabled')) {
            rangeInp.value = movePercentage;
        }
    } else {
        autoRestart ? movePercentage = 0 : pause();
    }
}

function calculateNextPosition(toCalculate, parent) {
    for(let i = 0; i < toCalculate.length; i++) {
        toCalculate[i].x = ( (1 - movePercentage) * parent[i].x ) + ( movePercentage * parent[i + 1].x );
        toCalculate[i].y = ( (1 - movePercentage) * parent[i].y ) + ( movePercentage * parent[i + 1].y );
    }
}

function flipDisabledState(reset) {
    if (startBtn.hasAttribute('disabled') || reset) {
        disableElements.forEach(elem => elem.removeAttribute('disabled'));
        pauseBtn.setAttribute('disabled', '');
    } else {
        disableElements.forEach(elem => elem.setAttribute('disabled', ''));
        pauseBtn.removeAttribute('disabled');
    }
}

function mouseDownEvent(event, rect) {
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    dragIdx = framePointsLocations.findIndex(p => Math.abs(p.x - x) < 5 && Math.abs(p.y - y) < 5);
}

function mouseMoveEvent(event, rect) {
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    if (dragIdx >= 0) {
        framePointsLocations[dragIdx].x = x;
        framePointsLocations[dragIdx].y = y;
        reset();
    }
}

function mouseUpEvent() {
    if (dragIdx >= 0) { dragIdx = -1; }
}