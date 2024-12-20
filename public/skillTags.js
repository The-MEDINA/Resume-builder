/* 
So... Every skill is sorted through lists.
The most general skills are at the top, and the more specific skills follow.
The actual way this is sorted is... nasty.
skillTags contains every skill. All skills except for the most specific ones are stored in the array..
with a string AND an array to hold a more specific element. Ex:
skillTags = ["Programming", an Array.]
an array = ["Web-Dev", another Array. ]
another array = ["Frontend"]
yeah, pretty bad.
But the user is also supposed to be able to move these skills around and add new ones as they please.
Just to allow for custom sorting of skills for the resume.

currently making an array of skills that look like folders instead.
*/
let skillTags = [];
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
    skillTags = []; 
    // Programming section.
    skillTags.push(["Programming", new Array]);
    stringAddresses.push("Programming");
    skillTags[0][1].push(["Web-Dev", new Array]);
    stringAddresses.push("Programming|Web-Dev");
    skillTags[0][1][0][1].push(["Frontend"]);
    stringAddresses.push("Programming|Web-Dev|Frontend");
    skillTags[0][1][0][1].push(["Backend"]);
    stringAddresses.push("Programming|Web-Dev|Backend");
    skillTags[0][1][0][1].push(["Fullstack"]);
    stringAddresses.push("Programming|Web-Dev|Fullstack");
    skillTags[0][1].push(["Java"]);
    stringAddresses.push("Programming|Java");
    skillTags[0][1].push(["JavaScript"]);
    stringAddresses.push("Programming|JavaScript");
    skillTags[0][1].push(["C#"]);
    stringAddresses.push("Programming|C#");
    skillTags[0][1].push(["C++"]);
    stringAddresses.push("Programming|C++");
    skillTags[0][1].push(["C"]);
    stringAddresses.push("Programming|C");
    skillTags[0][1].push(["Python"]);
    stringAddresses.push("Programming|Python");
    skillTags[0][1].push(["Rust"]);
    stringAddresses.push("Programming|Rust");
    //GameDev Section.
    skillTags.push(["Game-Dev", new Array]);
    stringAddresses.push("Game-Dev");
    skillTags[1][1].push(["Game Design"]);
    stringAddresses.push("Game-Dev|Game Design");
    skillTags[1][1].push(["Game Development"]);
    stringAddresses.push("Game-Dev|Game Development");
    skillTags[1][1].push(["Game Testing"]);
    stringAddresses.push("Game-Dev|Game Testing");
    //Music section.
    skillTags.push(["Music", new Array]);
    stringAddresses.push("Music");
    skillTags[2][1].push(["Music Performance", new Array]);
    stringAddresses.push("Music|Music Performance");
    skillTags[2][1][0][1].push(["Band"]);
    stringAddresses.push("Music|Music Performance|Band");
    skillTags[2][1][0][1].push(["Orchestra"]);
    stringAddresses.push("Music|Music Performance|Orchestra");
    skillTags[2][1][0][1].push(["Ensemble"]);
    stringAddresses.push("Music|Music Performance|Ensemble");
    skillTags[2][1][0][1].push(["Soloist"]);
    stringAddresses.push("Music|Music Performance|Soloist");
    skillTags[2][1].push(["Music Composition"]);
    stringAddresses.push("Music|Music Composition");
<<<<<<< HEAD:public/skillTags.js
    //Esports section.
    stringAddresses.push("Esports");
    stringAddresses.push("Esports|Esports Competition");
    stringAddresses.push("Esports|Tournament Organizing");
=======

>>>>>>> parent of 4bbb326 (I somehow managed to rewrite how the skills work LETS GOOOO):resume-builder/public/skillTags.js
    //Noskill. (remove this and patch the code later)
    //skillTags.push(["Return", new Array]);


    // Log it for testing.
    //console.log(skillTags);
    return skillTags;
}
export function DefaultAddresses()
{
    return stringAddresses;
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
/*ESPORTS
{
    ESPORTS COMPETITION
    TOURNAMENT ORGANIZING
}
*/
/* DefaultList() should create a cookie with skilltags organized this way by default. */