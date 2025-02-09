'use client'
import { Skill } from "@/app/Skills/page";
/// So in preparation of converting everything to typescript n stuff, it seems i'll need to wework how importing scripts works.
/// this sounds like a good time to move to typescript, so... yeah.
/// New thing to do: convert scripts from Javascript to Typescript.

/// Searches through all available saved skill lists and picks the newest one to setup the skills.
export function GetSavedSkillList(): string[]
{
  let returnValue: string[] = [];
    // some if statement that checks if the cookie is the youngest.
    returnValue = DecodeSkillListCookie();
    // another if statement to check if the CSH account's saved list is the youngest 
    return returnValue;
    // (I hope and dream this will one day be implemented)
}

// Extension of GetSavedSkillList(). Returns the skill list in the cookie.
function DecodeSkillListCookie(): string[]
{
    let cookieToDecode: string = "";
    let allSkills: string[] = [];
    const listOfCookies = decodeURIComponent(document.cookie).split(";");
    for (let i = 0; i < listOfCookies.length; i++)
    {
      if (listOfCookies[i].indexOf("SkillTags") == 0 || listOfCookies[i].indexOf("SkillTags") == 1)
      {
        let intermediate = listOfCookies[i].split("=");
        cookieToDecode = intermediate[1];
      }
    }
    allSkills = cookieToDecode.split("`");
    // This prevents a bugged skill from spawning should the cookie have a "`" at the end.
    // I should... just make it so that this thing doesn't make an invalid cookie by default.
    // Checking for this does no harm though..
    if (allSkills[allSkills.length-1] == "")
    {
      allSkills.splice(allSkills.length-1,1);
    }
    return allSkills;
}

// creates a cookie value.
export function EncodeNewCookieFromSkills(stringAddresses: Skill[])
{
  const listOfCookies = decodeURIComponent(document.cookie).split(";");
  for (let i = 0; i < listOfCookies.length; i++)
  {
    if (listOfCookies[i].indexOf("SkillTags") == 0)
    {
        listOfCookies[i] = "SkillTags=;expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        break;
    }
  }
  let returnString = "";
  for (let i = 0; i < stringAddresses.length-1; i++)
  {
    returnString += stringAddresses[i].address + "`";    
  }
  returnString += stringAddresses[stringAddresses.length-1].address;
  /* Funny story, uhhh, this line above the comment? I forgot its purpose, deleted it, changed the for loop, and thought nothing of it.
  ...Then I tried to debug something that was untraceable for like an hour.
  Found the bug, and added a check for it in DecodeSkillListCookie.
  Looked back at skillTags.js... and it had the fix in there already.
  Maybe.. maybe I shouldn't be trusted with writing code. */
  const d = new Date();
  d.setTime(d.getTime()+1000*60*60*24*365);
  let expires = "expires="+ d.toUTCString();
  document.cookie = "SkillTags=" + returnString + "; " + expires;
}

// Gets a skill name from its address.
export function GetSkillFromAddress(address: string): string
{
  let skillAddress: string[] = address.split("/");
  return skillAddress[skillAddress.length-1];
}

// Sets a skill's parent skill.
export function SetParentSkill(address: string): string
{
  let skillAddress: string[] = address.split("/");
  if (skillAddress.length <= 1) return "";
  else return skillAddress[skillAddress.length-2];
}

// checks if a skill is a subskill of another skill
// Doesn't matter how many subskills follow, just if it is a subskill.
export function IsSubSkill(parentSkill: Skill, potentialChild: Skill): boolean
{
  let skillAddress: string[] = parentSkill.address.split("/");
  let potentialAddress: string[] = potentialChild.address.split("/");
  for (let i = 0; i < skillAddress.length; i++)
  {
    if (skillAddress[i] != potentialAddress[i])
    {
      return false;
    }
  }
  return true;
}