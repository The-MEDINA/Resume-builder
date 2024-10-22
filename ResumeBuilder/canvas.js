console.log('hello from the console');

const canvas = document.querySelector ('canvas')
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


context.fillRect(100, 100, 100, 100);

