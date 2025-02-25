'use client'
import { ArrayToSkillType, Skill } from "@/app/Skills/page";
import { GetSavedSkillList, GetAddressFromSkillName, SetParentSkill } from "../../../public/HelperScripts/skillTags";
import { ImageSetupFromRawAddress } from "../../../public/HelperScripts/ImageHandler";
import Link from "next/link";
let resume: any = [];
let listOfSkills: Skill[] = ArrayToSkillType(GetSavedSkillList());
let lockEditing: boolean = false;
export default function NewEditor() {
  document.onreadystatechange = function () {
    if (document.readyState == "complete") 
    {
      document.getElementById("app")?.classList.add('editor-grid');
      document.getElementById("addRawSubtitle")?.addEventListener('click', function() {AddRawElement("Subtitle")});
      document.getElementById("addRawDateText")?.addEventListener('click', function() {AddRawElement("DateText")});
      document.getElementById("addRawDesc")?.addEventListener('click', function() {AddRawElement("Description")});
      document.getElementById("addRawTitle")?.addEventListener('click', function() {AddRawElement("Title")});
      document.getElementById("addSkillsBox")?.addEventListener('click', function() {AddRawElement("SkillsBox")});
      document.getElementById("addExperience")?.addEventListener('click', function() {AddRawElement("Experience")});
      document.getElementById("save")?.addEventListener('click', function() {EncodeResumeCookie()});
      console.log(listOfSkills);
      // something something look for and load a previously saved resume somewhere
      LoadExistingResumeCookie();
      DisplayResume();
    }
  }
  return (
    <div>
<div className="topnav">
        <a>Resume Maker</a>
        <button id="save">|Save in browser|</button>
        <Link href="/NewDisplay">|new presentation page|</Link>
    </div>
    <div className="content">
      <div id="app">
        <div id="addElements">
          <p>add</p>
          <button id="addRawSubtitle">|add subtitle|</button>
          <button id="addRawDateText">|add DateText|</button>
          <button id="addRawDesc">|add description|</button>
          <button id="addRawTitle">|add title|</button>
          <button id="addSkillsBox">|add skills box|</button>
          <button id="addExperience">|add experience|</button>
        </div>
        <div id="Resume"></div>
        <div id="editElements">
        <p>edit</p>
        </div>
        <div id="editSkills">
        <p>skills and options n stuff</p>
        </div>
      </div>
    </div>
    </div>
  );
}

/// Functions
// Takes a string, identifies the css option, and uses the correct function to apply the value to the HTML element given.
function AddCSSFromString(HTMLElement: any, rawString: string)
{
  let splitString: string[] = rawString.split(":");
  for (let i = 0; i < splitString.length; i++)
  {
    splitString[i] = splitString[i].trim();
  }
  switch (splitString[0])
  {
    case ("display"): { HTMLElement.style.display = splitString[1]; break; }
    case ("justify-content"): { HTMLElement.style.justifyContent = splitString[1]; break; }
    case ("font-size"): { HTMLElement.style.fontSize = splitString[1]; break; }
    case ("border"): { HTMLElement.style.border = splitString[1]; break; }
    default: { throw new Error("Could not find a style method HTMLElement.style." + splitString[1]); }
  }
}

// puts the resume onto the website.
function DisplayResume()
{
  console.log(resume);
  while (document.getElementById("Resume")?.firstChild != null)
  {
    document.getElementById("Resume")?.firstChild?.remove();
  }
  for (let i = 0; i < resume.length; i++)
  {
    resume[i].index = i;
    resume[i].Display();
    document.getElementById("Resume")?.appendChild(CreateMovementButtons(i));
  }
}

function AddRawElement(elementName: string)
{
  switch (elementName)
  {
    case ("Title"): 
    {
      let newTitle = new Title(resume.length);
      resume.push(newTitle);
      DisplayResume();
      break;
    }
    case ("Subtitle"): 
    {
      let newSubtitle = new Subtitle(resume.length);
      resume.push(newSubtitle);
      DisplayResume();
      break;
    }
    case ("Description"): 
    {
      let newDesc = new Description(resume.length);
      resume.push(newDesc);
      DisplayResume();
      break;
    }
    case ("DateText"): 
    {
      let newDateText = new DateText(resume.length);
      resume.push(newDateText);
      DisplayResume();
      break;
    }
    case ("SkillsBox"): 
    {
      let newBox = new SkillsBox(resume.length);
      resume.push(newBox);
      DisplayResume();
      break;
    }
    case ("Experience"):
    {
      let newSubtitle = new Subtitle(resume.length);
      resume.push(newSubtitle);
      let newDateText = new DateText(resume.length);
      resume.push(newDateText);
      let newDesc = new Description(resume.length);
      resume.push(newDesc);
      let newBox = new SkillsBox(resume.length);
      resume.push(newBox);
      DisplayResume();
      break;
    }
    default:
      {
        throw new Error("AddRawElement received a string that is not any basic resume element.");
      }
  }
}


// Creates a dropdown menu of a specific set of skills.
function SkillDropDownMenu(parent: string, parentToAppendTo: any, destination: Skills[])
{
  let parentdiv = document.createElement("div");
  for (let i = 0; i < listOfSkills.length; i++)
  {
    parentdiv.classList.add("skillDropDown");
    parentdiv.setAttribute("id","temporary");
    if (listOfSkills[i].parent == parent)
    {
      let skillHolder = document.createElement("div");
      skillHolder.setAttribute("id","temporary")
      let skill = document.createElement("button");
      skill.textContent = listOfSkills[i].name;
      skill.addEventListener('click', function() {DeleteTemporary(); AddToSkillsBox(destination, skill.textContent!)});
      skill.addEventListener('mouseover', function() {SkillDropDownMenu(listOfSkills[i].name, skillHolder, destination)});
      skillHolder.appendChild(skill);
      parentdiv.appendChild(skillHolder);
      parentToAppendTo.appendChild(parentdiv);
    }
  }
}

// Adds a skill to a specified list of skills if it doesn't already exist.
// this only exists because I couldn't find a better way to add to a skillbox's skills list.
function AddToSkillsBox(destination: Skills[], skillName: string)
{
  let skillToAdd: Skills = new Skills(skillName);
  let duplicateSkill: boolean = false;
  for (let i = 0; i < destination.length; i++)
  {
    if ((destination[i].name == skillToAdd.name) && (destination[i].address == skillToAdd.address) && (destination[i].parent == skillToAdd.parent))
    {
      duplicateSkill = true;
    }
  }
  if (!duplicateSkill)
  {

    destination.push(skillToAdd);
  }
  DisplayResume();
}

// Removes a skill from a specified list of skills.
function RemoveFromSkillsBox(destination: Skills[], skillInString: string)
{
  let skillToRemove = new Skills(skillInString);
  for (let i = 0; i < destination.length; i++)
  {
    if (destination[i].Equals(skillToRemove))
    {
      destination.splice(i,1);
      break;
    }
  }
  DisplayResume();
}

// Deletes everything labeled temporary.
function DeleteTemporary()
{
  while (document.getElementById("temporary") != null)
  {
    document.getElementById("temporary")?.remove();
  }
}

// brings up a text box that allows you to edit the text of the element you clicked on.
function EditText(element: any)
{
  if (document.getElementsByClassName("scanner").length == 0)
  {
    FindElementOnPage(element)!.textContent = "";
    const scannerDiv = document.createElement("div");
    scannerDiv.setAttribute("id","temporary");
    const scanner = document.createElement("input");
    scanner.value = element.text;
    scanner.classList.add("scanner");
    scannerDiv.appendChild(scanner);
    FindElementOnPage(element)?.appendChild(scannerDiv);
    scanner.addEventListener('keypress', function (event) {if (event.key == "Enter") {
      element.text = scanner.value;
      DeleteTemporary();
      if (element.text == "" || element.text == null)
      {
        resume.splice(element.index,1);
      } 
      DisplayResume();
    }});
  }
}

// Finds the element specified on the page. Returns the resume if it's not found.
function FindElementOnPage(element: ResumeElement)
{
  let ids = (document.querySelectorAll("[index=\"" + element.index + "\"]"))
  if (ids.length > 1 || ids.length == 0)
  {
    return document.getElementById("Resume");
  }
  else
  {
    return ids[0];
  }
}

// finds and loads an existing resume in the browser.
function LoadExistingResumeCookie()
{
  const listOfCookies = decodeURIComponent(document.cookie).split(";");
  for (let i = 0; i < listOfCookies.length; i++)
  {
    if (listOfCookies[i].indexOf("element") == 0 || listOfCookies[i].indexOf("element") == 1)
    {
      let intermediate = listOfCookies[i].split("=");
      let generic: any = JSON.parse(intermediate[1]);
      switch (generic.type)
      {
        case ("Title"): 
        {
          let cookieObj = new Title(generic.index);
          cookieObj.text = generic.text;
          cookieObj.cssOptions = generic.cssOptions;
          resume.push(cookieObj);
          break;
        }
        case ("Subtitle"):         
        {
          let cookieObj = new Subtitle(generic.index);
          cookieObj.text = generic.text;
          cookieObj.cssOptions = generic.cssOptions;
          resume.push(cookieObj);
          break;
        }
        case ("DateText"):         
        {
          let cookieObj = new DateText(generic.index);
          cookieObj.text = generic.text;
          cookieObj.cssOptions = generic.cssOptions;
          resume.push(cookieObj);
          break;
        }
        case ("Description"):         
        {
          let cookieObj = new Description(generic.index);
          cookieObj.text = generic.text;
          cookieObj.cssOptions = generic.cssOptions;
          resume.push(cookieObj);
          break;
        }
        case ("SkillsBox"):         
        {
          let cookieObj = new SkillsBox(generic.index);
          cookieObj.text = generic.text;
          cookieObj.cssOptions = generic.cssOptions;
          let skillsArray: Skills[] = [];
          for (let j = 0; j < generic.skills.length; j++)
          {
            let skill: Skills = new Skills(generic.skills[j].name);
            skillsArray.push(skill);
          }
          cookieObj.skills = skillsArray;
          resume.push(cookieObj);
          break;
        }
        default: { throw new Error("Could not find a matching object for " + generic.type); }
      }
    }
  }
}

// Saves a resume in the browser.
// oh my god.. JSON makes this SO much easier.
function EncodeResumeCookie()
{
  DeleteResumeCookie();
  const d = new Date();
  d.setTime(d.getTime() *1.01);
  let expires = "expires="+ d.toUTCString();
  for (let i = 0; i < resume.length; i++)
  {
    document.cookie = "element" + i + "=" + JSON.stringify(resume[i]) + ";" + expires;
  }
}

// Deletes a resume saved in the browser.
function DeleteResumeCookie()
{
  const listOfCookies = decodeURIComponent(document.cookie).split(";");
  for (let i = 0; i < listOfCookies.length; i++)
  {
    if (listOfCookies[i].indexOf("element") == 0 || listOfCookies[i].indexOf("element") == 1)
    {
      let intermediate = listOfCookies[i].split("=");
      document.cookie = intermediate[0] + "=; expires=Thu, 18 Dec 2013 12:00:00 UTC";
    }
  }
}

function CreateMovementButtons(index: number)
{
  let parent = document.createElement("div");
  let upButton = document.createElement("button");
  upButton.textContent = "|^|";
  upButton.addEventListener('click', function() {MoveElementUp(index)});
  let downButton = document.createElement("button");
  downButton.textContent = "|v|";
  downButton.addEventListener('click', function() {MoveElementDown(index)});
  parent.appendChild(upButton);
  parent.appendChild(downButton);
  return parent;
}

function MoveElementUp(index: number)
{
  lockEditing = true;
  if (index != 0)
  {
    let holdThis = resume[index-1];
    resume[index-1] = resume[index];
    resume[index] = holdThis;
    DisplayResume();
  }
  lockEditing = false;
}

function MoveElementDown(index: number)
{
  if (index != resume.length-1)
    {
      let holdThis = resume[index+1];
      resume[index+1] = resume[index];
      resume[index] = holdThis;
      DisplayResume();
    }
}

/// The base that all of the fundamental resume elements draw from.
interface ResumeElement {
  type: string;
  text: string;
  cssOptions: string[];
  index: number;

  // directly adds the element to the page.
  Display: (any);

  // returns itself as an HTML element.
  ConvertToHTML: (any);
}

// Title class.
export class Title implements ResumeElement {
  type: string;
  text: string;
  cssOptions: string[];
  index: number;
  public constructor(i: number)
  {
    this.type = "Title";
    this.index = i;
    this.text = "New Title";
    this.cssOptions = ["display: flex","justify-content: center","font-size: 48px"];
  }

  Display()
  {
    let displayText = document.createElement("p");
    displayText.textContent = this.text;
    let self = this;
    displayText.addEventListener('click', function() {EditText(self)});
    for (let i = 0; i < this.cssOptions.length; i++)
    {
      AddCSSFromString(displayText, this.cssOptions[i]);
    }
    displayText.setAttribute("index",this.index.toString());
    document.getElementById("Resume")?.appendChild(displayText);
  }

  ConvertToHTML()
  {
    let displayText = document.createElement("p");
    displayText.textContent = this.text;
    for (let i = 0; i < this.cssOptions.length; i++)
    {
      AddCSSFromString(displayText, this.cssOptions[i]);
    }
    displayText.setAttribute("index",this.index.toString());
    return displayText;
  }
}

// Description class, Used for long text. Medium size.
export class Description implements ResumeElement {
  type: string;
  text: string;
  cssOptions: string[];
  index: number;
  public constructor(i: number)
  {
    this.type = "Description";
    this.index = i;
    this.text = "New description that says a lot of words about something.";
    this.cssOptions = ["font-size: 16px"];
  }

  Display()
  {
    let displayText = document.createElement("p");
    displayText.textContent = this.text;
    let self = this;
    displayText.addEventListener('click', function() {EditText(self)});
    for (let i = 0; i < this.cssOptions.length; i++)
    {
      AddCSSFromString(displayText, this.cssOptions[i]);
    }
    displayText.setAttribute("index",this.index.toString());
    document.getElementById("Resume")?.appendChild(displayText);
  }

  ConvertToHTML()
  {
    let displayText = document.createElement("p");
    displayText.textContent = this.text;
    for (let i = 0; i < this.cssOptions.length; i++)
    {
      AddCSSFromString(displayText, this.cssOptions[i]);
    }
    displayText.setAttribute("index",this.index.toString());
    return displayText;
  }
}

// DateText class. Smallest size.
export class DateText implements ResumeElement {
  type: string;
  text: string;
  cssOptions: string[];
  index: number;
  public constructor(i: number)
  {
    this.type = "DateText";
    this.index = i;
    this.text = "DateText start - DateText end";
    this.cssOptions = ["font-size: 12px"];
  }

  Display()
  {
    let displayText = document.createElement("p");
    displayText.textContent = this.text;
    let self = this;
    displayText.addEventListener('click', function() {EditText(self)});
    for (let i = 0; i < this.cssOptions.length; i++)
    {
      AddCSSFromString(displayText, this.cssOptions[i]);
    }
    displayText.setAttribute("index",this.index.toString());
    document.getElementById("Resume")?.appendChild(displayText);
  }

  ConvertToHTML()
  {
    let displayText = document.createElement("p");
    displayText.textContent = this.text;
    for (let i = 0; i < this.cssOptions.length; i++)
    {
      AddCSSFromString(displayText, this.cssOptions[i]);
    }
    displayText.setAttribute("index",this.index.toString());
    return displayText;
  }
}

// Subtitle class, used for the title of things like job experiences. Large size.
export class Subtitle implements ResumeElement{
  type: string;
  text: string;
  cssOptions: string[];
  index: number;
  public constructor(i: number)
  {
    this.type = "Subtitle";
    this.index = i;
    this.text = "New Job title";
    this.cssOptions = ["font-size: 24px"];
  }

  Display()
  {
    let displayText = document.createElement("p");
    displayText.textContent = this.text;
    let self = this;
    displayText.addEventListener('click', function() {EditText(self)});
    for (let i = 0; i < this.cssOptions.length; i++)
    {
      AddCSSFromString(displayText, this.cssOptions[i]);
    }
    displayText.setAttribute("index",this.index.toString());
    document.getElementById("Resume")?.appendChild(displayText);
  }

  ConvertToHTML()
  {
    let displayText = document.createElement("p");
    displayText.textContent = this.text;
    for (let i = 0; i < this.cssOptions.length; i++)
    {
      AddCSSFromString(displayText, this.cssOptions[i]);
    }
    displayText.setAttribute("index",this.index.toString());
    return displayText;
  }
}

// skills class.
// I literally only need this because I didn't realize types are just converted to strings or something at runtime.
export class Skills {
  name: string;
  parent: string;
  address: string;
  cssOptions: string[];
  public constructor(skillName: string)
  {
    this.name = skillName;  
    this.address = GetAddressFromSkillName(this.name);  
    this.parent = SetParentSkill(this.name);   
    this.cssOptions = ["display: inline-block", "border: solid"]; 
  }

  ConvertToHTML(parentSkillsBox: Skills[])
  {
    let parent = document.createElement("div");
    for (let i = 0; i < this.cssOptions.length; i++)
    {
      AddCSSFromString(parent, this.cssOptions[i]);
    }
    let img = document.createElement("img");
    ImageSetupFromRawAddress(img, this.address);
    let name = document.createElement("p");
    img.classList.add("skillImage");
    name.classList.add("skillText");
    name.textContent = this.name;
    name.addEventListener('click', function() {RemoveFromSkillsBox(parentSkillsBox, name.textContent!)});
    parent.appendChild(img);
    parent.appendChild(name);
    return parent;
  }

  // checks if two skills are identical.
  Equals(skillToCompare: Skills)
  {
    if ((this.name == skillToCompare.name) && (this.parent == skillToCompare.parent) && (this.address == skillToCompare.address))
    {
      return true;
    }
    return false;
  }
}
// skillsBox class.
export class SkillsBox implements ResumeElement{
  type: string;
  text: string;
  cssOptions: string[];
  skills: Skills[];
  index: number;
  public constructor(i: number)
  {
    this.type = "SkillsBox";
    this.index = i;
    this.skills = [];
    this.text = "";
    this.cssOptions = [];
  }

  Display()
  {
    let parent = document.createElement("div");
    for (let i = 0; i < this.cssOptions.length; i++)
    {
      AddCSSFromString(parent, this.cssOptions[i]);
    }
    for (let i = 0; i < this.skills.length; i++)
    {
      parent.appendChild(this.skills[i].ConvertToHTML(this.skills));
    }
    let addButton = document.createElement("button");
    addButton.textContent = "|Add new skill|";
    let skillsCopy: Skills[] = this.skills;
    addButton.addEventListener('mouseover', function() {DeleteTemporary(); SkillDropDownMenu("", parent, skillsCopy)});
    addButton.addEventListener('click', function() {DeleteTemporary()});
    parent.appendChild(addButton);
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "|Remove skills box|";
    let indexCopy = this.index;
    deleteButton.addEventListener('click', function() {resume.splice(indexCopy,1); DisplayResume();});
    parent.appendChild(deleteButton);
    document.getElementById("Resume")?.appendChild(parent);
  }

  ConvertToHTML()
  {
    let parent = document.createElement("div");
    for (let i = 0; i < this.cssOptions.length; i++)
    {
      AddCSSFromString(parent, this.cssOptions[i]);
    }
    for (let i = 0; i < this.skills.length; i++)
    {
      parent.appendChild(this.skills[i].ConvertToHTML(this.skills));
    }
    let addButton = document.createElement("button");
    addButton.textContent = "|Add new skill|";
    let skillsCopy: Skills[] = this.skills;
    addButton.addEventListener('mouseover', function() {DeleteTemporary(); SkillDropDownMenu("", parent, skillsCopy)});
    addButton.addEventListener('click', function() {DeleteTemporary()});
    parent.appendChild(addButton);
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "|Remove skills box|";
    let indexCopy = this.index;
    deleteButton.addEventListener('click', function() {resume.splice(indexCopy,1); DisplayResume();});
    parent.appendChild(deleteButton);
    return parent;
  }

  ConvertToHTMLForPresentPage()
  {
    let parent = document.createElement("div");
    for (let i = 0; i < this.cssOptions.length; i++)
    {
      AddCSSFromString(parent, this.cssOptions[i]);
    }
    for (let i = 0; i < this.skills.length; i++)
    {
      parent.appendChild(this.skills[i].ConvertToHTML(this.skills));
    }
    return parent;
  }
}