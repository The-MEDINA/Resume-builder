// puts the resume onto the website.
import { Skill } from "@/app/Skills/page";
import { GetSavedSkillList, ArrayToSkillType } from "../../public/HelperScripts/skillTags";
import { SkillsBox, Skills, Title, Subtitle, DateText, Description, ResumeElement, Divider, Group } from "../../public/HelperScripts/Elements";
let listOfSkills: Skill[] = ArrayToSkillType(GetSavedSkillList());
export let resume: any[] = [];

export function Setup()
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

// finds and loads an existing resume in the browser.
export function LoadExistingResumeCookie()
{
  const listOfCookies = decodeURIComponent(document.cookie).split(";");
  for (let i = 0; i < listOfCookies.length; i++)
  {
    if (listOfCookies[i].indexOf("element") == 0 || listOfCookies[i].indexOf("element") == 1)
    {
      let intermediate = listOfCookies[i].split("=");
      let generic: any = JSON.parse(intermediate[1]);
      //console.log(intermediate[1])
      switch (generic.type)
      {
        case ("Title"): 
        {
          let cookieObj = new Title(generic.index);
          cookieObj.text = generic.text;
          cookieObj.cssOptions = generic.cssOptions;
          resume.push(cookieObj);
          break;
        }
        case ("Subtitle"):         
        {
          let cookieObj = new Subtitle(generic.index);
          cookieObj.text = generic.text;
          cookieObj.cssOptions = generic.cssOptions;
          resume.push(cookieObj);
          break;
        }
        case ("DateText"):         
        {
          let cookieObj = new DateText(generic.index);
          cookieObj.text = generic.text;
          cookieObj.cssOptions = generic.cssOptions;
          resume.push(cookieObj);
          break;
        }
        case ("Description"):         
        {
          let cookieObj = new Description(generic.index);
          cookieObj.text = generic.text;
          cookieObj.cssOptions = generic.cssOptions;
          resume.push(cookieObj);
          break;
        }
        case ("Divider"):         
        {
          let dividerObj = new Divider(generic.index);
          dividerObj.text = generic.text;
          dividerObj.cssOptions = generic.cssOptions;
          resume.push(dividerObj);
          break;
        }
        case ("SkillsBox"):         
        {
          let cookieObj = new SkillsBox(generic.index);
          //console.log(cookieObj)
          cookieObj.text = generic.text;
          cookieObj.cssOptions = generic.cssOptions;
          let skillsArray: Skills[] = [];
          for (let j = 0; j < generic.skills.length; j++)
          {
            let skill: Skills = new Skills(generic.skills[j].name);
            skillsArray.push(skill);
          }
          cookieObj.skills = skillsArray;
          resume.push(cookieObj);
          break;
        }
        case ("Group"):         
        {
          let groupObj = new Group(generic.index);
          for (let i = 0; i < generic.elements.length; i++)
          {
            // Yeah, uhh.. this is basically just the method copy pasted again.
            // I REALLY need to clean this up and move it to another method later.
            switch (generic.elements[i].type)
            {
              case("Title"):
              {
                let cookieObj = new Title(generic.elements[i].index);
                cookieObj.text = generic.elements[i].text;
                cookieObj.cssOptions = generic.elements[i].cssOptions;
                groupObj.elements.push(cookieObj);
                break;
              }
              case("Subtitle"):
              {
                let cookieObj = new Subtitle(generic.elements[i].index);
                cookieObj.text = generic.elements[i].text;
                cookieObj.cssOptions = generic.elements[i].cssOptions;
                groupObj.elements.push(cookieObj);
                break;
              }
              case("DateText"):
              {
                let cookieObj = new DateText(generic.elements[i].index);
                cookieObj.text = generic.elements[i].text;
                cookieObj.cssOptions = generic.elements[i].cssOptions;
                groupObj.elements.push(cookieObj);
                break;
              }
              case("Description"):
              {
                let cookieObj = new Description(generic.elements[i].index);
                cookieObj.text = generic.elements[i].text;
                cookieObj.cssOptions = generic.elements[i].cssOptions;
                groupObj.elements.push(cookieObj);
                break;
              }
              case("Divider"):
              {
                let cookieObj = new Divider(generic.elements[i].index);
                cookieObj.text = generic.elements[i].text;
                cookieObj.cssOptions = generic.elements[i].cssOptions;
                groupObj.elements.push(cookieObj);
                break;
              }
              case ("SkillsBox"):         
              {
                let cookieObj = new SkillsBox(generic.elements[i].index);
                cookieObj.text = generic.elements[i].text;
                cookieObj.cssOptions = generic.elements[i].cssOptions;
                let skillsArray: Skills[] = [];
                for (let j = 0; j < generic.elements[i].skills.length; j++)
                {
                  let skill: Skills = new Skills(generic.elements[i].skills[j].name);
                  skillsArray.push(skill);
                }
                cookieObj.skills = skillsArray;
                groupObj.elements.push(cookieObj);
                break;
              }
            }
          }
          resume.push(groupObj);
          break;
        }
        default: { throw new Error("Could not find a matching object for " + generic.type); }
      }
    }
  }
}

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