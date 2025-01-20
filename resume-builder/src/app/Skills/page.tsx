import Script from "next/script";
//import Link from "next/link";
//import SkillsPage from 'next/dist/client/components/SkillsPage';
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
export function Test(): String
{
  return "Test OK";
}