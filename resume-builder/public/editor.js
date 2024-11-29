
const app = document.getElementById("app");

const grid = document.createElement("div");
const resume = document.createElement("div");
const addElements = document.createElement("div");
const tweakElements = document.createElement("div");
const spacer = document.createElement("div");

const p = document.createElement("p");
const q = document.createElement("p");
const r = document.createElement("p");

grid.classList.add('test-grid');
addElements.classList.add('addElements');
resume.classList.add('resume');
tweakElements.classList.add('tweakElements');

p.textContent = "Add elements column";
q.textContent = "Resume column";
r.textContent = "Change elements column";
// 4. Append the p element to the div element
grid.appendChild(spacer);    
grid.appendChild(resume);    
grid.appendChild(tweakElements);   
addElements.appendChild(p); 
resume.appendChild(q);
tweakElements.appendChild(r);
app?.appendChild(grid);
app?.appendChild(addElements);