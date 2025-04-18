'use client'
import { Skill } from "@/app/Skills/page";
import {useEffect} from "react";
import { GetSavedSkillList, ArrayToSkillType } from "../../../public/HelperScripts/skillTags";
import { DisplayResume, SkillDropDownMenu, DeleteTemporary, EditText, RemoveFromSkillsBox, LoadExistingResumeCookie, resume, Setup } from "../../../public/HelperScripts/Editor";
import { SkillsBox, Skills, Title, Subtitle, DateText, Description, ResumeElement, Divider, Group } from "../../../public/HelperScripts/Elements";
import Link from "next/link";

export const runtime = 'edge';

//const isClient = () => typeof window !== 'undefined';

let listOfSkills: Skill[] = ArrayToSkillType(GetSavedSkillList());
export default function ReaactEditor() {
    /*useEffect(() => {
      if (isClient()){
        Setup();
      }
    }, []);*/
  return (
    <div>
<div className="topnav">
        <a>Resume Maker</a>
        <button id="save">|Save in browser|</button>
        <Link href="/Present">|Present|</Link>
        <Link href="/Skills">|edit skills|</Link>
    </div>
    <div className="content">
      <div id="app" className="editor-grid">
        <div id="addElements">
          <p>add</p>
          <button id="addRawSubtitle" onClick={() => console.log("subtitle")}>|add subtitle|</button>
          <button id="addDivider" onClick={() => console.log("divider")}>|add divider|</button>
          <button id="addRawDateText" onClick={() => console.log("dateText")}>|add DateText|</button>
          <button id="addRawDesc" onClick={() => console.log("description")}>|add description|</button>
          <button id="addRawTitle" onClick={() => console.log("title")}>|add title|</button>
          <button id="addSkillsBox" onClick={() => console.log("skillsBox")}>|add skills box|</button>
          <button id="addExperience" onClick={() => console.log("experience")}>|add experience|</button>
          <button id="addGroup" onClick={() => console.log("group")}>|add group box|</button>
        </div>
        <div id="Resume"></div>
        <div id="editElements">
        <p>edit</p>
        </div>
        <div id="editSkills">
        <p>skills and options n stuff.</p>
        </div>
      </div>
    </div>
    </div>
  );
}
