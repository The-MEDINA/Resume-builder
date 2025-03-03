import { EditText, RemoveFromSkillsBox, DeleteTemporary, SkillDropDownMenu, resume, DisplayResume } from "@/app/page";
import { FilterBySkills } from "@/app/Present/page"; 
import { GetAddressFromSkillName, SetParentSkill } from "../../public/HelperScripts/skillTags";
import { ImageSetupFromRawAddress } from "../../public/HelperScripts/ImageHandler";
/// The base that all of the fundamental resume elements draw from.
export interface ResumeElement {
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
  ConvertToHTMLForPresentPage(parentSkillsBox: Skills[])
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
    name.addEventListener('click', function() {FilterBySkills(name.textContent!)});
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
      parent.appendChild(this.skills[i].ConvertToHTMLForPresentPage(this.skills));
    }
    return parent;
  }
}

// divider class.
export class Divider implements ResumeElement{
  type: string;
  text: string;
  cssOptions: string[];
  index: number;
  public constructor(i: number)
  {
    this.type = "Divider";
    this.index = i;
    this.text = "New divider";
    this.cssOptions = ["border-bottom: solid","font-size: 24px"];
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

// Takes a string, identifies the css option, and uses the correct function to apply the value to the HTML element given.
export function AddCSSFromString(HTMLElement: any, rawString: string)
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
    case ("border-bottom"): { HTMLElement.style.borderBottom = splitString[1]; break; }
    default: { throw new Error("Could not find a style method HTMLElement.style." + splitString[1]); }
  }
}