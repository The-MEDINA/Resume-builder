// puts the resume onto the website.
import { resume } from "@/app/page";
import { Skill } from "@/app/Skills/page";
import { GetSavedSkillList, ArrayToSkillType } from "../../public/HelperScripts/skillTags";
import { SkillsBox, Skills, Title, Subtitle, DateText, Description, ResumeElement, Divider, Group } from "../../public/HelperScripts/Elements";
let listOfSkills: Skill[] = ArrayToSkillType(GetSavedSkillList());
export function DisplayResume()
{
  let indexNumber = 0;
  console.log(resume);
  while (document.getElementById("Resume")?.firstChild != null)
  {
    document.getElementById("Resume")?.firstChild?.remove();
  }
  for (let i = 0; i < resume.length; i++)
  {
    resume[i].index = indexNumber;
    if (resume[i].type == "Group")
    {
      for (let j = 0; j < resume[i].elements.length; j++)
      {
        indexNumber++;
        resume[i].elements[j].index = indexNumber;
      }
    }
    resume[i].Display();
    document.getElementById("Resume")?.appendChild(CreateMovementButtons(i));
    indexNumber++;
  }
}

// Adds movement buttons to any resume element.
export function CreateMovementButtons(index: number)
{
  let parent = document.createElement("div");
  let upButton = document.createElement("button");
  upButton.textContent = "|^|";
  upButton.addEventListener('click', function() {MoveElementUp(index)});
  let downButton = document.createElement("button");
  downButton.textContent = "|v|";
  downButton.addEventListener('click', function() {MoveElementDown(index)});
  parent.appendChild(upButton);
  parent.appendChild(downButton);
  return parent;
}

function MoveElementUp(index: number)
{
  if (index != 0)
  {
    if (resume[index].type != "Group" && resume[index-1].type == "Group")
    {
      resume[index-1].elements.push(resume[index]);
      resume.splice(index,1); 
    }
    else
    {
      let holdThis = resume[index-1];
      resume[index-1] = resume[index];
      resume[index] = holdThis;
    }
    DisplayResume();
  }
}

function MoveElementDown(index: number)
{
  if (index != resume.length-1)
  {
    if (resume[index].type != "Group" && resume[index+1].type == "Group")
    {
      resume[index+1].elements.splice(0,0,resume[index]);
      resume.splice(index,1); 
    }
    else
    {
      let holdThis = resume[index+1];
      resume[index+1] = resume[index];
      resume[index] = holdThis;
    }
    DisplayResume();
  }
}

// Creates a dropdown menu of a specific set of skills.
export function SkillDropDownMenu(parent: string, parentToAppendTo: any, destination: Skills[])
{
  console.log("skill drop down");
  let parentdiv = document.createElement("div");
  for (let i = 0; i < listOfSkills.length; i++)
  {
    parentdiv.classList.add("skillDropDown");
    parentdiv.setAttribute("id","temporary");
    if (listOfSkills[i].parent == parent)
    {
      let skillHolder = document.createElement("div");
      skillHolder.setAttribute("id","temporary")
      let skill = document.createElement("button");
      skill.textContent = listOfSkills[i].name;
      skill.addEventListener('click', function() {DeleteTemporary(); AddToSkillsBox(destination, skill.textContent!)});
      skill.addEventListener('mouseover', function() {SkillDropDownMenu(listOfSkills[i].name, skillHolder, destination)});
      skillHolder.appendChild(skill);
      parentdiv.appendChild(skillHolder);
      parentToAppendTo.appendChild(parentdiv);
    }
  }
}

// Deletes everything labeled temporary.
export function DeleteTemporary()
{
  while (document.getElementById("temporary") != null)
  {
    document.getElementById("temporary")?.remove();
  }
}

// Adds a skill to a specified list of skills if it doesn't already exist.
// this only exists because I couldn't find a better way to add to a skillbox's skills list.
function AddToSkillsBox(destination: Skills[], skillName: string)
{
  let skillToAdd: Skills = new Skills(skillName);
  let duplicateSkill: boolean = false;
  for (let i = 0; i < destination.length; i++)
  {
    if ((destination[i].name == skillToAdd.name) && (destination[i].address == skillToAdd.address) && (destination[i].parent == skillToAdd.parent))
    {
      duplicateSkill = true;
    }
  }
  if (!duplicateSkill)
  {

    destination.push(skillToAdd);
  }
  DisplayResume();
}

// brings up a text box that allows you to edit the text of the element you clicked on.
export function EditText(element: any)
{
  if (document.getElementsByClassName("scanner").length == 0)
  {
    console.log("EditText");
    FindElementOnPage(element)!.textContent = "";
    const scannerDiv = document.createElement("div");
    scannerDiv.setAttribute("id","temporary");
    const scanner = document.createElement("input");
    scanner.value = element.text;
    scanner.classList.add("scanner");
    scannerDiv.appendChild(scanner);
    FindElementOnPage(element)?.appendChild(scannerDiv);
    scanner.addEventListener('keypress', function (event) {if (event.key == "Enter") {
        console.log(scanner.value);
      element.text = scanner.value;
      DeleteTemporary();
      console.log(element.index);
      if (element.text == "" || element.text == null)
      {
        resume.splice(resume.indexOf(element),1);
      } 
      DisplayResume();
    }});
  }
}

// Removes a skill from a specified list of skills.
export function RemoveFromSkillsBox(destination: Skills[], skillInString: string)
{
  let skillToRemove = new Skills(skillInString);
  for (let i = 0; i < destination.length; i++)
  {
    if (destination[i].Equals(skillToRemove))
    {
      destination.splice(i,1);
      break;
    }
  }
  DisplayResume();
}

// Finds the element specified on the page. Returns the resume if it's not found.
function FindElementOnPage(element: ResumeElement)
{
  let ids = (document.querySelectorAll("[index=\"" + element.index + "\"]"))
  if (ids.length > 1 || ids.length == 0)
  {
    return document.getElementById("Resume");
  }
  else
  {
    return ids[0];
  }
}