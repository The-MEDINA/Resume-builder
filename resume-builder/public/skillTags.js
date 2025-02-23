/* 
Every skill is sorted into a list, and is formatted similarly to how directories work.
simply add a skill by appending a string to the list.
to add a subskill, add its parent skill before the subskill, but separate it with a "/".
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
        d.setTime(d.getTime()+1000*60*60*24*365);
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
    for (let i = 0; i < stringAddresses.length-1; i++)
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
        //console.log(stringAddresses);
    }
}

// looks for the SkillTags cookie.
function findSkillTagsCookie()
{
    const listOfCookies = decodeURIComponent(document.cookie).split(";");
    for (let i = 0; i < listOfCookies.length; i++)
    {
        if (listOfCookies[i].indexOf("SkillTags") == 0 || listOfCookies[i].indexOf("SkillTags") == 1)
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
    stringAddresses.push("Programming/Web-Dev");
    stringAddresses.push("Programming/Web-Dev/Frontend");
    stringAddresses.push("Programming/Web-Dev/Backend");
    stringAddresses.push("Programming/Web-Dev/Fullstack");
    stringAddresses.push("Programming/Java");
    stringAddresses.push("Programming/JavaScript");
    stringAddresses.push("Programming/JavaScript/TypeScript");
    stringAddresses.push("Programming/C#");
    stringAddresses.push("Programming/C++");
    stringAddresses.push("Programming/C");
    stringAddresses.push("Programming/Python");
    stringAddresses.push("Programming/Rust");
    stringAddresses.push("Programming/PHP");
    // GameDev Section.
    stringAddresses.push("Game-Dev");
    stringAddresses.push("Game-Dev/Game Design");
    stringAddresses.push("Game-Dev/Game Development");
    stringAddresses.push("Game-Dev/Game Testing");
    stringAddresses.push("Game-Dev/Godot");
    stringAddresses.push("Game-Dev/Unity");
    stringAddresses.push("Game-Dev/Monogame");
    stringAddresses.push("Game-Dev/Unreal Engine");
    // Esports section.
    stringAddresses.push("Esports");
    stringAddresses.push("Esports/PlayVS");
    // Music section.
    stringAddresses.push("Music");
    stringAddresses.push("Music/Music Performance");
    stringAddresses.push("Music/Music Performance/Band");
    stringAddresses.push("Music/Music Performance/Orchestra");
    stringAddresses.push("Music/Music Performance/Ensemble");
    stringAddresses.push("Music/Music Performance/Soloist");
    stringAddresses.push("Music/Music Composition");
    // misc or generic Experience section.
    stringAddresses.push("Experience");
    stringAddresses.push("Experience/Job Experience");
    stringAddresses.push("Experience/Leadership");
    stringAddresses.push("Experience/Competition");
    stringAddresses.push("Experience/Competition/UIL");
    // RIT section.
    stringAddresses.push("RIT");
    stringAddresses.push("RIT/CSH");
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
            const skill = stringAddresses[i].split("/");
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
            let skill = stringAddresses[i].split("/");
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
    let address = []
    for (let i = 0; i < stringAddresses.length; i++)
    {
        address = stringAddresses[i].split("/");
        if (address[address.length-1] == skillName)
        {
            return address;
        }
    }
    return address;
}