import { DefaultList, DefaultAddresses } from "/skillTags.js";

let path = [];
let listOfSkills = DefaultList();
let skillAddresses = DefaultAddresses();
//console.log(skillAddresses);
//ImageSelect("Frontend")
export function ImageSelect(skillName)
{
    let skillAddress = [];
    // so for some reason, skillAddresses doubles in length here??? what
    // so the length/2 is just a quick fix until I find the culprit (cause I'm so lost on why it's happening)
    for (let i = 0; i < skillAddresses.length/2; i++)
    {
        if (skillAddresses[i].includes(skillName) && !(skillAddresses[i].includes(skillName + "|")))
        {
            skillAddress = skillAddresses[i].split("|");
            console.log(skillAddress);
        }
    }
    let src = "img/Generic.png";
    let srcPrevious = "img/Generic.png";
    let final = null;
    for (let i = 0; i < skillAddress.length; i++)
    {
        final = document.createElement("img");
        src = ("img/" + skillAddress[i] + ".png");
        final.src = src;
        if (final.width == 0)
        {
            src = srcPrevious
        }
        else
        {
            srcPrevious = src
        }
    }
    final.src = src;
    return final;   
}
/*
function SetImage(src, srcPrevious)
{
    srcPrevious = src;
    final.src = src
}

function RevertImage(src, srcPrevious)
{
    src = srcPrevious
    final.src = src;
}
*/