// setting up the canvas (I think)
const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

console.log(canvas.width);
console.log(canvas.height);
//context.fillRect(0, 0, canvas.width, 100);