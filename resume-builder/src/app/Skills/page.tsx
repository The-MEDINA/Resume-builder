'use client'
import Script from "next/script";
import dynamic from "next/dynamic";
import { GetSavedSkillList, GetSkillFromAddress, SetParentSkill, IsSubSkill } from "../../../public/HelperScripts/skillTags";
import { ImageSetup } from "../../../public/HelperScripts/ImageHandler";
let skillList: Skill[] = [];
let holdOntoSkill: Skill;
document.addEventListener('DOMContentLoaded', function() {});

export default function Skills() {
  document.onreadystatechange = function () {
    if (document.readyState == "complete") {
    skillList = ArrayToSkillType(GetSavedSkillList());
    DisplaySkills();
    Message("");
  }
}
    return (
      <div>
        <div className="topnav">
          <a>Resume Maker</a>
      </div>
    <div className="content">
        <div id="messagebox">
          <p id= "messageText"></p>
        </div>
        <div id="skillsList"></div>
      </div>
    </div>
    );
  } 

/// Functions
// Display something on the top messagebox. If the message is empty, display a default message.
function Message(theMessage: string)
{
  if (theMessage == "")
  {
    (document.getElementById("messageText") as HTMLParagraphElement).textContent = "Click on a skill to move it.";
  }
  else
  {
    (document.getElementById("messageText") as HTMLParagraphElement).textContent = theMessage;
  }
}

// Puts the skills on the webpage.
function DisplaySkills()
{
  while (document.getElementById("skillsList")?.firstChild != null)
  {
    document.getElementById("skillsList")?.firstChild?.remove();
  }
  for (let i = 0; i < skillList.length; i++)
  {
    if (skillList[i].parent == "")
    {
      let SkillToAppend = SkilltoDiv(skillList[i]);
      document.getElementById("skillsList")?.appendChild(SkillToAppend);
      SkillToAppend.style.paddingTop = (10 + "px");
      DisplaySubSkills(skillList[i].name);
    }
  }
}

async function DisplaySubSkills(parentName: string)
{
  for (let i = 0; i < skillList.length; i++)
  {
    if (skillList[i].parent == parentName)
    {
      let SkillToAppend = SkilltoDiv(skillList[i]);
      document.getElementById(skillList[i].parent)?.appendChild(SkillToAppend);
      SkillToAppend.style.paddingLeft = (20 + "px");
      DisplaySubSkills(skillList[i].name);
    }
  }
}

// Converts a skill type to something that can be shown on the webpage.
function SkilltoDiv(skillToConvert: Skill)
{
  let parent = document.createElement("div");
  parent.setAttribute("id",skillToConvert.name);
  let skillText = document.createElement("button");
  skillText.textContent = (skillToConvert.name + ": " + skillToConvert.address);
  let skillImg = document.createElement("img");
  ImageSetup(skillImg, skillToConvert);
  skillText.classList.add("skillText");
  skillImg.classList.add("skillImage");
  parent.appendChild(skillImg);
  parent.appendChild(skillText);
  skillText.addEventListener('click', function() {MoveSkills(skillToConvert)});
  return parent;
}

// Converts a list of strings to a list of Skill types.
function ArrayToSkillType(array: string[]): Skill[]
{
  let stringToSkills: Skill[] = [];
  for (let i = 0; i < array.length; i++)
  {
    const newSkill: Skill = {name:(GetSkillFromAddress(array[i])), address:(array[i]), parent:(SetParentSkill(array[i]))};
    stringToSkills.push(newSkill);
  }
  return stringToSkills;
}

// 
function MoveSkills(skillToMove: Skill)
{
  if (document.getElementById("messagebox")?.textContent == "Click on a skill to move it." || document.getElementById("messagebox")?.textContent == "Cannot move parent skill into subskill.")
  {
    holdOntoSkill = skillToMove;
    Message("Click on new skill, delete skill, or click on an existing skill to move the selected skill (" + skillToMove.name + ") to.");
    /*
    let newSkillParent = document.createElement("div");
    let newSkill = document.createElement("button");
    let newSkillImg = document.createElement("img");
    newSkillImg.src = "img/Add.png"
    newSkill.classList.add("skillText");
    newSkillImg.classList.add("skillImage");
    newSkillParent.appendChild(newSkillImg);
    newSkillParent.appendChild(newSkill);
    newSkill.textContent = "Add new skill or add to Generic";
    document.getElementById("skillsList")?.appendChild(newSkillParent);*/
  }
  else
  {
    // new skill button (also for moving skills into generic)
    // delete skill button
    // move existing skills (I should check if the position to move it to is valid, as in not its own subskill)
    if (IsSubSkill(holdOntoSkill,skillToMove))
    {
      Message("Cannot move parent skill into subskill.")
    }
    else
    {
      for (let i = 0; i < skillList.length; i++)
        {
          if ((skillList[i].name == holdOntoSkill.name) && (skillList[i].address == holdOntoSkill.address))
          {
            skillList[i].address = skillToMove.address + "/" + skillList[i].name;
            skillList[i].parent = SetParentSkill(skillList[i].address);
            holdOntoSkill = skillList[i];
            break;
          }
        }
        UpdateSubSkillAddress(holdOntoSkill);
        DisplaySkills();
        Message("");
    }
  }
}

// finds subskills of a skill that was changed, and updates all of their addresses accordingly.
function UpdateSubSkillAddress(parentSkill: Skill)
{
  for (let i = 0; i < skillList.length; i++)
  {
    if (skillList[i].parent == parentSkill.name)
    {
      skillList[i].address = parentSkill.address + "/" + skillList[i].name;
      UpdateSubSkillAddress(skillList[i]);
    }
  }
}

// Skill object type.
export type Skill = {
  name: string;
  address: string;
  parent: string;
}

/// So... ImageHandler won't play nice with this file for whatever reason. Somehow it manages to break everything.
// I keep getting an error "saying server relative imports are not implemented yet", so it seems like it's not my fault this time.
// (Shocking)
// So... I think I need to copy-paste any functions that I need to grab. (that or rewrite them in some other way)
// This is.. gonna be a lot harder than I thought.