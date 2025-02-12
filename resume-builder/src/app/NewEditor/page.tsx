'use client'
import { Skill } from "@/app/Skills/page";
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
        <div id="Resume">
        <p>resume</p>
        </div>
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
    if (resume[i] instanceof Title)
    {
      DisplayTitle();
    }
  }
}

function DisplayDescription()
{

}

function DisplayDate()
{

}

function DisplaySubtitle()
{

}

function DisplayTitle()
{
  console.log("DisplayTitle()");
}
function DisplaySkill()
{

}

function AddTitle()
{
  console.log("AddTitle()");
  let newTitle = new Title();
  resume.push(newTitle);
  DisplayResume();
}

/// Types & classes
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

// Title class. Largest size.
class Title {
  text: string;
  public constructor()
  {
    this.text = "new title";
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

// SkillBox class. 
// The idea is that it's gonna place just a row or column of skills that can be interacted with to filter skills in the display page.
class SkillBox {
  skills: Skill[];
  public constructor()
  {
    this.skills = [];
  }
}