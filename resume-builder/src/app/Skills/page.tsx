'use client'
import Script from "next/script";
import dynamic from "next/dynamic";
import { GetSavedSkillList } from "../../../public/HelperScripts/skillTags";
export default function Skills() {
    return (
      <div>
        <div className="topnav">
          <a>Resume Maker</a>
      </div>
    <div className="content">
        <div>{Test()}</div>
      </div>
    </div>
    );
  } 

/// Functions
function Test(): String
{
  GetSavedSkillList();
  return "Test OK";
}

/// So... ImageHandler won't play nice with this file for whatever reason. Somehow it manages to break everything.
// I keep getting an error "saying server relative imports are not implemented yet", so it seems like it's not my fault this time.
// (Shocking)
// So... I think I need to copy-paste any functions that I need to grab. (that or rewrite them in some other way)
// This is.. gonna be a lot harder than I thought.