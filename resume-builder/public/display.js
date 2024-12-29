/// === Setup === Setup === Setup === Setup === Setup === Setup === Setup === Setup === Setup ===
const parent = document.getElementById("displayResume");
const displaySection = document.createElement("div");
const resumeSection = document.createElement("div");
const skillsSection = document.createElement("div");
displaySection.setAttribute("id","display-grid");
resumeSection.setAttribute("id","theResume");
skillsSection.setAttribute("id","theSkills");
parent.appendChild(displaySection);
displaySection.appendChild(resumeSection);
displaySection.appendChild(skillsSection);

// Testing.
const p = document.createElement("p");
const q = document.createElement("p");
p.textContent = "resume section.";
q.textContent = "skills section.";
resumeSection.appendChild(p);
skillsSection.appendChild(q);

let DecodedResumeElements = [];