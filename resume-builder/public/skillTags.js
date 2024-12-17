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
*/
let skillTags = [];

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
    skillTags[0][1].push(["Web-Dev", new Array]);
    skillTags[0][1][0][1].push(["Frontend"]);
    skillTags[0][1][0][1].push(["Backend"]);
    skillTags[0][1][0][1].push(["Fullstack"]);
    skillTags[0][1].push(["Java"]);
    skillTags[0][1].push(["JavaScript"]);
    skillTags[0][1].push(["C#"]);
    skillTags[0][1].push(["C++"]);
    skillTags[0][1].push(["C"]);
    skillTags[0][1].push(["Python"]);
    skillTags[0][1].push(["Rust"]);
    //GameDev Section.
    skillTags.push(["Game-Dev", new Array]);
    skillTags[1][1].push(["Game Design"]);
    skillTags[1][1].push(["Game Development"]);
    skillTags[1][1].push(["Game Testing"]);
    //Music section.
    skillTags.push(["Music", new Array]);
    skillTags[2][1].push(["Music Performance", new Array]);
    skillTags[2][1][0][1].push(["Band"]);
    skillTags[2][1][0][1].push(["Orchestra"]);
    skillTags[2][1][0][1].push(["Ensemble"]);
    skillTags[2][1][0][1].push(["Soloist"]);
    skillTags[2][1].push(["Music Composition"]);

    //Noskill. (remove this and patch the code later)
    //skillTags.push(["Return", new Array]);


    // Log it for testing.
    //console.log(skillTags);
    return skillTags;
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