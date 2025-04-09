'use client'
import { useEffect } from "react";
import { SkillsBox, Skills, Title, Subtitle, DateText, Description, Divider, Group } from "../../../public/HelperScripts/Elements";
//import { FilterBySkills } from "../../../public/HelperScripts/Present";

//import dynamic from 'next/dynamic';

export const runtime = 'edge';

const isClient = () => typeof window !== 'undefined';

/*
import type { AppProps } from "next/app";

let resolved = false;
const App = ({ Component, pageProps }: AppProps) => {
  return NewDisplay();
};

export default dynamic(() => Promise.resolve(App), {
  ssr: false,
});
*/
let presentResume: any = [];
let searchBySkills: any = [];

export default function NewDisplay() {
    console.log("newDisplay")
    useEffect(() => {
      if (isClient()){
        document.getElementById("print")?.addEventListener('click', function() {PrintResume()});
        LoadExistingResumeCookie();
        PresentResume();
      }
    }, []);
    return (
      <div>
  <div className="topnav">
          <a>Resume Maker</a>
          <button id="print"> |print|</button>
      </div>
      <div className="content">
          <div id="app"></div>
      </div>
      </div>
    );
}


// does the same thing as the function on the editor side.
// I should.. make it return something instead of copy-pasting it.
// I'll do it later (never)
function LoadExistingResumeCookie()
{
  const listOfCookies = decodeURIComponent(document.cookie).split(";");
  for (let i = 0; i < listOfCookies.length; i++)
  {
    if (listOfCookies[i].indexOf("element") == 0 || listOfCookies[i].indexOf("element") == 1)
    {
      let intermediate = listOfCookies[i].split("=");
      let generic: any = JSON.parse(intermediate[1]);
      switch (generic.type)
      {
        case ("Title"): 
        {
          let cookieObj = new Title(generic.index);
          cookieObj.text = generic.text;
          cookieObj.cssOptions = generic.cssOptions;
          presentResume.push(cookieObj);
          break;
        }
        case ("Subtitle"):         
        {
          let cookieObj = new Subtitle(generic.index);
          cookieObj.text = generic.text;
          cookieObj.cssOptions = generic.cssOptions;
          presentResume.push(cookieObj);
          break;
        }
        case ("DateText"):         
        {
          let cookieObj = new DateText(generic.index);
          cookieObj.text = generic.text;
          cookieObj.cssOptions = generic.cssOptions;
          presentResume.push(cookieObj);
          break;
        }
        case ("Description"):         
        {
          let cookieObj = new Description(generic.index);
          cookieObj.text = generic.text;
          cookieObj.cssOptions = generic.cssOptions;
          presentResume.push(cookieObj);
          break;
        }
        case ("Divider"):         
        {
          let dividerObj = new Divider(generic.index);
          dividerObj.text = generic.text;
          dividerObj.cssOptions = generic.cssOptions;
          presentResume.push(dividerObj);
          break;
        }
        case ("SkillsBox"):         
        {
          let cookieObj = new SkillsBox(generic.index);
          cookieObj.text = generic.text;
          cookieObj.cssOptions = generic.cssOptions;
          let skillsArray: Skills[] = [];
          for (let j = 0; j < generic.skills.length; j++)
          {
            let skill: Skills = new Skills(generic.skills[j].name);
            skillsArray.push(skill);
          }
          cookieObj.skills = skillsArray;
          presentResume.push(cookieObj);
          break;
        }
        case ("Group"):         
                {
                  let groupObj = new Group(generic.index);
                  for (let i = 0; i < generic.elements.length; i++)
                  {
                    // Yeah, uhh.. this is basically just the method copy pasted again.
                    // I REALLY need to clean this up and move it to another method later.
                    switch (generic.elements[i].type)
                    {
                      case("Title"):
                      {
                        let cookieObj = new Title(generic.elements[i].index);
                        cookieObj.text = generic.elements[i].text;
                        cookieObj.cssOptions = generic.elements[i].cssOptions;
                        groupObj.elements.push(cookieObj);
                        break;
                      }
                      case("Subtitle"):
                      {
                        let cookieObj = new Subtitle(generic.elements[i].index);
                        cookieObj.text = generic.elements[i].text;
                        cookieObj.cssOptions = generic.elements[i].cssOptions;
                        groupObj.elements.push(cookieObj);
                        break;
                      }
                      case("DateText"):
                      {
                        let cookieObj = new DateText(generic.elements[i].index);
                        cookieObj.text = generic.elements[i].text;
                        cookieObj.cssOptions = generic.elements[i].cssOptions;
                        groupObj.elements.push(cookieObj);
                        break;
                      }
                      case("Description"):
                      {
                        let cookieObj = new Description(generic.elements[i].index);
                        cookieObj.text = generic.elements[i].text;
                        cookieObj.cssOptions = generic.elements[i].cssOptions;
                        groupObj.elements.push(cookieObj);
                        break;
                      }
                      case("Divider"):
                      {
                        let cookieObj = new Divider(generic.elements[i].index);
                        cookieObj.text = generic.elements[i].text;
                        cookieObj.cssOptions = generic.elements[i].cssOptions;
                        groupObj.elements.push(cookieObj);
                        break;
                      }
                      case ("SkillsBox"):         
                      {
                        let cookieObj = new SkillsBox(generic.elements[i].index);
                        cookieObj.text = generic.elements[i].text;
                        cookieObj.cssOptions = generic.elements[i].cssOptions;
                        let skillsArray: Skills[] = [];
                        for (let j = 0; j < generic.elements[i].skills.length; j++)
                        {
                          let skill: Skills = new Skills(generic.elements[i].skills[j].name);
                          skillsArray.push(skill);
                        }
                        cookieObj.skills = skillsArray;
                        groupObj.elements.push(cookieObj);
                        break;
                      }
                    }
                  }
                  presentResume.push(groupObj);
                  break;
                }
        default: { throw new Error("Could not find a matching object for " + generic.type); }
      }
    }
  }
}

// brings up a printing dialog for the resume.
function PrintResume()
{
    document.getElementsByClassName("topnav")[0].remove();
    const content = document.getElementsByClassName("content");
    content[0].classList.remove("content");
    print();
}

function PresentResume()
{
  for (let i = 0; i < presentResume.length; i++)
  {
    if (presentResume[i].type == "SkillsBox")
    {
      document.getElementById("app")?.appendChild(presentResume[i].ConvertToHTMLForPresentPage());
    }
    else
    {
      let element;
      if (presentResume[i].type == "Group")
      {
        let groupDiv = document.createElement("div");
        for (let j = 0; j < presentResume[i].elements.length; j++)
        {
          // change this later to not be so nasty oml
          // (condense some of these if/else statements jeez)
          // this is some HIDEOUS programming tbh... but I mean, it gets the job done.
          if (presentResume[i].elements[j].type == "SkillsBox")
          {
            element = groupDiv.appendChild(presentResume[i].elements[j].ConvertToHTMLForPresentPage());
          }
          else
          {
            element = groupDiv.appendChild(presentResume[i].elements[j].ConvertToHTML());
          }
          document.getElementById("app")?.appendChild(groupDiv);
          element.animate([{paddingTop:"10px", opacity:0},{paddingTop:"0px", opacity:1}],{duration: 500, easing: "ease-out"});
        }
      }
      else
      {
        element = document.getElementById("app")?.appendChild(presentResume[i].ConvertToHTML());
        element.animate([{paddingTop:"10px", opacity:0},{paddingTop:"0px", opacity:1}],{duration: 500, easing: "ease-out"});
      }
      // so for animating you might wanna reference these links:
      // https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Using_the_Web_Animations_API
      // https://stackoverflow.com/questions/18481550/how-to-dynamically-create-keyframe-css-animations
    }
  }
}

/*
import {useState} from "react";

function Resume() {
  const [resumeElements, setResumeElements] = useState<string[]>([]);


  return (
    <div>
      <div className="controls">
        <button onClick={() => {
          setResumeElements((elements) => {
            const newElement = "hello!";
            return elements.concat([newElement]);
          })
        }}>Add an element that says hello</button>
      </div>
    <div className="resume-page">
        {resumeElements.map((resumeElement, i) => (
          <ResumeElement element={resumeElement} key={i} />
        ))}
    </div>
    </div>
  )
}

function ResumeElement({element}: {element: string}) {
  return (
    <p>This is an element! The message I have is: {element}</p>
  )
}
*/