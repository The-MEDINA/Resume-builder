import { Title } from './libraries/ResumeElements.js'
import('./libraries/p5.js')
function setup()
{
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
    console.log("pls")
    console.log("making sure it still WORKS")
}
/*function windowResized()
{
    resizeCanvas(windowWidth*0.9, windowHeight*2);
}*/
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
/*class Title
{
    constructor(name)
    {
        console.log("title made")
    }
}*/