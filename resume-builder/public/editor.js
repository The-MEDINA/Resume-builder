import {Test, Setup, DefaultList} from "/skillTags.js";
/// === Setup === Setup === Setup === Setup === Setup === Setup === Setup === Setup === Setup ===
Setup();
let listOfSkills = DefaultList();
console.log(listOfSkills);
const app = document.getElementById("app");
const grid = document.createElement("div");
const resume = document.createElement("div");
const addElements = document.createElement("div");
const tweakElements = document.createElement("div");
const skillTags = document.createElement("div");
const spacer = document.createElement("div");
let listOfElements = [];
let ElementEdits = [];

// Adding classes to elements created.
grid.classList.add('editor-grid');
addElements.classList.add('addElements');
resume.classList.add('resume');
skillTags.classList.add('skills');
tweakElements.classList.add('tweakElements');

// Elements for testing.
const p = document.createElement("p");
const q = document.createElement("p");
const r = document.createElement("p");
const s = document.createElement("p");
p.textContent = "Add elements column (Here you select elements to add)";
q.textContent = "Resume column (goal is to click on each element to edit)";
r.textContent = "Change elements column (edit everything about the element on the side)";
s.textContent = "skills column (where the fun part is, the tags :>)";

// Append elements to create the editor.
app?.appendChild(grid);
app?.appendChild(addElements);
grid.appendChild(spacer);    
grid.appendChild(resume);    
grid.appendChild(skillTags);
grid.appendChild(tweakElements);   
addElements.appendChild(p); 
resume.appendChild(q);
tweakElements.appendChild(r);
skillTags.appendChild(s);

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
    listOfElements[listOfElements.length-1].setAttribute("index",[listOfElements.length-1]);
    DrawElements();
}

// Adds an element to the resume.
function AddElement()
{
    listOfElements.push(document.createElement("div"));
    listOfElements[listOfElements.length-1].classList.add('Element');
    listOfElements[listOfElements.length-1].appendChild(CreateHeader());
    listOfElements[listOfElements.length-1].appendChild(CreateDate());
    listOfElements[listOfElements.length-1].appendChild(CreateDescription());
    listOfElements[listOfElements.length-1].appendChild(CreateSkillTag());
    listOfElements[listOfElements.length-1].setAttribute("index",[listOfElements.length-1]);
    DrawElements();
}

//  Draws all elements onto the resume.
function DrawElements()
{
    for (let i = 0; i < listOfElements.length; i++)
    {
        resume.appendChild(listOfElements[i]);
    }
}

// Creates an edit button inside of a <div> 
function CreateEditButton(_index)
{
    const thisButton = document.createElement("button");
    if (listOfElements[_index].classList.contains("Title"))
    {
        thisButton.textContent = "Edit title " + (_index) + " button";
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
    const titleDiv = document.createElement("div");
    const thisTitle = document.createElement("button");
    thisTitle.setAttribute("id","title");
    thisTitle.addEventListener('click', function() {ChangeText(thisTitle)});
    thisTitle.textContent = ("Title");
    titleDiv.appendChild(thisTitle);
    return titleDiv;
}
// Creates a basic elementHeader with a <button> element inside of a <div> 
function CreateHeader()
{
    const elementHeaderDiv = document.createElement("div");
    const elementHeader = document.createElement("button");
    elementHeader.setAttribute("id","elementHeader");
    elementHeader.addEventListener('click', function() {ChangeText(elementHeader)});
    elementHeader.textContent = "Job title - location";
    elementHeaderDiv.appendChild(elementHeader);
    return elementHeaderDiv;
}

// Creates a basic date with a <button> element inside of a <div> 
function CreateDate()
{
    const elementDateDiv = document.createElement("div");
    const elementDate = document.createElement("button");
    elementDate.setAttribute("id","elementDate");
    elementDate.addEventListener('click', function() {ChangeText(elementDate)});
    elementDate.textContent = "DateStart - DateEnd";
    elementDateDiv.appendChild(elementDate);
    return elementDateDiv;
}

// Creates a basic date with a <button> element inside of a <div> 
function CreateDescription()
{
    const createDescDiv = document.createElement("div");
    const elementDesc = document.createElement("button");
    elementDesc.setAttribute("id","elementDesc");
    elementDesc.addEventListener('click', function() {ChangeText(elementDesc)});
    elementDesc.textContent = "Description of something";
    createDescDiv.appendChild(elementDesc);
    return createDescDiv;
}

// creates a skillTag with a <button> element inside of a <div>
function CreateSkillTag()
{
    const skillTagDiv = document.createElement("div");
    const skillTag = document.createElement("button");
    skillTag.setAttribute("id","blankSkillTag");
    skillTag.addEventListener('click', function() {SkillDropDownMenu(skillTag)});
    skillTag.textContent = "Add a skill";
    skillTagDiv.appendChild(skillTag);
    return skillTagDiv;
}

// Deletes something from the resume according to its index attribute.
// So after doing some more javascript coding... It seems that I may or may not have overcomplicated this function.
// I'm not crying, you are.
function DeleteSomething(_index)
{
    while (document.querySelector("[index=\"" + _index + "\"]") != null)
    {
        const removeThese = document.querySelector("[index=\"" + _index + "\"]"); 
        removeThese.remove();        
    }
    listOfElements.splice(_index,1);   
    AdjustElements();
    DrawElements();
}

// Adds an input field to take user input from, and changes the element that called it.
// attach an event listener with this function to a resume element and it should be editable. (in theory)
function ChangeText(element)
{
    while (document.querySelector("[id=\"temporary\"]") != null)
        {
            const removeThese = document.querySelector("[id=\"temporary\"]"); 
            removeThese.remove();        
        }
    const scannerDiv = document.createElement("div");
    scannerDiv.setAttribute("id","temporary");
    const scanner = document.createElement("input");
    scanner.classList.add("scanner");
    scannerDiv.appendChild(scanner);
    element.parentNode.appendChild(scannerDiv);
    scanner.addEventListener('keypress', function (event) {if (event.key == "Enter") FinishChangeText(scannerDiv, element, scanner.value)});
}

// Goes with ChangeText. Finishes up changing text.
function FinishChangeText(scannerDivToRemove, elementToChange, valueToChangeWith)
{
    if (valueToChangeWith == null || valueToChangeWith == "")
    {
        elementToChange.parentNode.remove();
        // this is such a bad fix... but it *does* work. The plan is to rewrite this for loop so that this isn't so nasty.
        for (let i = 0; i < listOfElements.length; i++){
            if (listOfElements[i].children.length == 0){
                DeleteSomething(i);
                i -= 1;
            }
        }
    }
    scannerDivToRemove.remove();
    elementToChange.textContent = valueToChangeWith;  
}

// Adjusts the indeces and messes with the buttons to prevent any bugs and wacky situations.
function AdjustElements()
{
    for (let i = 0; i < listOfElements.length; i++)
    {
        listOfElements[i].setAttribute("index",i);
    }
}

// this function might be very difficult to implement
function SkillDropDownMenu(skillTag)
{
    if (skillTag.children.length != 0)
    {
        while (document.querySelector("[class=\"skillDropDown\"]") != null)
            {
                const removeThese = document.querySelector("[class=\"skillDropDown\"]"); 
                removeThese.remove();        
            }
    }
    else
    {
        let parentdiv = document.createElement("div");
        parentdiv.setAttribute("id","temporary");
        for (let i = 0; i < listOfSkills.length; i++)
        {
            let div = document.createElement("div")
            let option = document.createElement("button");
            div.setAttribute("id","temporary");
            parentdiv.classList.add("skillDropDown")
            option.textContent = listOfSkills[i][0];
            div.appendChild(option)
            parentdiv.appendChild(div)
            skillTag.appendChild(parentdiv);
        }
    }
}
function CloseDropDownMenu(skillTag)
{
    while (document.querySelector("[id=\"temporary\"]") != null)
        {
            const removeThese = document.querySelector("[id=\"temporary\"]"); 
            removeThese.remove();        
        }
}

// So... I'm.. not sure, how to approach the skill tags now.
// I want them to be editable by the user, so I have to save them somewhere.
// It's best to move that to another script that saves, loads, and defaults how the tags are set up.
// I also do want another page that's purely a skill tag editor, that the resume editor can see the changes from.
// I also need the blank skill tag to make a dropdown menu when it's clicked. Then, you select the skill.
// I also want the skill tags themselves to be somewhat stylized with an image and text inside a button.
// This sounds... scary now.
// oh also the skill tags should be in like a list of lists, going from most general skill to specific
// (Ex: Programming list -> Languages list -> JS or something like that)
// It sounds like I need a cookie to save something for now.
// Later on, if I manage to figure out CSH account integration, I could probably save there.

// so... get skilltags working
// get blank skilltags to pull from working skilltags (or something)
// make dropdowns work
// ???
// proper skilltag

// oh yeah skilltags also need to pull an image then (f*ck)

// This sounds like a good idea to add saving and loading to the resume
// oh god I might have to learn how to make and use JSON or something AAA