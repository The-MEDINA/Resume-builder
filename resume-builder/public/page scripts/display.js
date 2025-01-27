import { ImageSetup } from "/ImageHandler.js";

/// === Setup === Setup === Setup === Setup === Setup === Setup === Setup === Setup === Setup ===
const parent = document.getElementById("displayResume");
const displaySection = document.createElement("div");
const resumeSection = document.createElement("div");
const skillsSection = document.createElement("div");
displaySection.setAttribute("id","display-grid");
resumeSection.setAttribute("id","theResume");
skillsSection.setAttribute("id","theSkills");
skillsSection.classList.add("skillSideColumn");
parent.appendChild(displaySection);
displaySection.appendChild(resumeSection);
displaySection.appendChild(skillsSection);

// Testing.
//const p = document.createElement("p");
const q = document.createElement("p");
//p.textContent = "resume section.";
q.textContent = "SKILLS";
//resumeSection.appendChild(p);
skillsSection.appendChild(q);

DisplayResumeCookies();

// Print button.
const topNav = document.getElementsByClassName("topnav");
const printButton = document.createElement("button");
printButton.textContent = "|Print Resume|"
printButton.addEventListener('click', function() {PrintResume()});
topNav[0].appendChild(printButton);

// === Functions === Functions === Functions === Functions === Functions === Functions === Functions === Functions ===
function DisplayResumeCookies()
{
    const listOfCookies = decodeURIComponent(document.cookie).split(";");
    let savedSkills = [];
    // sets the resume elements.
    for (let i = 0; i < listOfCookies.length; i++)
    {
        if (listOfCookies[i].indexOf("Index") == 0 || listOfCookies[i].indexOf("Index") == 1)
        {
            let rawCookie = listOfCookies[i].split("="); 
            let intIndex = +(rawCookie[0].substring(rawCookie[0].indexOf("Index")+5));
            let rawData = rawCookie[1].split("`");

            // Decoding titles here.
            if (rawData[0] == "Title")
            {
                let titleData = rawData[1].split("ඞ");
                let titleContent = titleData[1];
                CreateDisplayTitle(titleContent);
            }

            // Decoding dividers here.
            if (rawData[0] == "Divider")
            {
                let dividerData = rawData[1].split("ඞ");
                let dividerContent = dividerData[1];
                CreateDisplayDivider(dividerContent);
            }

            // Decoding elements here (uh oh)
            if (rawData[0] == "Element")
            {
                let headerText = "";
                let dateText = "";
                let descText = "";
                let elementSkills = [];
                for (let j = 1; j < rawData.length; j++)
                {
                    let elementData = rawData[j].split("ඞ");
                    if (elementData[0] == "HeaderDiv")
                    {
                        headerText = elementData[1];
                    }
                    if (elementData[0] == "DateDiv")
                    {
                        dateText = elementData[1];
                    }
                    if (elementData[0] == "DescDiv")
                    {
                        descText = elementData[1];
                    }
                    if (elementData[0] == "skills")
                    {
                        if (elementData[1] != "")
                        {
                            elementSkills = elementData[1].split("/");
                        }
                    }
                }
                CreateDisplayElement(headerText, dateText, descText, intIndex);
                for (let j = 0; j < elementSkills.length; j++)
                {
                    CreateDisplaySkillTag(elementSkills[j], intIndex);
                }
            }
        }
            // Decoding the skills column.
            if (listOfCookies[i].indexOf("SklIdx") == 0 || listOfCookies[i].indexOf("SklIdx") == 1)
            {
                let skillData = listOfCookies[i].split("=");
                CreateDisplaySkill(skillData[1]);
            }
        }
}
function CreateDisplayTitle(titleText)
{
    const titleParent = document.createElement("div");
    const titleDiv = document.createElement("div");
    const title = document.createElement("p");
    titleParent.classList.add('Title');
    titleDiv.classList.add("TitleDiv");
    title.setAttribute("id","title");
    title.textContent = titleText;
    titleDiv.appendChild(title);
    titleParent.appendChild(titleDiv);
    resumeSection.appendChild(titleParent);
}

function CreateDisplayDivider(dividerText)
{
    const dividerParent = document.createElement("div");
    const dividerDiv = document.createElement("div");
    const divider = document.createElement("p");
    dividerParent.classList.add('Divider');
    dividerDiv.classList.add("DividerDiv");
    divider.setAttribute("id","divider");
    divider.textContent = dividerText;
    dividerDiv.appendChild(divider);
    dividerParent.appendChild(dividerDiv);
    resumeSection.appendChild(dividerParent);
}

function CreateDisplayElement(headerText, dateText, descText, index)
{
    const elementDiv = document.createElement("div");
    elementDiv.classList.add("Element");
    if (headerText != "")
    {
        const headerDiv = document.createElement("div");
        const header = document.createElement("p");
        headerDiv.classList.add("HeaderDiv");
        header.setAttribute("id","elementHeader");
        header.textContent = headerText;
        headerDiv.appendChild(header);
        elementDiv.appendChild(headerDiv);
    }
    if (dateText != "")
    {
        const dateDiv = document.createElement("div");
        const date = document.createElement("p");
        dateDiv.classList.add("DateDiv");
        date.setAttribute("id","elementDate");
        date.textContent = dateText;
        dateDiv.appendChild(date);
        elementDiv.appendChild(dateDiv);
    }
    if (descText != "")
    {
        const descDiv = document.createElement("div");
        const desc = document.createElement("p");
        descDiv.classList.add("DescDiv");
        desc.setAttribute("id","elementDesc");
        desc.textContent = descText;
        descDiv.appendChild(desc);
        elementDiv.appendChild(descDiv);
    }
    const skillsDiv = document.createElement("div");
    skillsDiv.classList.add("skills");
    skillsDiv.setAttribute("Index", index);
    elementDiv.appendChild(skillsDiv);
    resumeSection.appendChild(elementDiv);
}

function CreateDisplaySkillTag(skillName, index)
{
    const divToAddSkills = document.querySelector("[index=\"" + index + "\"]");
    const finalSkillDiv = document.createElement("div");
    finalSkillDiv.classList.add("finishedSkill");
    const finalSkill = document.createElement("p");
    finalSkill.textContent = skillName;
    const image = document.createElement("img");
    ImageSetup(image, skillName);
    finalSkillDiv.appendChild(image);
    finalSkillDiv.appendChild(finalSkill);
    finalSkill.classList.add("skillText");
    image.classList.add("skillImage");
    divToAddSkills.appendChild(finalSkillDiv);
}

function CreateDisplaySkill(skillName)
{
    const columnDiv = document.createElement("div");
    columnDiv.setAttribute("id","showSkill");
    columnDiv.classList.add("skillColumn");
    //const image = document.createElement("img");
    //ImageSetup(image, skillName);
    const skillText = document.createElement("p");
    skillText.classList.add("skillText");
    skillText.textContent = skillName;
    //image.classList.add("skillImage");
    //columnDiv.appendChild(image);
    columnDiv.appendChild(skillText);
    skillsSection.appendChild(columnDiv);
}

function PrintResume()
{
    const topNav = document.getElementsByClassName("topnav");
    const content = document.getElementsByClassName("content");
    content[0].classList.remove("content");
    topNav[0].remove();
    print();
}

//TODO: Add padding-top to the skill side column instead of just padding. Then bring back the images.
// (Or something like that idk it's been a while)