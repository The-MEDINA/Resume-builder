'use client'
import { SkillsBox, Skills, Title, Subtitle, DateText, Description } from "../../../public/HelperScripts/Elements";
import Link from "next/link";
let presentResume: any = [];
export default function NewDisplay() {
    document.onreadystatechange = function () {
        if (document.readyState == "complete") 
        {
          document.getElementById("print")?.addEventListener('click', function() {PrintResume()});
          LoadExistingResumeCookie();
        }
      }
  return (
    <div>
<div className="topnav">
        <a>Resume Maker</a>
        <button id="print"> |print|</button>
    </div>
    <div className="content">
        <div id="app"></div>
    </div>
    </div>
  );
}

// does the same thing as the function on the editor side.
// I should.. make it return something instead of copy-pasting it.
// I'll do it later (never)
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
          presentResume.push(cookieObj);
          break;
        }
        case ("Subtitle"):         
        {
          let cookieObj = new Subtitle(generic.index);
          cookieObj.text = generic.text;
          cookieObj.cssOptions = generic.cssOptions;
          presentResume.push(cookieObj);
          break;
        }
        case ("DateText"):         
        {
          let cookieObj = new DateText(generic.index);
          cookieObj.text = generic.text;
          cookieObj.cssOptions = generic.cssOptions;
          presentResume.push(cookieObj);
          break;
        }
        case ("Description"):         
        {
          let cookieObj = new Description(generic.index);
          cookieObj.text = generic.text;
          cookieObj.cssOptions = generic.cssOptions;
          presentResume.push(cookieObj);
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
          presentResume.push(cookieObj);
          break;
        }
        default: { throw new Error("Could not find a matching object for " + generic.type); }
      }
    }
  }
  PresentResume();
}

// brings up a printing dialog for the resume.
function PrintResume()
{
    document.getElementsByClassName("topnav")[0].remove();
    const content = document.getElementsByClassName("content");
    content[0].classList.remove("content");
    print();
}

function PresentResume()
{
  for (let i = 0; i < presentResume.length; i++)
  {
    if (presentResume[i].type == "SkillsBox")
    {
        document.getElementById("app")?.appendChild(presentResume[i].ConvertToHTMLForPresentPage());
    }
    else
    {
        document.getElementById("app")?.appendChild(presentResume[i].ConvertToHTML());
    }
  }
}
