/// === Setup === Setup === Setup === Setup === Setup === Setup === Setup === Setup === Setup ===
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

// Add title button
const addTitleButton = document.createElement("button");
addTitleButton.textContent = '|Add a title|';
addTitleButton.addEventListener('click', AddTitle);
addElements.appendChild(addTitleButton);

// Add element button
const addElementButton = document.createElement("button");
addElementButton.textContent = '|Add an element|';
addElementButton.addEventListener('click', AddElement);
addElements.appendChild(addElementButton);

// === Functions === Functions === Functions === Functions === Functions === Functions === Functions === Functions ===
// Adds a title to the resume.
function AddTitle()
{
    listOfElements.push(document.createElement("div"));
    listOfElements[listOfElements.length-1].classList.add('Title');
    listOfElements[listOfElements.length-1].appendChild(CreateTitle());
    listOfElements[listOfElements.length-1].setAttribute("index",[ElementEdits.length]);
    ElementEdits.push(document.createElement("div"));
    ElementEdits[ElementEdits.length-1].appendChild(CreateEditButton(ElementEdits.length-1));
    ElementEdits[ElementEdits.length-1].setAttribute("index",[ElementEdits.length-1]);
    DrawElements();
}

// Adds an element to the resume.
function AddElement()
{
    listOfElements.push(document.createElement("div"));
    listOfElements[listOfElements.length-1].classList.add('Element');
    listOfElements[listOfElements.length-1].appendChild(CreateElement());
    listOfElements[listOfElements.length-1].setAttribute("index",[ElementEdits.length]);
    ElementEdits.push(document.createElement("div"));
    ElementEdits[ElementEdits.length-1].appendChild(CreateEditButton(ElementEdits.length-1));
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
function CreateEditButton(_index)
{
    const thisButton = document.createElement("button");
    if (listOfElements[_index].classList.contains("Title"))
    {
        thisButton.textContent = "Edit title " + (_index) + " button";
        ElementEdits[_index].setAttribute("index",[_index]);
        thisButton.addEventListener('click', function() {TitleDropDownMenu(thisButton.parentElement.getAttribute("index"))});
    }
    else
    {
        thisButton.textContent = "Edit element " + (_index) + " button";
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
    while (ElementEdits[intIndex].firstChild) 
    {
        ElementEdits[intIndex].removeChild(ElementEdits[intIndex].lastChild);
    }
    // Delete Button.
    const deleteButton = document.createElement("button");
    deleteButton.textContent = '|Delete Title ' + intIndex + '|';
    deleteButton.addEventListener('click', function() {DeleteSomething(intIndex)});
    ElementEdits[intIndex].appendChild(deleteButton);
    // Update text Button.
    const TextButton = document.createElement("button");
    TextButton.textContent = '|Title text @ ' + intIndex + '|';
    TextButton.addEventListener('click', function() {ChangeTitleText(intIndex)});
    ElementEdits[intIndex].appendChild(TextButton);
    // Back Button.
    const backButton = document.createElement("button");
    backButton.textContent = '|Back|';
    backButton.addEventListener('click', function() {AdjustElements(intIndex)});
    ElementEdits[intIndex].appendChild(backButton);
}

// Deletes something from the resume according to its index attribute.
function DeleteSomething(_index)
{
    while (document.querySelector("[index=\"" + _index + "\"]") != null)
    {
        const removeThese = document.querySelector("[index=\"" + _index + "\"]"); 
        removeThese.remove();        
    }
    listOfElements.splice(_index,1);   
    ElementEdits.splice(_index,1);    
    AdjustElements();
    DrawElements();
}

// Changes the text of a title.
function ChangeTitleText(_index)
{
    let text = prompt("Update the Title text:");
    for (let i = 0; i < listOfElements[_index].childNodes.length; i++)
    {
        if (listOfElements[_index].children[i].id == "title")
        {
            listOfElements[_index].children[i].textContent = text;
        }
    }
    AdjustElements();
    DrawElements();
}

// Adjusts the indeces and messes with the buttons to prevent any bugs and wacky situations.
function AdjustElements()
{
    for (let i = 0; i < ElementEdits.length; i++)
    {
        listOfElements[i].setAttribute("index",i);
        ElementEdits[i].setAttribute("index",i);   
    }
    for (let i = 0; i < ElementEdits.length; i++)
        {
            while (ElementEdits[i].firstChild) 
            {
                ElementEdits[i].removeChild(ElementEdits[i].lastChild);
            }
            ElementEdits[i].appendChild(CreateEditButton(i));
        }
}