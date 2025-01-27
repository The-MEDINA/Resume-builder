import { DefaultAddresses } from "/skillTags.js";

let skillAddresses = DefaultAddresses();

export async function ImageSetup(img, skillName)
{
    let skillAddress = [];
    for (let i = 0; i < skillAddresses.length; i++)
    {
        if (skillAddresses[i].includes(skillName) && !(skillAddresses[i].includes(skillName + "/")))
        {
            let potentialMatch = skillAddresses[i].split("/");
            if (potentialMatch[potentialMatch.length-1].length == skillName.length)
            {
                potentialMatch[potentialMatch.length-1] = ImageExceptions(potentialMatch[potentialMatch.length-1]);
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
        src = ("img/" + skillAddress[i] + ".png");
        final = new Image();
        final.src = src;
        await final.decode()
        .then(() => { srcPrevious = src } )
        .catch(() => { src = srcPrevious } )
    }
    img.src = src;
}

// I don't know why C#.png doesn't work, or why switch/case doesn't either...
// That's the only reason for this method's existence.
// just making it a method if anything else like this shows up.
function ImageExceptions(src)
{
    if (src == "C#") src = "C sharp";
    return src;
}