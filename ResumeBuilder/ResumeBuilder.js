import { Title } from './libraries/ResumeElements.js'
console.log("crying")
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
/*class Title
{
    constructor(name)
    {
        console.log("title made")
    }
}*/
console.log("end?")