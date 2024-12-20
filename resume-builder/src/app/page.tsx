import Image from "next/image";
import Script from "next/script";
export default function Home() {
  return (
    <div>
    <div className="topnav">
        <a>it was so easy to bring this over</a>
    </div>
    <div className="content">
      <div id="app">
        <Script type="module" src="editor.js"/>
      </div>
    </div>
    </div>
  );
}
