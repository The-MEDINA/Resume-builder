'use client'
import { Skill } from "@/app/Skills/page";
import { GetSavedSkillList, ArrayToSkillType } from "../../../public/HelperScripts/skillTags";
import { Setup2, Editor } from "../../../public/HelperScripts/Editor";
import { SkillsBox, Skills, Title, Subtitle, DateText, Description, ResumeElement, Divider, Group } from "../../../public/HelperScripts/Elements";
import Link from "next/link";

//export const runtime = 'edge';

//const isClient = () => typeof window !== 'undefined';

let listOfSkills: Skill[] = ArrayToSkillType(GetSavedSkillList());
export default function ReactEditor() {
  Setup2();
  return (
    <div>
      <div className="topnav">
        <a>Resu-Me</a>
        <button id="save">|Save in browser|</button>
        <Link href="/Present">|Present|</Link>
        <Link href="/Skills">|edit skills|</Link>
      </div>
      <div className="content">
        <Editor />
      </div>
    </div>
  );
}