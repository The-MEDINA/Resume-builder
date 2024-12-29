import Script from "next/script";
export default function Display() {
    return (
      <div>
        <div className="topnav">
        <a>Resume Maker</a>
    </div>
    <div className="content">
      <div id="displayResume">
        <Script type="module" src="display.js"/>
      </div>
    </div>
      </div>
    );
  }
  