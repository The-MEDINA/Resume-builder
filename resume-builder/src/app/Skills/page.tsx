'use client'
import Script from "next/script";
import dynamic from "next/dynamic";
import { GetSavedSkillList, GetSkillFromAddress, SetParentSkill } from "../../../public/HelperScripts/skillTags";
import { ImageSetup } from "../../../public/HelperScripts/ImageHandler";
let skillList: Skill[] = [];
document.addEventListener('DOMContentLoaded', function() {});

export default function Skills() {
  document.onreadystatechange = function () {
    if (document.readyState == "complete") {
    skillList = ArrayToSkillType(GetSavedSkillList());
    DisplaySkills();
  }
}
    return (
      <div>
        <div className="topnav">
          <a>Resume Maker</a>
      </div>
    <div className="content">
        <div id="messagebox">{Message("")}</div>
        <div id="skillsList"></div>
      </div>
    </div>
    );
  } 

/// Functions
// Display something on the top messagebox. If the message is empty, display a default message.
function Message(theMessage: string): string
{
  if (theMessage == "")
  {
    return "Click on a skill to move it."
  }
  else return theMessage;
}

// Puts the skills on the webpage.
async function DisplaySkills()
{
  for (let i = 0; i < skillList.length; i++)
  {
    if (skillList[i].parent == "")
    {
      let SkillToAppend = SkilltoDiv(skillList[i]);
      await document.getElementById("skillsList")?.appendChild(SkillToAppend);
    }
    else
    {
      let SkillToAppend = SkilltoDiv(skillList[i]);
      await document.getElementById(skillList[i].parent)?.appendChild(SkillToAppend);
      SkillToAppend.style.paddingLeft = (20 + "px");
    }
  }
}

// Converts a skill type to something that can be shown on the webpage.
function SkilltoDiv(skillToConvert: Skill)
{
  let parent = document.createElement("div");
  parent.setAttribute("id",skillToConvert.name);
  let skillText = document.createElement("p");
  skillText.textContent = (skillToConvert.name + ": " + skillToConvert.address);
  let skillImg = document.createElement("img");
  ImageSetup(skillImg, skillToConvert);
  skillText.classList.add("skillText");
  skillImg.classList.add("skillImage");
  parent.appendChild(skillImg);
  parent.appendChild(skillText);
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