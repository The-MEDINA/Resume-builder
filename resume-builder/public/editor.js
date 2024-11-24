// 1. Select the div element using the id property
const app = document.getElementById("app");
// 2. Create a new <p></p> element programmatically
const p = document.createElement("p");
const q = document.createElement("p");
// 3. Add the text content
p.textContent = "text element from editor.js here";
q.textContent = "can I add another?";
// 4. Append the p element to the div element
app?.appendChild(p);
app?.appendChild(q);