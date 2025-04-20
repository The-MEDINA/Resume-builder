import { FilterBySkills } from "./Present";
import { DisplayResume, SkillDropDownMenu, DeleteTemporary, EditText, RemoveFromSkillsBox, resume } from "./Editor";
import { GetAddressFromSkillName, SetParentSkill } from "./skillTags";
import { ImageSetupFromRawAddress } from "./ImageHandler";

/// The base that all of the fundamental resume elements draw from.
export interface ResumeElement {
  type: string;
  text: string;
  cssOptions: string[];
  index: number;
  //style: any; <- this is an object, and each element has its own.
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
  style: typeof TitleStyle;
  public constructor(i: number)
  {
    this.type = "Title";
    this.index = i;
    this.text = "New Title";
    this.cssOptions = ["display: flex","justify-content: center","font-size: 48px"];
    this.style = TitleStyle;
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
  style: typeof DescriptionStyle;

  public constructor(i: number)
  {
    this.type = "Description";
    this.index = i;
    this.text = "New description that says a lot of words about something.";
    this.cssOptions = ["font-size: 16px"];
    this.style = DescriptionStyle;
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
  style: typeof DateTextStyle;
  public constructor(i: number)
  {
    this.type = "DateText";
    this.index = i;
    this.text = "DateText start - DateText end";
    this.cssOptions = ["font-size: 12px"];
    this.style = DateTextStyle;
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
  style: typeof SubtitleStyle;
  public constructor(i: number)
  {
    this.type = "Subtitle";
    this.index = i;
    this.text = "New Job title";
    this.cssOptions = ["font-size: 24px"];
    this.style = SubtitleStyle;
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
// I NEED TO CLEAN THAT UP AAAAAA
// TODO: rewrite anything using the skills type to use a skills object.
// (Looking at you skills page)
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
  style: typeof DividerStyle;
  public constructor(i: number)
  {
    this.type = "Divider";
    this.index = i;
    this.text = "New divider";
    this.cssOptions = ["border-bottom: solid","font-size: 24px"];
    this.style = DividerStyle;
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

// group class. NOT based off of a ResumeElement.
export class Group {
  type: string;
  elements: ResumeElement[];
  index: number;
  public constructor(i: number)
  {
    this.index = i;
    this.elements = [];
    this.type = "Group";
  } 
  Display()
  {
    let groupDiv = document.createElement("div");
    groupDiv.setAttribute("id","groupBox");
    for (let i = 0; i < this.elements.length; i++)
    {
      //console.log(this.elements[i]);
      let child = groupDiv.appendChild(this.elements[i].ConvertToHTML()); 
      child.appendChild(GroupMovementButtons(this.elements[i].index, this));
    }
    let removeButton = document.createElement("p");
    removeButton.textContent = "|remove group|";
    let indexCopy = this.index;
    removeButton.addEventListener('click', function() {resume.splice(indexCopy,1); DisplayResume();});
    groupDiv.appendChild(removeButton);
    document.getElementById("Resume")?.appendChild(groupDiv);
  }

  ConvertToHTML() { }
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

// Adds movement buttons to any resume element in a group.
function GroupMovementButtons(index: number, groupBox: Group)
{
  let parent = document.createElement("div");
  let upButton = document.createElement("button");
  upButton.textContent = "|^|";
  upButton.addEventListener('click', function() {MoveUp(index, groupBox)});
  let downButton = document.createElement("button");
  downButton.textContent = "|v|";
  downButton.addEventListener('click', function() {MoveDown(index, groupBox)});
  parent.appendChild(upButton);
  parent.appendChild(downButton);
  return parent;
}

function MoveUp(index: number, groupBox: Group)
{
  if (!(index-1 == groupBox.index))
  {
    let holdThis = groupBox.elements[(index-2)-groupBox.index];
    groupBox.elements[(index-2)-groupBox.index] = groupBox.elements[(index-1)-groupBox.index];
    groupBox.elements[(index-1)-groupBox.index] = holdThis;
  }
  else
  {
    let holdThis = groupBox.elements[(index-1) - groupBox.index];
    groupBox.elements.splice(0,1);
    resume.splice(groupBox.index, 0, holdThis);
  }
  DisplayResume();
}

function MoveDown(index: number, groupBox: Group)
{
  if (!(index == (groupBox.index + groupBox.elements.length)))
  {
    let holdThis = groupBox.elements[(index-1)-groupBox.index];
    groupBox.elements[(index-1)-groupBox.index] = groupBox.elements[(index)-groupBox.index];
    groupBox.elements[(index)-groupBox.index] = holdThis;
  }
  else
  {
    //console.log("move out from bottom");
    let holdThis = groupBox.elements[(index-1) - groupBox.index];
    groupBox.elements.splice(groupBox.elements.length-1,1);
    resume.splice(groupBox.index + groupBox.elements.length, 0, holdThis);
  }
  DisplayResume();
}

// The default style object for a Title element.
export const TitleStyle = {
  display: "flex",
  justifyContent: "center",
  fontSize: "48px",
};

// The default style object for a Description element.
export const DescriptionStyle = {
  fontSize: "16px",
};

// The default style object for a Date text element.
export const DateTextStyle = {
  fontSize: "12px",
};

// The default style object for a subtitle element.
export const SubtitleStyle = {
  fontSize: "24px",
};

// The default style object for a divider element.
export const DividerStyle = {
  fontSize: "24px",
  borderBottom: "solid",
};