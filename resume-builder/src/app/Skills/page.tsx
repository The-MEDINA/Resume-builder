import Script from "next/script";
import Link from "next/link";
export default function Skills() {
    return (
      <div>
        <div className="topnav">
        <a>Resume Maker</a>
    </div>
    <div className="content">
      <div id="displayResume">
        <Script type="module" src="/page scripts/skills.js"/>
      </div>
    </div>
    </div>
    );
  }
  