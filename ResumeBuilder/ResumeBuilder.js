import('./libraries/p5.js')
// setting up the canvas (I think)
function setup()
{
    var canvas = createCanvas(windowWidth-20, windowHeight)
    canvas.parent('fixp5js')
}
function draw()
{
    background('#FAFAFA')
}
//console.log(canvas.width);
//console.log(canvas.height);
//context.fillRect(0, 0, canvas.width, 100);