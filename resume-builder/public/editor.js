import {Test, Setup, DefaultList, DefaultAddresses, SpecifySkills } from "/skillTags.js";
import { ImageSelect } from "/ImageHandler.js";
/// === Setup === Setup === Setup === Setup === Setup === Setup === Setup === Setup === Setup ===
Setup();
const app = document.getElementById("app");
const grid = document.createElement("div");
const resume = document.createElement("div");
const addElements = document.createElement("div");
const tweakElements = document.createElement("div");
const skillTags = document.createElement("div");
const spacer = document.createElement("div");
let listOfElements = [];

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
    listOfElements[listOfElements.length-1].appendChild(AddMovementButtons());
    DrawElements();
}

// Adds an element to the resume.
function AddElement()
{
    listOfElements.push(document.createElement("div"));
    listOfElements[listOfElements.length-1].classList.add('Element');
    listOfElements[listOfElements.length-1].setAttribute("index",[listOfElements.length-1]);
    listOfElements[listOfElements.length-1].appendChild(CreateHeader());
    listOfElements[listOfElements.length-1].appendChild(CreateDate());
    listOfElements[listOfElements.length-1].appendChild(CreateDescription());
    listOfElements[listOfElements.length-1].appendChild(PrepareSkillTag(listOfElements.length-1));
    listOfElements[listOfElements.length-1].appendChild(AddMovementButtons());
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

// Creates the initial blank skill tag that each element comes with.
function PrepareSkillTag(index)
{
    const skillTagDiv = document.createElement("div");
    skillTagDiv.classList.add("skills");
    skillTagDiv.appendChild(CreateSkillTag(skillTagDiv, index));
    return skillTagDiv;
}

// The starter skill tag that every element starts with.
// I... kind of forgot why I moved it to another function.
function CreateSkillTag(skillTagDiv, index)
{
    const skillTag = document.createElement("button");
    skillTag.setAttribute("id","blankSkillTag");
    skillTag.setAttribute("index",index);
    skillTag.addEventListener('mouseover', function() {CloseDropDownMenu(); SkillDropDownMenu(skillTag, null, null, skillTagDiv, skillTag.getAttribute("index"))});
    skillTag.addEventListener('click', function() {CloseDropDownMenu()});
    skillTag.textContent = "Add a skill";
    return skillTag;
}

// this function might be very difficult to implement
function SkillDropDownMenu(skillTag, skillName, tagName, parent, index)
{
    let parentdiv = document.createElement("div");
    parentdiv.classList.add("skillDropDown")
    parentdiv.setAttribute("id","temporary");
    const realList = SpecifySkills(skillName);
    if (realList.length != 0)
    {
        for (let i = 0; i < realList.length; i++)
        {
            let div = document.createElement("div")
            let option = document.createElement("button");
            option.textContent = realList[i];
            option.addEventListener('mouseover', function() {SkillDropDownMenu(option, option.textContent, option.textContent, parent, index)});
            option.addEventListener('click', function() {FinishedSkillTag(option.textContent, parent, index)});
            div.setAttribute("id","temporary");
            div.appendChild(option)
            parentdiv.appendChild(div)
            skillTag.parentNode.appendChild(parentdiv);
        }
    }
}

// Closes the dropdown.
function CloseDropDownMenu()
{
    while (document.querySelector("[class=\"skillDropDown\"]") != null)
    {
        const removeThese = document.querySelector("[class=\"skillDropDown\"]"); 
        removeThese.remove();        
    }
}

// Starts the process to add a proper skill to an element.
function FinishedSkillTag(skillName, parent, index)
{
    while (document.querySelector("[id=\"temporary\"]") != null)
    {
        const removeThese = document.querySelector("[id=\"temporary\"]"); 
        removeThese.remove();        
    }
    document.querySelector("[id=\"blankSkillTag\"][index=\"" + index + "\"]").remove();    
    parent.appendChild(CreateTag(skillName))
    parent.appendChild(CreateSkillTag(parent, index));
}

// Creates the actual skill requested.
function CreateTag(skillName)
{
    const finalSkillDiv = document.createElement("div");
    finalSkillDiv.classList.add("finishedSkill");
    const finalSkill = document.createElement("p");
    finalSkill.addEventListener('click', function() {finalSkillDiv.remove()});
    finalSkill.textContent = skillName;
    const image = ImageSelect(skillName);
    finalSkillDiv.appendChild(image);
    finalSkillDiv.appendChild(finalSkill);
    finalSkill.classList.add("skillText");
    image.classList.add("skillImage");
    return finalSkillDiv
}

// These three functions give an element the ability to be moved around in the list.
function AddMovementButtons()
{
    const buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("buttons");
    const moveUp = document.createElement("button");
    moveUp.textContent = "|^|";
    moveUp.addEventListener('click', function() {MoveElementUp(+this.parentNode.parentNode.getAttribute("index"))});
    const moveDown = document.createElement("button");
    moveDown.textContent = "|v|";
    moveDown.addEventListener('click', function() {MoveElementDown(+this.parentNode.parentNode.getAttribute("index"))});
    buttonsDiv.appendChild(moveUp);
    buttonsDiv.appendChild(moveDown);
    return buttonsDiv;
}
function MoveElementUp(index)
{
    if (index != 0)
    {
        console.log("up OK")
        const hold = listOfElements[index-1];
        listOfElements[index-1] = listOfElements[index];
        listOfElements[index] = hold;
        AdjustElements();
        DrawElements();
    }
}
function MoveElementDown(index)
{
    if (index != listOfElements.length-1)
        {
            console.log("down OK")
            const hold = listOfElements[index+1];
            listOfElements[index+1] = listOfElements[index];
            listOfElements[index] = hold;
            AdjustElements();
            DrawElements();
        }
}
// Deletes something from the resume according to its index attribute.
// So after doing some more javascript coding... It seems that I may or may not have overcomplicated this function.
// I'm not crying, you are.
// After further re-evaluation.. maybe I didn't? It's hard to tell.
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
    scanner.value = element.textContent;
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
            if ((listOfElements[i].children.length == 2 && !listOfElements[i].classList.contains("Title")) || (listOfElements[i].children.length == 1 && listOfElements[i].classList.contains("Title")) ){
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
    const skillTagList = document.querySelectorAll("[id=\"blankSkillTag\"]");
    for (let i = 0; i < skillTagList.length; i++)
    {
        skillTagList[i].setAttribute("index",skillTagList[i].parentNode.parentNode.getAttribute("index"));
    }
}