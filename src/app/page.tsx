'use client'
import { Skill } from "@/app/Skills/page";
import { GetSavedSkillList, ArrayToSkillType } from "../../public/HelperScripts/skillTags";
import { DisplayResume, SkillDropDownMenu, DeleteTemporary, EditText, RemoveFromSkillsBox, LoadExistingResumeCookie, resume } from "../../public/HelperScripts/Editor";
import { SkillsBox, Skills, Title, Subtitle, DateText, Description, ResumeElement, Divider, Group } from "../../public/HelperScripts/Elements";
import Link from "next/link";
let listOfSkills: Skill[] = ArrayToSkillType(GetSavedSkillList());
export default function NewEditor() {
  document.onreadystatechange = function () {
    if (document.readyState == "complete") 
    {
      document.getElementById("app")?.classList.add('editor-grid');
      document.getElementById("addRawSubtitle")?.addEventListener('click', function() {AddRawElement("Subtitle")});
      document.getElementById("addDivider")?.addEventListener('click', function() {AddRawElement("Divider")});
      document.getElementById("addRawDateText")?.addEventListener('click', function() {AddRawElement("DateText")});
      document.getElementById("addRawDesc")?.addEventListener('click', function() {AddRawElement("Description")});
      document.getElementById("addRawTitle")?.addEventListener('click', function() {AddRawElement("Title")});
      document.getElementById("addSkillsBox")?.addEventListener('click', function() {AddRawElement("SkillsBox")});
      document.getElementById("addExperience")?.addEventListener('click', function() {AddRawElement("Experience")});
      document.getElementById("addGroup")?.addEventListener('click', function() {AddRawElement("Group")});
      document.getElementById("save")?.addEventListener('click', function() {EncodeResumeCookie()});
      //console.log(listOfSkills);
      LoadExistingResumeCookie();
      DisplayResume();

    }
  }
  return (
    <div>
<div className="topnav">
        <a>Resume Maker</a>
        <button id="save">|Save in browser|</button>
        <Link href="/Present">|Present|</Link>
        <Link href="/Skills">|edit skills|</Link>
    </div>
    <div className="content">
      <div id="app">
        <div id="addElements">
          <p>add</p>
          <button id="addRawSubtitle">|add subtitle|</button>
          <button id="addDivider">|add divider|</button>
          <button id="addRawDateText">|add DateText|</button>
          <button id="addRawDesc">|add description|</button>
          <button id="addRawTitle">|add title|</button>
          <button id="addSkillsBox">|add skills box|</button>
          <button id="addExperience">|add experience|</button>
          <button id="addGroup">|add group box|</button>
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
    case ("Divider"): 
    {
      let newDivider = new Divider(resume.length);
      resume.push(newDivider);
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
    case ("Group"): 
    {
      let newGroup = new Group(resume.length);
      resume.push(newGroup);
      DisplayResume();
      break;
    }
    default:
      {
        throw new Error("AddRawElement received a string that is not any basic resume element.");
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