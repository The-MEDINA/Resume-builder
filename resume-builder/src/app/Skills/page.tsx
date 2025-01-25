'use client'
import Script from "next/script";
import dynamic from "next/dynamic";
import { GetSavedSkillList, GetSkillFromAddress } from "../../../public/HelperScripts/skillTags";
let skillList: Skill[] = ArrayToSkillType(GetSavedSkillList());
console.log(skillList);
export default function Skills() {
    return (
      <div>
        <div className="topnav">
          <a>Resume Maker</a>
      </div>
    <div className="content">
        <div id="messagebox">{Message("")}</div>
        {DisplaySkills()}
      </div>
    </div>
    );
  } 

/// Functions
// Display something on the top messagebox. If the message is empty, display a default message.
function Message(theMessage: String): String
{
  if (theMessage == "")
  {
    return "Click on a skill to move it."
  }
  else return theMessage;
}

// Puts the skills on the webpage.
function DisplaySkills()
{
  let parent = (<div id="skillsList"></div>);
  return(parent);
}

// Converts a list of strings to a list of Skill types.
function ArrayToSkillType(array: String[]): Skill[]
{
  let stringToSkills: Skill[] = [];
  for (let i = 0; i < array.length; i++)
  {
    const newSkill: Skill = {name:(GetSkillFromAddress(array[i])), address:(array[i])};
    stringToSkills.push(newSkill);
  }
  return stringToSkills;
}

// Skill object type.
export type Skill = {
  name: String;
  address: String;
}
/// So... ImageHandler won't play nice with this file for whatever reason. Somehow it manages to break everything.
// I keep getting an error "saying server relative imports are not implemented yet", so it seems like it's not my fault this time.
// (Shocking)
// So... I think I need to copy-paste any functions that I need to grab. (that or rewrite them in some other way)
// This is.. gonna be a lot harder than I thought.