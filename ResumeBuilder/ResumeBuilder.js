// Initial setup.
import('./libraries/p5.js')
let canvasWidth;
let canvasHeight;
let button;
function setup()
{
    canvasWidth = windowWidth/2;
    canvasHeight = windowHeight;
    var canvas = createCanvas(windowWidth / 2, windowHeight)
    button = createButton('click me')
    canvas.parent('fixp5js')
    button.position(windowWidth/2 -50, 200+10)
    button.mousePressed(testCode)  
}
/*function windowResized()
{
    resizeCanvas(windowWidth/2, windowHeight);
}*/
function draw()
{
    background('#FAFAFA')
}
function testCode()
{
    alert('pls work')
}