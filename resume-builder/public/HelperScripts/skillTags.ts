'use client'
/// So in preparation of converting everything to typescript n stuff, it seems i'll need to wework how importing scripts works.
/// this sounds like a good time to move to typescript, so... yeah.
/// New thing to do: convert scripts from Javascript to Typescript.

/// Searches through all available saved skill lists and picks the newest one to setup the skills.
export function GetSavedSkillList(): string[]
{
  let returnValue: string[] = [];
  /*let checkForDocument: boolean = true;
  while(checkForDocument)
  {
    if (typeof window !== "undefined")
    {*/
        // some if statement that checks if the cookie is the youngest.
        returnValue = DecodeSkillListCookie();
        // another if statement to check if the CSH account's saved list is the youngest 
    /*}
    checkForDocument = false;
  }*/
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
      if (listOfCookies[i].indexOf("SkillTags") == 0)
      {
          let intermediate = listOfCookies[i].split("=");
          cookieToDecode = intermediate[1];
      }
    }
    for (let i = 0; i < cookieToDecode.length; i++)
    {
      allSkills = cookieToDecode.split("`");
    }
    console.log(allSkills);
    return allSkills;
}