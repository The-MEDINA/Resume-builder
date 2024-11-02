// Initial setup.
import('./libraries/p5.js')
let canvasWidth;
let canvasHeight;
function setup()
{
    canvasWidth = windowWidth - 20;
    canvasHeight = windowHeight;
    var canvas = createCanvas(windowWidth/2, windowHeight)
    canvas.parent('fixp5js')
}
function windowResized()
{
    resizeCanvas(windowWidth/2, windowHeight);
}
function draw()
{
    background('#FAFAFA')
}