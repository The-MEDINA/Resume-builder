import Script from "next/script";
import Link from "next/link";
export default function Home() {
  return (
    <div>
<div className="topnav">
        <a>Resume Maker</a>
        <Link href="/Display">|Display resume|</Link>
        <Link href="/Skills">|Edit skills|</Link>
        <Link href="/NewEditor">|new editor|</Link>
    </div>
    <div className="content">
      <div id="app">
        <Script type="module" src="/page scripts/editor.js"/>
      </div>
    </div>
    </div>
  );
}