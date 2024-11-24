// 1. Select the div element using the id property
const app = document.getElementById("app");
// 2. Create a new <p></p> element programmatically
const p = document.createElement("p");
const q = document.createElement("p");
const grid = document.createElement("div");

// testing??
grid.classList.add('test-grid');
// it worked :>

// 3. Add the text content
p.textContent = "text element from editor.js here";
q.textContent = "can I add another?";
// 4. Append the p element to the div element
grid.appendChild(p);
grid.appendChild(q);
app?.appendChild(grid);