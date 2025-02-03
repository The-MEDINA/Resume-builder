'use client'
import { Skill } from "@/app/Skills/page";

//let skillAddresses = DefaultAddresses();
export async function ImageSetup(image: any, skill: Skill)
{
    let skillAddress: string[] = skill.address.split("/");
    let src = "img/Generic.png";
    let srcPrevious = "img/Generic.png";
    let final = null;
    for (let i = 0; i < skillAddress.length; i++)
    {
        src = ("img/" + ImageExceptions(skillAddress[i]) + ".png");
        final = new Image();
        final.src = src;
        await final.decode()
        .then(() => { srcPrevious = src } )
        .catch(() => { src = srcPrevious } )
    }
    image.src = src;
}

// I don't know why C#.png doesn't work, or why switch/case doesn't either...
// That's the only reason for this method's existence.
// just making it a method if anything else like this shows up.
function ImageExceptions(skillImgName: string)
{
    if (skillImgName == "C#") skillImgName = "C sharp";
    return skillImgName;
}