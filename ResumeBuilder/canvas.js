import('./p5.js')
// setting up the canvas (I think)
function setup()
{
    var canvas = createCanvas(400, 400)
    canvas.parent('fixp5js')
}
function draw()
{
    strokeWeight(3)
    fill('#FF0000')
    rect(0, 0, 100, 100)
}
//console.log(canvas.width);
//console.log(canvas.height);
//context.fillRect(0, 0, canvas.width, 100);