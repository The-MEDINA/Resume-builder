/* 
Every skill is sorted into a list, and is formatted similarly to how directories work.
simply add a skill by appending a string to the list.
to add a subskill, add its parent skill before the subskill, but separate it with a "|".
*/
let stringAddresses = [];
console.log(stringAddresses);

/* Functions */
// Test function. 
export function Test()
{
    console.log("skillTags.js OK")
}

export function Setup()
{
    const d = new Date();
    d.setTime(d.getTime() *1.01);
    let expires = "expires="+ d.toUTCString();
    document.cookie = "SkillTags=" + "temporary" + "; " + expires;
}
export function DefaultList()
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
    //GameDev Section.
    stringAddresses.push("Game-Dev");
    stringAddresses.push("Game-Dev|Game Design");
    stringAddresses.push("Game-Dev|Game Development");
    stringAddresses.push("Game-Dev|Game Testing");
    //Music section.
    stringAddresses.push("Music");
    stringAddresses.push("Music|Music Performance");
    stringAddresses.push("Music|Music Performance|Band");
    stringAddresses.push("Music|Music Performance|Orchestra");
    stringAddresses.push("Music|Music Performance|Ensemble");
    stringAddresses.push("Music|Music Performance|Soloist");
    stringAddresses.push("Music|Music Composition");
}
export function DefaultAddresses()
{
    return stringAddresses;
}

// ok ok, go through the list, find all skills that don't have a subskill anymore, put that into a list and return it
// something like that
export function SpecifySkills(skillName)
{
    //console.log("SpecifySkills OK")
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
/* DEFAULT SKILLS LIST */
/*PROGRAMMING
{
    WEB-DEV
    {
        FRONTEND, BACKEND, FULLSTACK
    }
    JS
    JAVA
    C#
    C++
    C
    PYTHON
    RUST
    PHP
}*/
/*GAME-DEV  
{
    GAME DESIGN
    GAME DEVELOPMENT
    GAME TESTING
}*/
/*MUSIC
{
    MUSIC PERFORMANCE
    {
        BAND
        ORCHESTRA
        ENSEMBLE
        SOLOIST
    }
    MUSIC COMPOSITION
}*/
/* DefaultList() should create a cookie with skilltags organized this way by default. */