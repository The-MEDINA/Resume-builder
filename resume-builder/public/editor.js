/// Setup of the editor here.
const app = document.getElementById("app");
const grid = document.createElement("div");
const resume = document.createElement("div");
const addElements = document.createElement("div");
const tweakElements = document.createElement("div");
const spacer = document.createElement("div");
let listOfElements = [];
let ElementEdits = [];

// Adding classes to elements created.
grid.classList.add('editor-grid');
addElements.classList.add('addElements');
resume.classList.add('resume');
tweakElements.classList.add('tweakElements');

// Elements for testing.
const p = document.createElement("p");
const q = document.createElement("p");
const r = document.createElement("p");
p.textContent = "Add elements column";
q.textContent = "Resume column";
r.textContent = "Change elements column";

// Append elements to create the editor.
app?.appendChild(grid);
app?.appendChild(addElements);
grid.appendChild(spacer);    
grid.appendChild(resume);    
grid.appendChild(tweakElements);   
addElements.appendChild(p); 
resume.appendChild(q);
tweakElements.appendChild(r);

// testing button
const testbutton = document.createElement("button");
testbutton.textContent = 'hello there';
testbutton.addEventListener('click', AddAnElement);
addElements.appendChild(testbutton);

// Functions
// Adds elements to the resume.
function AddAnElement()
{
    listOfElements.push(document.createElement("p"));
    ElementEdits.push(document.createElement("div"));
    ElementEdits[ElementEdits.length-1].appendChild(CreateEditButton());
    DrawElements();
}

//  Draws all elements onto the resume.
function DrawElements()
{
    for (let i = 0; i < listOfElements.length; i++)
    {
        listOfElements[i].textContent = ("added element " + (i));
        resume.appendChild(listOfElements[i]);
        tweakElements.appendChild(ElementEdits[i]);
    }
}

// Creates an edit button inside of a <div> 
function CreateEditButton()
{
    const thisButton = document.createElement("button");
    thisButton.textContent = "Edit element " + (ElementEdits.length-1) + " button";
    return thisButton;
}