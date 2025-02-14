'use client'
import { ArrayToSkillType, Skill } from "@/app/Skills/page";
import { GetSavedSkillList, GetAddressFromSkillName, SetParentSkill } from "../../../public/HelperScripts/skillTags";
let resume: any = [];
let listOfSkills: Skill[] = ArrayToSkillType(GetSavedSkillList());
export default function NewEditor() {
  document.onreadystatechange = function () {
    if (document.readyState == "complete") 
    {
      document.getElementById("app")?.classList.add('editor-grid');
      document.getElementById("addRawSubtitle")?.addEventListener('click', function() {AddRawElement("Subtitle")});
      document.getElementById("addRawDate")?.addEventListener('click', function() {AddRawElement("Date")});
      document.getElementById("addRawDesc")?.addEventListener('click', function() {AddRawElement("Description")});
      document.getElementById("addRawTitle")?.addEventListener('click', function() {AddRawElement("Title")});
      document.getElementById("addExperience")?.addEventListener('click', function() {AddElementGroup("Experience")});
      console.log(listOfSkills);
      // something something look for and load a previously saved resume somewhere
      DisplayResume();
    }
  }
  return (
    <div>
<div className="topnav">
        <a>Resume Maker</a>
    </div>
    <div className="content">
      <div id="app">
        <div id="addElements">
          <p>add</p>
          <button id="addRawSubtitle">|add subtitle|</button>
          <button id="addRawDate">|add date|</button>
          <button id="addRawDesc">|add description|</button>
          <button id="addRawTitle">|add title|</button>
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
    resume[i].Display();
  }
}

function AddRawElement(elementName: string)
{
  switch (elementName)
  {
    case ("Title"): 
    {
      let newTitle = new Title();
      resume.push(newTitle);
      DisplayResume();
      break;
    }
    case ("Subtitle"): 
    {
      let newSubtitle = new Subtitle();
      resume.push(newSubtitle);
      DisplayResume();
      break;
    }
    case ("Description"): 
    {
      let newDesc = new Description();
      resume.push(newDesc);
      DisplayResume();
      break;
    }
    case ("Date"): 
    {
      let newDate = new Date();
      resume.push(newDate);
      DisplayResume();
      break;
    }
    default:
      {
        throw new Error("AddRawElement received a string that is not any basic resume element.");
      }
  }
}

// puts element groups, like experience, into the resume.
function AddElementGroup(elementName: string)
{
  switch (elementName)
  {
    case ("Experience"): 
    {
      let newExp = new Experience();
      let newTitle = new Subtitle();
      let newDate = new Date();
      let newDesc = new Description();
      newExp.titles.push(newTitle);
      newExp.dates.push(newDate);
      newExp.desc.push(newDesc);
      resume.push(newExp);
      DisplayResume();
      break;
    }
  }
}

// Creates a dropdown menu of a specific set of skills.
// As much as I hate my previous implementation of this, the general idea is the only way I can think of.
function SkillDropDownMenu(parent: string, parentToAppendTo: any, destination: Skills[])
{
  console.log("SkillDropDownMenu(string)");
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
      // So there's just a straight up error here but it lets my code run??? HUH
      skill.addEventListener('click', function() {DeleteTemporary(); AddToSkillsBox(destination, skill.textContent)});
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
  console.log(resume);
}

//
function DeleteTemporary()
{
  while (document.getElementById("temporary") != null)
  {
    document.getElementById("temporary")?.remove();
  }
}

/// The base that all of the fundamental resume elements draw from.
interface ResumeElement {
  text: string;
  cssOptions: string[];

  // directly adds the element to the page.
  Display: (any);

  // returns itself as an HTML element.
  ConvertToHTML: (any);
}

// Title class.
class Title implements ResumeElement {
  text: string;
  cssOptions: string[];
  public constructor()
  {
    this.text = "New Title";
    this.cssOptions = ["display: flex","justify-content: center","font-size: 48px"];
  }

  Display()
  {
    let displayText = document.createElement("p");
    displayText.textContent = this.text;
    for (let i = 0; i < this.cssOptions.length; i++)
    {
      AddCSSFromString(displayText, this.cssOptions[i]);
    }
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
    return displayText;
  }
}

// Description class, Used for long text. Medium size.
class Description implements ResumeElement {
  text: string;
  cssOptions: string[];
  public constructor()
  {
    this.text = "New description that says a lot of words about something.";
    this.cssOptions = ["font-size: 16px"];
  }

  Display()
  {
    let displayText = document.createElement("p");
    displayText.textContent = this.text;
    for (let i = 0; i < this.cssOptions.length; i++)
    {
      AddCSSFromString(displayText, this.cssOptions[i]);
    }
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
    return displayText;
  }
}

// Date class. Smallest size.
class Date implements ResumeElement {
  text: string;
  cssOptions: string[];
  public constructor()
  {
    this.text = "Date start - Date end";
    this.cssOptions = ["font-size: 12px"];
  }

  Display()
  {
    let displayText = document.createElement("p");
    displayText.textContent = this.text;
    for (let i = 0; i < this.cssOptions.length; i++)
    {
      AddCSSFromString(displayText, this.cssOptions[i]);
    }
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
    return displayText;
  }
}

// Subtitle class, used for the title of things like job experiences. Large size.
class Subtitle implements ResumeElement{
  text: string;
  cssOptions: string[];
  public constructor()
  {
    this.text = "New Job title";
    this.cssOptions = ["font-size: 24px"];
  }

  Display()
  {
    let displayText = document.createElement("p");
    displayText.textContent = this.text;
    for (let i = 0; i < this.cssOptions.length; i++)
    {
      AddCSSFromString(displayText, this.cssOptions[i]);
    }
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
    return displayText;
  }
}

// skills class.
// I literally only need this because I didn't realize types are just converted to strings or something at runtime.
class Skills {
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
}
// skillsBox class.
// We'll see if this is necessary or not later.
class SkillsBox {
  skills: Skills[];
  public constructor()
  {
    this.skills = [];
  }

  Display()
  {

  }

  ConvertToHTML()
  {
    let parent = document.createElement("div");
    // something about appending skills here.
    let addButton = document.createElement("button");
    addButton.textContent = "|Add new skill|";
    let skillsCopy: Skills[] = this.skills;
    addButton.addEventListener('mouseover', function() {DeleteTemporary(); SkillDropDownMenu("", parent, skillsCopy)});
    addButton.addEventListener('click', function() {DeleteTemporary()});
    parent.appendChild(addButton)
    return parent;
  }
}

// Experience class. Is a preset group of basic types.
class Experience {
  titles: Subtitle[];
  dates: Date[];
  desc: Description[];
  skillsBox: SkillsBox;
  cssOptions: string[];
  public constructor()
  {
    this.titles = [];
    this.dates = [];
    this.desc = [];
    this.skillsBox = new SkillsBox();
    this.cssOptions = [];
  }

  Display()
  {
    let parent = document.createElement("div");
    for (let i = 0; i < this.titles.length; i++)
    {
      parent.appendChild(this.titles[i].ConvertToHTML());
    }
    for (let i = 0; i < this.dates.length; i++)
    {
      parent.appendChild(this.dates[i].ConvertToHTML());
    }
    for (let i = 0; i < this.desc.length; i++)
    {
      parent.appendChild(this.desc[i].ConvertToHTML());
    }
    parent.appendChild(this.skillsBox.ConvertToHTML());
    document.getElementById("Resume")?.appendChild(parent);
  }
}