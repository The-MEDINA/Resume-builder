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
const addTitleButton = document.createElement("button");
addTitleButton.textContent = '|Add a title|';
addTitleButton.addEventListener('click', AddTitle);
addElements.appendChild(addTitleButton);

// testing button2
const addElementButton = document.createElement("button");
addElementButton.textContent = '|Add an element|';
addElementButton.addEventListener('click', AddElement);
addElements.appendChild(addElementButton);

// Functions
// Adds a title to the resume.
function AddTitle()
{
    listOfElements.push(document.createElement("div"));
    listOfElements[listOfElements.length-1].classList.add('Title');
    listOfElements[listOfElements.length-1].appendChild(CreateTitle());
    ElementEdits.push(document.createElement("div"));
    ElementEdits[ElementEdits.length-1].appendChild(CreateEditButton());
    ElementEdits[ElementEdits.length-1].setAttribute("index",[ElementEdits.length-1]);
    DrawElements();
}

// Adds an element to the resume.
function AddElement()
{
    listOfElements.push(document.createElement("div"));
    listOfElements[listOfElements.length-1].classList.add('Element');
    listOfElements[listOfElements.length-1].appendChild(CreateElement());
    ElementEdits.push(document.createElement("div"));
    ElementEdits[ElementEdits.length-1].appendChild(CreateEditButton());
    ElementEdits[ElementEdits.length-1].setAttribute("index",[ElementEdits.length-1]);
    DrawElements();
}

//  Draws all elements onto the resume.
function DrawElements()
{
    for (let i = 0; i < listOfElements.length; i++)
    {
        resume.appendChild(listOfElements[i]);
        tweakElements.appendChild(ElementEdits[i]);
    }
}

// Creates an edit button inside of a <div> 
function CreateEditButton()
{
    const thisButton = document.createElement("button");
    if (listOfElements[listOfElements.length-1].classList.contains("Title"))
    {
        thisButton.textContent = "Edit title " + (ElementEdits.length-1) + " button";
        ElementEdits[ElementEdits.length-1].setAttribute("index",[ElementEdits.length-1]);
        thisButton.addEventListener('click', function() {TitleDropDownMenu(thisButton.parentElement.getAttribute("index"))});
    }
    else
    {
        thisButton.textContent = "Edit element " + (ElementEdits.length-1) + " button";
    }
    return thisButton;
}

// Creates the title with a <p> element inside of a <div> 
function CreateTitle()
{
    const thisTitle = document.createElement("p");
    thisTitle.setAttribute("id","title");
    thisTitle.textContent = "Title " + (ElementEdits.length);
    return thisTitle;
}
// Creates a basic element with a <p> element inside of a <div> 
function CreateElement()
{
    const thisElement = document.createElement("p");
    thisElement.textContent = "Element " + (ElementEdits.length);
    return thisElement;
}

// adds the dropdown menu for title edit buttons.
function TitleDropDownMenu(elementIndex)
{
    let intIndex = +elementIndex; // oh my god... this... this is NASTY
    alert("ok " + intIndex);
    while (ElementEdits[intIndex].firstChild) {
        ElementEdits[intIndex].removeChild(ElementEdits[intIndex].lastChild);
      }
    const deleteButton = document.createElement("button");
    deleteButton.textContent = 'Delete Title ' + intIndex;
    //addElementButton.addEventListener('click', AddElement);
    ElementEdits[intIndex].appendChild(deleteButton);
}

/// TODO:
// make delete button call a function
// the function should delete an element from both listOfElements and ElementEdits (I think?)
// then either the function or another function should adjust attribute index
// plus fix any other issues that might arise