import { Title } from './libraries/ResumeElements.js'
console.log("crying")
console.log("did it stop?")
    var
        // Obtain a reference to the canvas element using its id.
        htmlCanvas = document.getElementById('theCanvas'),
        // Obtain a graphics context on the canvas element for drawing.
        context = htmlCanvas.getContext('2d');

    // Start listening to resize events and draw canvas.
    initialize();

    function initialize() {
        // Register an event listener to call the resizeCanvas() function 
        // each time the window is resized.
        window.addEventListener('resize', resizeCanvas, false);
        // Draw canvas border for the first time.
        resizeCanvas();
    }

    // Display custom canvas. In this case it's a blue, 5 pixel 
    // border that resizes along with the browser window.
    function redraw() {
        context.strokeStyle = 'blue';
        context.lineWidth = '5';
        context.strokeRect(0, 0, window.innerWidth, window.innerHeight);
    }

    // Runs each time the DOM window resize event fires.
    // Resets the canvas dimensions to match window,
    // then draws the new borders accordingly.
    function resizeCanvas() {
        htmlCanvas.width = window.innerWidth;
        htmlCanvas.height = window.innerHeight;
        redraw();
    }
/*
import('./libraries/p5.js')
console.log("please?")
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
ctx.beginPath();
ctx.rect(20, 40, 50, 50);
ctx.fillStyle = "#FF0000";
ctx.fill();
ctx.closePath();
function setup()
{
    console.log("pls")
    let listOfResumeElements = [];
    canvasWidth = windowWidth * 0.9;
    canvasHeight = windowHeight;
    var canvas = createCanvas(windowWidth * 0.9, windowHeight*2)
    canvas.parent('fixp5js')
    if (listOfResumeElements.length == 0)
    {
        button = createButton('click me')
        button.position(windowWidth / 2 - 50, 60)
        button.mousePressed(testCode)
        button.style("z-index: 1")
    }
    console.log("making sure it still WORKS")
}
function windowResized()
{
    resizeCanvas(windowWidth*0.9, windowHeight*2);
}
function draw()
{
    // background and page
    background('#DFDFDF')
    fill('#FAFAFA')
    rect(canvasWidth / 2 - 340, 100, 680, 1000)
}
function testCode()
{
    const resumeTitle = new Title();
}   
console.log("end?")*/