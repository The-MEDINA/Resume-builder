import { DefaultList, DefaultAddresses } from "/skillTags.js";

let path = [];
let listOfSkills = DefaultList();
let skillAddresses = DefaultAddresses();
//console.log(skillAddresses);
//ImageSelect("Frontend")
export function ImageSelect(skillName)
{
    let skillAddress = [];
    for (let i = 0; i < skillAddresses.length; i++)
    {
        if (skillAddresses[i].includes(skillName) && !(skillAddresses[i].includes(skillName + "|")))
        {
            let potentialMatch = skillAddresses[i].split("|");
            if (potentialMatch[potentialMatch.length-1].length == skillName.length)
            {
                skillAddress = potentialMatch
                //console.log(skillAddress);
            }
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