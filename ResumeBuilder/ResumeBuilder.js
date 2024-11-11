import { ResumeElements, Title } from './libraries/ResumeElements.js'
//uncomment this console.log if things don't seem to be updating.
//console.log("crying")
    // Obtain a reference to the canvas element using its id.
    // Obtain a graphics context on the canvas element for drawing.
    var htmlCanvas = document.getElementById('theCanvas'), context = htmlCanvas.getContext('2d');
    const theResume = [];
    theResume[0] = new Title("this is the title");
    
    // Start listening to resize events and draw canvas.
    initialize();
    
    function initialize() {
        // Register an event listener to call the resizeCanvas() function 
        // each time the window is resized.
        window.addEventListener('resize', resizeCanvas, false);
        // Draw canvas border for the first time.
        resizeCanvas();
    }

    // Display custom canvas.
    function redraw() {
        context.strokeStyle = 'blue';
        context.lineWidth = '5';
        context.strokeRect(0, 0, window.innerWidth, window.innerHeight);
        context.font = "50px Arial";
        for (let i = 0; i < theResume.length; i++) // oh my god I have javascript for loop
        {
            context.fillText(theResume[i].Print(), 0, 80);
        }
    }

    // Runs each time the DOM window resize event fires.
    // Resets the canvas dimensions to match window,
    // then draws the new borders accordingly.
    function resizeCanvas() {
        htmlCanvas.width = window.innerWidth;
        htmlCanvas.height = window.innerHeight;
        redraw();
    }