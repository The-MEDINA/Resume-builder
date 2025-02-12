'use client'
import { Skill } from "@/app/Skills/page";
import { split } from "postcss/lib/list";
let resume: any = [];
export default function NewEditor() {
  document.onreadystatechange = function () {
    if (document.readyState == "complete") 
    {
      document.getElementById("app")?.classList.add('editor-grid');
      document.getElementById("addRawTitle")?.addEventListener('click', function() {AddTitle()});
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

function AddTitle()
{
  console.log("AddTitle()");
  let newTitle = new Title();
  resume.push(newTitle);
  DisplayResume();
}
/// The base that all resume elements draw from.
interface ResumeElement {
  text: string;
  textSize: number;
  cssOptions: string[];
  Display: (any);
}

// Title class.
class Title implements ResumeElement {
  text: string;
  textSize: number;
  cssOptions: string[];
  public constructor()
  {
    this.text = "new title";
    this.textSize = 48;
    this.cssOptions = ["display: flex","justify-content: center"];
  }

  Display()
  {
    let displayText = document.createElement("p");
    displayText.textContent = this.text;
    displayText.style.fontSize = (this.textSize + "px");
    for (let i = 0; i < this.cssOptions.length; i++)
    {
      AddCSSFromString(displayText, this.cssOptions[i]);
    }
    document.getElementById("Resume")?.appendChild(displayText);
  }
}

// Description class, Used for long text. Medium size.
class Description {
  text: string;
  public constructor()
  {
    this.text = "new description";
  }
}

// Date class. Smallest size.
class Date {
  text: string;
  public constructor()
  {
    this.text = "new date";
  }
}

// Subtitle class, used for the title of things like job experiences. Large size.
class Subtitle {
  text: string;
  public constructor()
  {
    this.text = "new subtitle";
  }
}

// Experience class. Is a preset group of basic types.
class Experience {
  titles: Subtitle[];
  dates: Date[];
  desc: Description[];
  skills: Skill[];
  public constructor()
  {
    this.titles = [];
    this.dates = [];
    this.desc = [];
    this.skills = [];
  }
}