'use client'
import { GetSavedSkillList, GetSkillFromAddress, SetParentSkill, IsSubSkill, EncodeNewCookieFromSkills } from "../../../public/HelperScripts/skillTags";
import { ImageSetup } from "../../../public/HelperScripts/ImageHandler";
let skillList: Skill[] = [];
let holdOntoSkill: Skill;
let isSkillSelected: boolean = false;
let NewSkillInProgress: boolean = false;

export default function Skills() {
  document.onreadystatechange = function () {
    if (document.readyState == "complete") {
    skillList = ArrayToSkillType(GetSavedSkillList());
    DisplaySkills();
    document.getElementById("saveButton")?.addEventListener('click', function() {EncodeNewCookieFromSkills(skillList)});
    Message("");
  }
}
    return (
      <div>
        <div className="topnav">
          <a>Resume Maker </a>
          <button id="saveButton">|Save skills list|</button>
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
    let newSkillParent = document.createElement("div");
    let newSkill = document.createElement("button");
    let newSkillImg = document.createElement("img");
    newSkillImg.src = "img/Add.png"
    newSkill.classList.add("skillText");
    newSkillImg.classList.add("skillImage");
    newSkillParent.appendChild(newSkillImg);
    newSkillParent.appendChild(newSkill);
    newSkill.textContent = "Add new skill / Move to Generic";
    newSkill.addEventListener('click', function() {NewSkill()});
    newSkillParent.setAttribute("id","newSkill");
    document.getElementById("skillsList")?.appendChild(newSkillParent);
}

async function DisplaySubSkills(parentName: string)
{
  for (let i = 0; i < skillList.length; i++)
  {
    if (skillList[i].parent == parentName)
    {
      let SkillToAppend = SkilltoDiv(skillList[i]);
      while (document.getElementById(skillList[i].parent) == null)
      {
        throw new Error("Found null getElementById");/* Had trouble with this thing getting null... 
        throwing an error seems to also fix it, should the issue ever come up.
        (It SHOULD be patched though)*/
      }
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

// Moves skills around.
async function MoveSkills(skillToMove: Skill)
{
  if (!isSkillSelected)
  {
    isSkillSelected = true;
    holdOntoSkill = skillToMove;
      {
        Message("Click on new skill, delete skill, or click on an existing skill to move the selected skill (" + skillToMove.name + ") to.");
        let trashSkillParent = document.createElement("div");
        let trashSkill = document.createElement("button");
        let trashSkillImg = document.createElement("img");
        trashSkillImg.src = "img/Trash.png"
        trashSkill.classList.add("skillText");
        trashSkillImg.classList.add("skillImage");
        trashSkillParent.appendChild(trashSkillImg);
        trashSkillParent.appendChild(trashSkill);
        trashSkill.textContent = "Delete skill";
        trashSkill.addEventListener('click', function() {DeleteSkill()});
        trashSkillParent.setAttribute("id","trashSkill");
        document.getElementById("skillsList")?.appendChild(trashSkillParent);
      }
    }
  else if (!NewSkillInProgress)
  {
    if (IsSubSkill(holdOntoSkill,skillToMove))
    {
      Message("Cannot move parent skill into subskill.")
      isSkillSelected = false;
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
        RemoveDeleteSkill();
        isSkillSelected = false;
    }
  }
}

// Prompts for a name and then creates a new skill, or moves an existing skill to generic.
async function NewSkill()
{
  if (!isSkillSelected)
  {
    isSkillSelected = true;
    NewSkillInProgress = true;
    PromptForString();
    document.addEventListener('methodFinished', () => {
      DisplaySkills();
      Message("");
      NewSkillInProgress = false;
      isSkillSelected = false;
    });
  }
  else
  {
    holdOntoSkill.address = holdOntoSkill.name;
    holdOntoSkill.parent = "";
    UpdateSubSkillAddress(holdOntoSkill);
    DisplaySkills();
    Message("");
    RemoveDeleteSkill();
    isSkillSelected = false;
  }
}

// Deletes the skill that was selected. 
function DeleteSkill()
{
  for (let i = 0; i < skillList.length; i++)
    {
      if (holdOntoSkill.name == skillList[i].name && holdOntoSkill.address == skillList[i].address)
      {
        const moveToGeneric: Skill = {name:holdOntoSkill.name, parent:"", address:""}
        UpdateSubSkillAddress(moveToGeneric);
        skillList.splice(i,1);
        break;
      }
    }
    for (let i = 0; i < skillList.length; i++)
    {
      skillList[i].parent = SetParentSkill(skillList[i].address);
    }
    DisplaySkills();
    Message("");
    RemoveDeleteSkill();
    isSkillSelected = false;
}

// finds subskills of a skill that was changed, and updates all of their addresses accordingly.
function UpdateSubSkillAddress(parentSkill: Skill)
{
  for (let i = 0; i < skillList.length; i++)
  {
    if (skillList[i].parent == parentSkill.name)
    {
      if (parentSkill.address == "" || parentSkill.address == null)
      {
        skillList[i].address = skillList[i].name;
      }
      else
      {
        skillList[i].address = parentSkill.address + "/" + skillList[i].name;
      }
      UpdateSubSkillAddress(skillList[i]);
    }
  }
}

// Prompts for a string to complete making a new skill.
// I hate how I coded this part, I should really rewrite it.
async function PromptForString()
{
  Message("What's the name of the new skill?");
  let stringValue: string = "new";
  const scanner = document.createElement("input");
  scanner.classList.add("scanner");
  document.getElementById("messagebox")?.appendChild(scanner);
  scanner.addEventListener('keypress', function (event) {
    if (event.key == "Enter") 
      {
      if ((scanner.value == "") || (scanner.value == null))
      {
        stringValue = "new";
      }
      else
      {
        stringValue = scanner.value;
      }
      skillList.push({name: stringValue, address: stringValue, parent:""});
      EndPrompt();
      }
    }
  );
}

// Deletes the scanner and notifies anything waiting that it finished.
function EndPrompt()
{
  let scanner = document.getElementsByClassName("scanner");
  while (scanner.length > 0)
    {
      scanner[0].remove();
    }
    const event = new CustomEvent('methodFinished');
    document.dispatchEvent(event);
}

// deletes the trash skill button
function RemoveDeleteSkill()
{
  while (document.getElementById("trashSkill") != null)
  {
    document.getElementById("trashSkill")?.remove();
  }
}

// Skill object type.
export type Skill = {
  name: string;
  address: string;
  parent: string;
}