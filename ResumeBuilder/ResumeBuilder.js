import { ResumeElements, Title } from './libraries/ResumeElements.js'
console.log("crying")
console.log("making sure it's still running")
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
        context.font = "50px Arial";
        context.fillText("Hello World", 10, 80);
        const testing = new ResumeElements();
        const testing2 = new Title("aaa");
    }

    // Runs each time the DOM window resize event fires.
    // Resets the canvas dimensions to match window,
    // then draws the new borders accordingly.
    function resizeCanvas() {
        htmlCanvas.width = window.innerWidth;
        htmlCanvas.height = window.innerHeight;
        redraw();
    }