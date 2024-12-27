/* 
Every skill is sorted into a list, and is formatted similarly to how directories work.
simply add a skill by appending a string to the list.
to add a subskill, add its parent skill before the subskill, but separate it with a "|".
*/
let stringAddresses = [];

/* Functions */
// Test function. 
export function Test()
{
    console.log("skillTags.js OK")
}

// Searches for a cookie, and either makes a new one if one isn't found, or replaces the skills with the contents of the cookie.
export function Setup()
{
    if (!findSkillTagsCookie())
    {
        const d = new Date();
        d.setTime(d.getTime() *1.01);
        let expires = "expires="+ d.toUTCString();
        document.cookie = "SkillTags=" + EncodeSkillTagsCookie() + "; " + expires;
    }
    else
    {
        DecodeSkillTagsCookie();
    }
}

// creates a cookie value.
export function EncodeSkillTagsCookie()
{
    let returnString = "";
    for (let i = 0; i < stringAddresses.length-2; i++)
    {
        returnString += stringAddresses[i] + "`";    
    }
    returnString += stringAddresses[stringAddresses.length-1];
    return returnString;
}

// overwrites the skills with the cookie found.
export function DecodeSkillTagsCookie()
{
    let cookieToDecode = "";
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
        stringAddresses = cookieToDecode.split("`");
    }
}

// looks for the SkillTags cookie.
function findSkillTagsCookie()
{
    const listOfCookies = decodeURIComponent(document.cookie).split(";");
    for (let i = 0; i < listOfCookies.length; i++)
    {
        if (listOfCookies[i].indexOf("SkillTags") == 0)
        {
            return true;
        }
    }
    return false;
}

// The default structure of skills.
export function DefaultAddresses()
{
    // Programming section.
    stringAddresses.push("Programming");
    stringAddresses.push("Programming|Web-Dev");
    stringAddresses.push("Programming|Web-Dev|Frontend");
    stringAddresses.push("Programming|Web-Dev|Backend");
    stringAddresses.push("Programming|Web-Dev|Fullstack");
    stringAddresses.push("Programming|Java");
    stringAddresses.push("Programming|JavaScript");
    stringAddresses.push("Programming|C#");
    stringAddresses.push("Programming|C++");
    stringAddresses.push("Programming|C");
    stringAddresses.push("Programming|Python");
    stringAddresses.push("Programming|Rust");
    // GameDev Section.
    stringAddresses.push("Game-Dev");
    stringAddresses.push("Game-Dev|Game Design");
    stringAddresses.push("Game-Dev|Game Development");
    stringAddresses.push("Game-Dev|Game Testing");
    stringAddresses.push("Game-Dev|Godot");
    stringAddresses.push("Game-Dev|Unity");
    stringAddresses.push("Game-Dev|MonoGame");
    // Esports section.
    stringAddresses.push("Esports");
    stringAddresses.push("Esports|PlayVS");
    // Music section.
    stringAddresses.push("Music");
    stringAddresses.push("Music|Music Performance");
    stringAddresses.push("Music|Music Performance|Band");
    stringAddresses.push("Music|Music Performance|Orchestra");
    stringAddresses.push("Music|Music Performance|Ensemble");
    stringAddresses.push("Music|Music Performance|Soloist");
    stringAddresses.push("Music|Music Composition");
    // Job Experience section.
    stringAddresses.push("Job Experience");
    // Awards section.
    stringAddresses.push("Award");
    return stringAddresses;
}

// finds all the subskills of a specific skill.
export function SpecifySkills(skillName)
{
    let sortedSkills = [];
    if (skillName == null)
    {
        for (let i = 0; i < stringAddresses.length; i++)
        {
            const skill = stringAddresses[i].split("|");
            if (skill.length == 1)
            {
                sortedSkills.push(skill[0]);
            }
        }
    }
    else
    {
        for (let i = 0; i < stringAddresses.length; i++)
        {
            let skill = stringAddresses[i].split("|");
            if (skill.includes(skillName))
            {
                for (let i = 0; i < skill.indexOf(skillName)+1; i++)
                {
                    skill.splice(0,1);
                    i--;
                }
                if (skill.length == 1)
                {
                    sortedSkills.push(skill[0]);
                }
            }
        }
    }
    return sortedSkills;
}

// gets the entire address of a specific skill.
export function SpecifySkillAddress(skillName)
{
    for (let i = 0; i < stringAddresses.length; i++)
    {
        const address = stringAddresses[i].split("|");
        if (address[address.length-1] == skillName)
        {
            return address;
        }
    }
}