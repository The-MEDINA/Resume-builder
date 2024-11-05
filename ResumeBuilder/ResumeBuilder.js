import('./libraries/p5.js')
import('./libraries/ResumeElements.js')
function setup()
{
    canvasWidth = windowWidth * 0.9;
    canvasHeight = windowHeight;
    var canvas = createCanvas(windowWidth * 0.9, windowHeight*2)
    canvas.parent('fixp5js')
    button = createButton('click me')
    button.position(windowWidth/2 -50, 60)
    button.mousePressed(testCode)  
    button.style("z-index: 1")
}
/*function windowResized()
{
    resizeCanvas(windowWidth/2, windowHeight);
}*/
function draw()
{
    background('#DFDFDF')
    fill('#FAFAFA')
    rect(300, 100, 750, windowHeight)
}
function testCode()
{
    alert('pls work')
}