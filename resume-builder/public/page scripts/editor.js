import {Setup, SpecifySkills, SpecifySkillAddress } from "/skillTags.js";
import { ImageSetup } from "/ImageHandler.js";

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
let listOfSkills = [];
DecodeResumeCookies();

// Save button.
const topNav = document.getElementsByClassName("topnav");
const saveButton = document.createElement("button");
saveButton.textContent = "|Save in browser|"
saveButton.addEventListener('click', function() {EncodeResumeCookies()});
topNav[0].appendChild(saveButton);

// Adding classes to elements created.
grid.classList.add('editor-grid');
addElements.classList.add('addElements');
resume.classList.add('resume');
skillTags.classList.add('skillSideColumn');
tweakElements.classList.add('tweakElements');

// Append elements to create the editor.
app?.appendChild(grid);
app?.appendChild(addElements);
grid.appendChild(spacer);    
grid.appendChild(resume);    
grid.appendChild(skillTags);
grid.appendChild(tweakElements);   

// Add title button
const addTitleButton = document.createElement("button");
addTitleButton.textContent = '|Add a title|';
addTitleButton.addEventListener('click', function() {AddTitle("Add a Title")});
addElements.appendChild(addTitleButton);

// Add element button
const addElementButton = document.createElement("button");
addElementButton.textContent = '|Add an element|';
addElementButton.addEventListener('click', function() {AddElement("Job title - location","DateStart - DateEnd","Description of something")});
addElements.appendChild(addElementButton);

// Add divider button
const addDividerButton = document.createElement("button");
addDividerButton.textContent = '|Add a divider|';
addDividerButton.addEventListener('click', function() {AddDivider("Divide the resume")});
addElements.appendChild(addDividerButton);

// === Functions === Functions === Functions === Functions === Functions === Functions === Functions === Functions ===
// Adds a title to the resume.
function AddTitle(titleString)
{
    listOfElements.push(document.createElement("div"));
    listOfElements[listOfElements.length-1].classList.add('Title');
    listOfElements[listOfElements.length-1].appendChild(CreateTitle(titleString));
    listOfElements[listOfElements.length-1].setAttribute("index",[listOfElements.length-1]);
    listOfElements[listOfElements.length-1].appendChild(AddMovementButtons());
    DrawElements();
}

// Adds an element to the resume.
function AddElement(headerText, dateText, descText)
{
    listOfElements.push(document.createElement("div"));
    listOfElements[listOfElements.length-1].classList.add('Element');
    listOfElements[listOfElements.length-1].setAttribute("index",[listOfElements.length-1]);
    if (headerText != "") {listOfElements[listOfElements.length-1].appendChild(CreateHeader(headerText))};
    if (dateText != "") {listOfElements[listOfElements.length-1].appendChild(CreateDate(dateText))};
    if (descText != "") {listOfElements[listOfElements.length-1].appendChild(CreateDescription(descText))};
    listOfElements[listOfElements.length-1].appendChild(PrepareSkillTag(listOfElements.length-1));
    listOfElements[listOfElements.length-1].appendChild(AddMovementButtons());
    DrawElements();
}

// Adds a divider to the resume.
function AddDivider(dividerText)
{
    //console.log("divider OK");
    listOfElements.push(document.createElement("div"));
    listOfElements[listOfElements.length-1].classList.add('Divider');
    listOfElements[listOfElements.length-1].appendChild(CreateDivider(dividerText));
    listOfElements[listOfElements.length-1].setAttribute("index",[listOfElements.length-1]);
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
function CreateTitle(titleString)
{
    const titleDiv = document.createElement("div");
    titleDiv.classList.add("TitleDiv");
    const thisTitle = document.createElement("button");
    thisTitle.setAttribute("id","title");
    thisTitle.addEventListener('click', function() {ChangeText(thisTitle)});
    thisTitle.textContent = titleString;
    titleDiv.appendChild(thisTitle);
    return titleDiv;
}
// Creates a basic elementHeader with a <button> element inside of a <div> 
function CreateHeader(headerText)
{
    const elementHeaderDiv = document.createElement("div");
    elementHeaderDiv.classList.add("HeaderDiv");
    const elementHeader = document.createElement("button");
    elementHeader.setAttribute("id","elementHeader");
    elementHeader.addEventListener('click', function() {ChangeText(elementHeader)});
    elementHeader.textContent = headerText;
    elementHeaderDiv.appendChild(elementHeader);
    return elementHeaderDiv;
}

// Creates a basic date with a <button> element inside of a <div> 
function CreateDate(dateText)
{
    const elementDateDiv = document.createElement("div");
    elementDateDiv.classList.add("DateDiv");
    const elementDate = document.createElement("button");
    elementDate.setAttribute("id","elementDate");
    elementDate.addEventListener('click', function() {ChangeText(elementDate)});
    elementDate.textContent = dateText;
    elementDateDiv.appendChild(elementDate);
    return elementDateDiv;
}

// Creates a basic date with a <button> element inside of a <div> 
function CreateDescription(descText)
{
    const createDescDiv = document.createElement("div");
    createDescDiv.classList.add("DescDiv");
    const elementDesc = document.createElement("button");
    elementDesc.setAttribute("id","elementDesc");
    elementDesc.addEventListener('click', function() {ChangeText(elementDesc)});
    elementDesc.textContent = descText;
    createDescDiv.appendChild(elementDesc);
    return createDescDiv;
}

// Creates a divider with an <a> element inside of a <div>
function CreateDivider(dividerTextContent)
{
    const createDividerDiv = document.createElement("div");
    createDividerDiv.classList.add("DividerDiv");
    const dividerText = document.createElement("a");
    dividerText.setAttribute("id","divider");
    dividerText.addEventListener('click', function() {ChangeText(dividerText)});
    dividerText.textContent = dividerTextContent;
    createDividerDiv.appendChild(dividerText);
    return createDividerDiv;
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

// Creates a dropdown menu for blank skill tags. 
function SkillDropDownMenu(skillTag, skillName, tagName, parent, index)
{
    let parentdiv = document.createElement("div");
    parentdiv.classList.add("skillDropDown");
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

// Closes dropdowns.
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
    if (document.querySelector("[id=\"blankSkillTag\"][index=\"" + index + "\"]") != null) {document.querySelector("[id=\"blankSkillTag\"][index=\"" + index + "\"]").remove()};    
    parent.appendChild(CreateTag(skillName))
    parent.appendChild(CreateSkillTag(parent, index));
    AddToSkillColumn(skillName);
}

// Creates the actual skill requested.
function CreateTag(skillName)
{
    if (skillName != "")
    {
        const finalSkillDiv = document.createElement("div");
        finalSkillDiv.classList.add("finishedSkill");
        const finalSkill = document.createElement("p");
        finalSkill.addEventListener('click', function() {finalSkillDiv.remove(); AdjustSkillColumn()});
        finalSkill.textContent = skillName;
        const image = document.createElement("img")
        ImageSetup(image, skillName);
        finalSkillDiv.appendChild(image);
        finalSkillDiv.appendChild(finalSkill);
        finalSkill.classList.add("skillText");
        image.classList.add("skillImage");
        return finalSkillDiv
    }
}

// adds a skill to the skill column if it's not already there. Also lets you choose to hide the skills.
function AddToSkillColumn(skillName)
{
    const totalSkills = SpecifySkillAddress(skillName);
    for (let j = 0; j < totalSkills.length; j++)
    {
        let skillFound = false;
        for (let i = 0; i < listOfSkills.length; i++)
            {
                if (listOfSkills[i].lastChild.textContent == totalSkills[j])
                {
                    skillFound = true;
                }
            }
            if (skillFound == false)
            {
                const skillDiv = document.createElement("div");
                skillDiv.setAttribute("id","showSkill");
                skillDiv.classList.add("skillColumn");
                const skillText = document.createElement("p");
                skillText.textContent = totalSkills[j];
                const skillImg = document.createElement("img")
                ImageSetup(skillImg, totalSkills[j]);
                skillDiv.appendChild(skillImg);
                skillDiv.appendChild(skillText);
                skillText.classList.add("skillText");
                skillImg.classList.add("skillImage");
                skillText.addEventListener('mouseover', function() {SkillColumnDropDownMenu(skillDiv)});
                skillText.addEventListener('click', function() {CloseDropDownMenu()});
                listOfSkills.push(skillDiv);
                skillTags.append(skillDiv);
            }
    }
}

// Dropdown menu for the skills column. allows you to change whether a skill will be visible or hidden on the resume.
function SkillColumnDropDownMenu(parent)
{
    CloseDropDownMenu();
    const dropDownDiv = document.createElement("div");
    dropDownDiv.classList.add("skillDropDown");
    dropDownDiv.setAttribute("id","temporary");
    const status = document.createElement("p");
    const toggle = document.createElement("button");
    toggle.textContent = "toggle"
    if (parent.getAttribute("id") == "showSkill")
    {
        status.textContent = "Status: shown"
    }
    else
    {
        status.textContent = "Status: hidden"
    }
    toggle.addEventListener('click', function() {ToggleSkillVisibility(parent)});
    dropDownDiv.appendChild(status);
    dropDownDiv.appendChild(toggle);
    parent.appendChild(dropDownDiv);
}

function ToggleSkillVisibility(parent)
{
    if (parent.getAttribute("id") == "showSkill")
    {
        parent.setAttribute("id","hideSkill");
    }
    else
    {
        parent.setAttribute("id","showSkill");
    }
    CloseDropDownMenu();
}

// I feel like this function is ridiculously overcomplicated...
function AdjustSkillColumn()
{
    const skillsToAdjust = document.querySelectorAll("[class=\"finishedSkill\"]");
    let remainingSkills = [];
    for (let i = 0; i < skillsToAdjust.length; i++)
    {
        if (!remainingSkills.includes(skillsToAdjust[i].lastChild.textContent))
        {
            let skillsToRemember = SpecifySkillAddress(skillsToAdjust[i].lastChild.textContent)
            for (let j = 0; j < skillsToRemember.length; j++)
            {
                remainingSkills.push(skillsToRemember[j]);
            }
        }
    } 
    const skillColumn = document.querySelectorAll("[class=\"skillColumn\"]");
    for (let i = 0; i < skillColumn.length; i++)
    {
        if (!remainingSkills.includes(skillColumn[i].lastChild.textContent))
        {
            skillColumn[i].remove();
            listOfSkills.splice(i, 1, "remove");
        }
    }
    for (let i = 0; i < listOfSkills.length; i++)
    {
        if (listOfSkills[i] == "remove")
        {
            listOfSkills.splice(i, 1);
            i--;
        }
    }
    //console.log(listOfSkills);
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
        //console.log("up OK")
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
            //console.log("down OK")
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
    AdjustSkillColumn();
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
            if ((listOfElements[i].children.length == 2 && !(listOfElements[i].classList.contains("Title") || listOfElements[i].classList.contains("Divider"))) || (listOfElements[i].children.length == 1 && (listOfElements[i].classList.contains("Title") || listOfElements[i].classList.contains("Divider")))){
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

// Separates and saves the resume in a bunch of cookies. 
// For whatever reason, JSON methods aren't working... so I gotta do this manually.
function EncodeResumeCookies()
{
    DeleteResumeCookies();
    const d = new Date();
    d.setTime(d.getTime() *1.01);
    let expires = "expires="+ d.toUTCString();
    
    // Resume Elements are checked here.
    for (let i = 0; i < listOfElements.length; i++)
    {
        let totalElementValue = "";
        // Titles are checked here.
        if (listOfElements[i].classList.contains("Title"))
        {
            let childElements = listOfElements[i].children;
            for (let k = 0; k < childElements.length; k++)
            {
                // Titles and TitleDivs are searched for and found here.
                if (childElements[k].classList.contains("TitleDiv"))
                {
                    totalElementValue += "TitleDivඞ" + childElements[k].firstChild.textContent;
                }
            }
            document.cookie = "Index" + i + "=Title`" + totalElementValue + ";" + expires;
        }

        // Dividers are checked here.
        if (listOfElements[i].classList.contains("Divider"))
        {
            totalElementValue += "DividerDivඞ" + listOfElements[i].firstChild.firstChild.textContent;
            document.cookie = "Index" + i + "=Divider`" + totalElementValue + ";" + expires;
        }

        // Elements are checked here.
        if (listOfElements[i].classList.contains("Element"))
            {
                let childElements = listOfElements[i].children;
                for (let k = 0; k < childElements.length; k++)
                {
                    // Headers are checked here.
                    if (childElements[k].classList.contains("HeaderDiv"))
                    {
                        totalElementValue += "HeaderDivඞ" + childElements[k].firstChild.textContent + "`";
                    }
                    // Dates are checked here.
                    if (childElements[k].classList.contains("DateDiv"))
                    {
                        totalElementValue += "DateDivඞ" + childElements[k].firstChild.textContent + "`";
                    }
                    // Dates are checked here.
                    if (childElements[k].classList.contains("DescDiv"))
                    {
                        totalElementValue += "DescDivඞ" + childElements[k].firstChild.textContent + "`";
                    }
                    if (childElements[k].classList.contains("skills"))
                    {  
                        const listOfElementSkills = childElements[k].children;
                        let skillsInString = "";
                        for (let j = 0; j < listOfElementSkills.length; j++)
                        {
                            if (listOfElementSkills[j].classList.contains("finishedSkill"))
                            {
                                skillsInString += listOfElementSkills[j].lastChild.textContent + "/"
                            }
                        }
                        skillsInString = skillsInString.substring(0, skillsInString.length-1);
                        totalElementValue += "skillsඞ" + skillsInString;
                    }
                }
                document.cookie = "Index" + i + "=Element`" + totalElementValue + ";" + expires;
            }
    }
    // Skills are checked here.
    for (let i = 0; i < listOfSkills.length; i++)
    {
        if (listOfSkills[i].getAttribute("id") == "showSkill")
        {
            document.cookie = "SklIdx" + i + "=" + listOfSkills[i].lastChild.textContent + ";" + expires;
        }
    }
    //document.cookie = "SkillTags=" + EncodeSkillTagsCookie() + "; " + expires;
}

// Constructs a saved resume through any cookies found.
function DecodeResumeCookies()
{
    const listOfCookies = decodeURIComponent(document.cookie).split(";");
    let savedSkills = [];
    // sets the resume elements.
    for (let i = 0; i < listOfCookies.length; i++)
    {
        if (listOfCookies[i].indexOf("Index") == 0 || listOfCookies[i].indexOf("Index") == 1)
        {
            let rawCookie = listOfCookies[i].split("="); 
            let intIndex = +(rawCookie[0].substring(rawCookie[0].indexOf("Index")+5));
            let rawData = rawCookie[1].split("`");

            // Decoding titles here.
            if (rawData[0] == "Title")
            {
                let titleData = rawData[1].split("ඞ");
                let titleContent = titleData[1];
                AddTitle(titleContent);
            }

            // Decoding dividers here.
            if (rawData[0] == "Divider")
            {
                let dividerData = rawData[1].split("ඞ");
                let dividerContent = dividerData[1];
                AddDivider(dividerContent);
            }

            // Decoding elements here (uh oh)
            if (rawData[0] == "Element")
            {
                let headerText = "";
                let dateText = "";
                let descText = "";
                let elementSkills = [];
                for (let j = 1; j < rawData.length; j++)
                {
                    let elementData = rawData[j].split("ඞ");
                    if (elementData[0] == "HeaderDiv")
                    {
                        headerText = elementData[1];
                    }
                    if (elementData[0] == "DateDiv")
                    {
                        dateText = elementData[1];
                    }
                    if (elementData[0] == "DescDiv")
                    {
                        descText = elementData[1];
                    }
                    if (elementData[0] == "skills")
                    {
                        if (elementData[1] != "")
                        {
                            elementSkills = elementData[1].split("/");
                        }
                    }
                }
                AddElement(headerText, dateText, descText);
                for (let j = 0; j < elementSkills.length; j++)
                {
                    //FinishedSkillTag(elementSkills[j], listOfElements[intIndex].lastChild.previousElementSibling, intIndex);
                    listOfElements[intIndex].lastChild.previousElementSibling.insertBefore(CreateTag(elementSkills[j]),listOfElements[intIndex].lastChild.previousElementSibling.firstChild);
                    AddToSkillColumn(elementSkills[j]);
                }
            }
        }
        // Sets the skill column.
        if (listOfCookies[i].indexOf("SklIdx") == 0 || listOfCookies[i].indexOf("SklIdx") == 1)
        {
            let skillData = listOfCookies[i].split("=");
            savedSkills.push(skillData[1]);
        }
    }
    for (let i = 0; i < listOfSkills.length; i++)
    {
        if (!savedSkills.includes(listOfSkills[i].lastChild.textContent))
        {
            listOfSkills[i].setAttribute("id","hideSkill");
        }
    }
}

// Deletes any resume cookies.
function DeleteResumeCookies()
{
    const listOfCookies = decodeURIComponent(document.cookie).split(";");
    for (let i = 0; i < listOfCookies.length; i++)
    {
        if (listOfCookies[i].indexOf("Index") == 0 || listOfCookies[i].indexOf("Index") == 1)
        {
            let intermediate = listOfCookies[i].split("=");
            document.cookie = intermediate[0] + "=; expires=Thu, 18 Dec 2013 12:00:00 UTC";
        }
        if (listOfCookies[i].indexOf("SklIdx") == 0 || listOfCookies[i].indexOf("SklIdx") == 1)
        {
            let intermediate = listOfCookies[i].split("=");
            document.cookie = intermediate[0] + "=; expires=Thu, 18 Dec 2013 12:00:00 UTC";
        }
    }
}
/* TODO:
    make a display page that removes all the editor-specific tools
    make a help page
    and then... it'll finally be finished. (for now)
    There's still far away in the future stuff like CSH integration, but once I finish the help page, I'll make my repo public.
*/