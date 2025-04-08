module.exports = {

"[externals]/next/dist/compiled/next-server/app-page.runtime.dev.js [external] (next/dist/compiled/next-server/app-page.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
const mod = __turbopack_external_require__("next/dist/compiled/next-server/app-page.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page.runtime.dev.js"));

module.exports = mod;
}}),
"[project]/public/HelperScripts/skillTags.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "ArrayToSkillType": (()=>ArrayToSkillType),
    "DefaultSkillListString": (()=>DefaultSkillListString),
    "EncodeNewCookieFromSkills": (()=>EncodeNewCookieFromSkills),
    "GetAddressFromSkillName": (()=>GetAddressFromSkillName),
    "GetSavedSkillList": (()=>GetSavedSkillList),
    "GetSkillFromAddress": (()=>GetSkillFromAddress),
    "IsSubSkill": (()=>IsSubSkill),
    "SetParentSkill": (()=>SetParentSkill)
});
'use client';
function GetSavedSkillList() {
    let returnValue = [];
    // some if statement that checks if the cookie is the youngest.
    returnValue = DecodeSkillListCookie();
    // another if statement to check if the CSH account's saved list is the youngest 
    // (I hope and dream this will one day be implemented)
    return returnValue;
}
// Extension of GetSavedSkillList(). Returns the skill list in the cookie.
function DecodeSkillListCookie() {
    let cookieToDecode = "";
    let allSkills = [];
    const listOfCookies = decodeURIComponent(document.cookie).split(";");
    for(let i = 0; i < listOfCookies.length; i++){
        if (listOfCookies[i].indexOf("SkillTags") == 0 || listOfCookies[i].indexOf("SkillTags") == 1) {
            let intermediate = listOfCookies[i].split("=");
            cookieToDecode = intermediate[1];
        }
    }
    allSkills = cookieToDecode.split("`");
    // This prevents a bugged skill from spawning should the cookie have a "`" at the end.
    // I should... just make it so that this thing doesn't make an invalid cookie by default.
    // Checking for this does no harm though..
    if (allSkills[allSkills.length - 1] == "") {
        allSkills.splice(allSkills.length - 1, 1);
    }
    return allSkills;
}
function EncodeNewCookieFromSkills(stringAddresses) {
    const listOfCookies = decodeURIComponent(document.cookie).split(";");
    for(let i = 0; i < listOfCookies.length; i++){
        if (listOfCookies[i].indexOf("SkillTags") == 0) {
            listOfCookies[i] = "SkillTags=;expires=Thu, 01 Jan 1970 00:00:00 UTC;";
            break;
        }
    }
    let returnString = "";
    for(let i = 0; i < stringAddresses.length - 1; i++){
        returnString += stringAddresses[i].address + "`";
    }
    returnString += stringAddresses[stringAddresses.length - 1].address;
    /* Funny story, uhhh, this line above the comment? I forgot its purpose, deleted it, changed the for loop, and thought nothing of it.
  ...Then I tried to debug something that was untraceable for like an hour.
  Found the bug, and added a check for it in DecodeSkillListCookie.
  Looked back at skillTags.js... and it had the fix in there already.
  Maybe.. maybe I shouldn't be trusted with writing code. */ const d = new Date();
    d.setTime(d.getTime() + 1000 * 60 * 60 * 24 * 365);
    let expires = "expires=" + d.toUTCString();
    document.cookie = "SkillTags=" + returnString + "; " + expires;
}
function GetSkillFromAddress(address) {
    let skillAddress = address.split("/");
    return skillAddress[skillAddress.length - 1];
}
function GetAddressFromSkillName(name) {
    let skillsList = GetSavedSkillList();
    let returnString = name;
    for(let i = 0; i < skillsList.length; i++){
        let skillAddress = skillsList[i].split("/");
        if (skillAddress[skillAddress.length - 1] == name) {
            returnString = skillsList[i];
            break;
        }
    }
    return returnString;
}
function SetParentSkill(address) {
    let skillAddress = address.split("/");
    if (skillAddress.length <= 1) return "";
    else return skillAddress[skillAddress.length - 2];
}
function IsSubSkill(parentSkill, potentialChild) {
    let skillAddress = parentSkill.address.split("/");
    let potentialAddress = potentialChild.address.split("/");
    for(let i = 0; i < skillAddress.length; i++){
        if (skillAddress[i] != potentialAddress[i]) {
            return false;
        }
    }
    return true;
}
function DefaultSkillListString() {
    let stringAddresses = [];
    // Programming section.
    stringAddresses.push("Programming");
    stringAddresses.push("Programming/Web-Dev");
    stringAddresses.push("Programming/Web-Dev/Frontend");
    stringAddresses.push("Programming/Web-Dev/Backend");
    stringAddresses.push("Programming/Web-Dev/Fullstack");
    stringAddresses.push("Programming/Java");
    stringAddresses.push("Programming/JavaScript");
    stringAddresses.push("Programming/JavaScript/TypeScript");
    stringAddresses.push("Programming/C#");
    stringAddresses.push("Programming/C++");
    stringAddresses.push("Programming/C");
    stringAddresses.push("Programming/Python");
    stringAddresses.push("Programming/Rust");
    stringAddresses.push("Programming/PHP");
    // GameDev Section.
    stringAddresses.push("Game-Dev");
    stringAddresses.push("Game-Dev/Game Design");
    stringAddresses.push("Game-Dev/Game Development");
    stringAddresses.push("Game-Dev/Game Testing");
    stringAddresses.push("Game-Dev/Godot");
    stringAddresses.push("Game-Dev/Unity");
    stringAddresses.push("Game-Dev/Monogame");
    stringAddresses.push("Game-Dev/Unreal Engine");
    // Esports section.
    stringAddresses.push("Esports");
    stringAddresses.push("Esports/PlayVS");
    // Music section.
    stringAddresses.push("Music");
    stringAddresses.push("Music/Music Performance");
    stringAddresses.push("Music/Music Performance/Band");
    stringAddresses.push("Music/Music Performance/Orchestra");
    stringAddresses.push("Music/Music Performance/Ensemble");
    stringAddresses.push("Music/Music Performance/Soloist");
    stringAddresses.push("Music/Music Composition");
    // misc or generic Experience section.
    stringAddresses.push("Experience");
    stringAddresses.push("Experience/Job Experience");
    stringAddresses.push("Experience/Leadership");
    stringAddresses.push("Experience/Competition");
    stringAddresses.push("Experience/Competition/UIL");
    // RIT section.
    stringAddresses.push("RIT");
    stringAddresses.push("RIT/CSH");
    // Awards section.
    stringAddresses.push("Award");
    return stringAddresses;
}
function ArrayToSkillType(array) {
    let stringToSkills = [];
    for(let i = 0; i < array.length; i++){
        const newSkill = {
            name: GetSkillFromAddress(array[i]),
            address: array[i],
            parent: SetParentSkill(array[i])
        };
        stringToSkills.push(newSkill);
    }
    return stringToSkills;
}
}}),
"[project]/public/HelperScripts/ImageHandler.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "ImageSetup": (()=>ImageSetup),
    "ImageSetupFromRawAddress": (()=>ImageSetupFromRawAddress)
});
'use client';
async function ImageSetup(image, skill) {
    let skillAddress = skill.address.split("/");
    let src = "img/Generic.png";
    let srcPrevious = "img/Generic.png";
    let final = null;
    for(let i = 0; i < skillAddress.length; i++){
        src = "img/" + ImageExceptions(skillAddress[i]) + ".png";
        final = new Image();
        final.src = src;
        await final.decode().then(()=>{
            srcPrevious = src;
        }).catch(()=>{
            src = srcPrevious;
        });
    }
    image.src = src;
}
async function ImageSetupFromRawAddress(image, rawAddress) {
    let skillAddress = rawAddress.split("/");
    let src = "img/Generic.png";
    let srcPrevious = "img/Generic.png";
    let final = null;
    for(let i = 0; i < skillAddress.length; i++){
        src = "img/" + ImageExceptions(skillAddress[i]) + ".png";
        final = new Image();
        final.src = src;
        await final.decode().then(()=>{
            srcPrevious = src;
        }).catch(()=>{
            src = srcPrevious;
        });
    }
    image.src = src;
}
// I don't know why C#.png doesn't work, or why switch/case doesn't either...
// That's the only reason for this method's existence.
// just making it a method if anything else like this shows up.
function ImageExceptions(skillImgName) {
    if (skillImgName == "C#") skillImgName = "C sharp";
    return skillImgName;
}
}}),
"[project]/src/app/Skills/page.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>Skills)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$skillTags$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/public/HelperScripts/skillTags.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$ImageHandler$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/public/HelperScripts/ImageHandler.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
let skillList = [];
let holdOntoSkill;
let isSkillSelected = false;
let NewSkillInProgress = false;
function Skills() {
    document.onreadystatechange = function() {
        if (document.readyState == "complete") {
            skillList = (0, __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$skillTags$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ArrayToSkillType"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$skillTags$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GetSavedSkillList"])());
            DisplaySkills();
            document.getElementById("saveButton")?.addEventListener('click', function() {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$skillTags$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EncodeNewCookieFromSkills"])(skillList);
            });
            document.getElementById("resetButton")?.addEventListener('click', function() {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$skillTags$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EncodeNewCookieFromSkills"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$skillTags$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ArrayToSkillType"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$skillTags$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DefaultSkillListString"])()));
                DisplaySkills();
            });
            Message("");
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "topnav",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        children: "Resume Maker "
                    }, void 0, false, {
                        fileName: "[project]/src/app/Skills/page.tsx",
                        lineNumber: 22,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        id: "saveButton",
                        children: "|Save skills list|"
                    }, void 0, false, {
                        fileName: "[project]/src/app/Skills/page.tsx",
                        lineNumber: 23,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        id: "resetButton",
                        children: "|Reset skills in browser|"
                    }, void 0, false, {
                        fileName: "[project]/src/app/Skills/page.tsx",
                        lineNumber: 24,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/Skills/page.tsx",
                lineNumber: 21,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "content",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        id: "messagebox",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            id: "messageText"
                        }, void 0, false, {
                            fileName: "[project]/src/app/Skills/page.tsx",
                            lineNumber: 28,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/Skills/page.tsx",
                        lineNumber: 27,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        id: "skillsList"
                    }, void 0, false, {
                        fileName: "[project]/src/app/Skills/page.tsx",
                        lineNumber: 30,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/Skills/page.tsx",
                lineNumber: 26,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/Skills/page.tsx",
        lineNumber: 20,
        columnNumber: 7
    }, this);
}
/// Functions
// Display something on the top messagebox. If the message is empty, display a default message.
function Message(theMessage) {
    if (theMessage == "") {
        document.getElementById("messageText").textContent = "Click on a skill to move it.";
    } else {
        document.getElementById("messageText").textContent = theMessage;
    }
}
// Puts the skills on the webpage.
function DisplaySkills() {
    while(document.getElementById("skillsList")?.firstChild != null){
        document.getElementById("skillsList")?.firstChild?.remove();
    }
    for(let i = 0; i < skillList.length; i++){
        if (skillList[i].parent == "") {
            let SkillToAppend = SkilltoDiv(skillList[i]);
            document.getElementById("skillsList")?.appendChild(SkillToAppend);
            SkillToAppend.style.paddingTop = 10 + "px";
            DisplaySubSkills(skillList[i].name);
        }
    }
    let newSkillParent = document.createElement("div");
    let newSkill = document.createElement("button");
    let newSkillImg = document.createElement("img");
    newSkillImg.src = "img/Add.png";
    newSkill.classList.add("skillText");
    newSkillImg.classList.add("skillImage");
    newSkillParent.appendChild(newSkillImg);
    newSkillParent.appendChild(newSkill);
    newSkill.textContent = "Add new skill / Move to Generic";
    newSkill.addEventListener('click', function() {
        NewSkill();
    });
    newSkillParent.setAttribute("id", "newSkill");
    document.getElementById("skillsList")?.appendChild(newSkillParent);
}
async function DisplaySubSkills(parentName) {
    for(let i = 0; i < skillList.length; i++){
        if (skillList[i].parent == parentName) {
            let SkillToAppend = SkilltoDiv(skillList[i]);
            while(document.getElementById(skillList[i].parent) == null){
                throw new Error("Found null getElementById"); /* Had trouble with this thing getting null... 
        throwing an error seems to also fix it, should the issue ever come up.
        (It SHOULD be patched though)*/ 
            }
            document.getElementById(skillList[i].parent)?.appendChild(SkillToAppend);
            SkillToAppend.style.paddingLeft = 20 + "px";
            DisplaySubSkills(skillList[i].name);
        }
    }
}
// Converts a skill type to something that can be shown on the webpage.
function SkilltoDiv(skillToConvert) {
    let parent = document.createElement("div");
    parent.setAttribute("id", skillToConvert.name);
    let skillText = document.createElement("button");
    skillText.textContent = skillToConvert.name + ": " + skillToConvert.address;
    let skillImg = document.createElement("img");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$ImageHandler$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ImageSetup"])(skillImg, skillToConvert);
    skillText.classList.add("skillText");
    skillImg.classList.add("skillImage");
    parent.appendChild(skillImg);
    parent.appendChild(skillText);
    skillText.addEventListener('click', function() {
        MoveSkills(skillToConvert);
    });
    return parent;
}
// Moves skills around.
async function MoveSkills(skillToMove) {
    if (!isSkillSelected) {
        isSkillSelected = true;
        holdOntoSkill = skillToMove;
        {
            Message("Click on new skill, delete skill, or click on an existing skill to move the selected skill (" + skillToMove.name + ") to.");
            let trashSkillParent = document.createElement("div");
            let trashSkill = document.createElement("button");
            let trashSkillImg = document.createElement("img");
            trashSkillImg.src = "img/Trash.png";
            trashSkill.classList.add("skillText");
            trashSkillImg.classList.add("skillImage");
            trashSkillParent.appendChild(trashSkillImg);
            trashSkillParent.appendChild(trashSkill);
            trashSkill.textContent = "Delete skill";
            trashSkill.addEventListener('click', function() {
                DeleteSkill();
            });
            trashSkillParent.setAttribute("id", "trashSkill");
            document.getElementById("skillsList")?.appendChild(trashSkillParent);
        }
    } else if (!NewSkillInProgress) {
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$skillTags$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["IsSubSkill"])(holdOntoSkill, skillToMove)) {
            Message("Cannot move parent skill into subskill.");
            isSkillSelected = false;
        } else {
            for(let i = 0; i < skillList.length; i++){
                if (skillList[i].name == holdOntoSkill.name && skillList[i].address == holdOntoSkill.address) {
                    skillList[i].address = skillToMove.address + "/" + skillList[i].name;
                    skillList[i].parent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$skillTags$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SetParentSkill"])(skillList[i].address);
                    holdOntoSkill = skillList[i];
                    break;
                }
            }
            UpdateSubSkillAddress(holdOntoSkill);
            DisplaySkills();
            Message("");
            RemoveDeleteSkill();
            isSkillSelected = false;
        }
    }
}
// Prompts for a name and then creates a new skill, or moves an existing skill to generic.
async function NewSkill() {
    if (!isSkillSelected) {
        isSkillSelected = true;
        NewSkillInProgress = true;
        PromptForString();
        document.addEventListener('methodFinished', ()=>{
            DisplaySkills();
            Message("");
            NewSkillInProgress = false;
            isSkillSelected = false;
        });
    } else {
        holdOntoSkill.address = holdOntoSkill.name;
        holdOntoSkill.parent = "";
        UpdateSubSkillAddress(holdOntoSkill);
        DisplaySkills();
        Message("");
        RemoveDeleteSkill();
        isSkillSelected = false;
    }
}
// Deletes the skill that was selected. 
function DeleteSkill() {
    for(let i = 0; i < skillList.length; i++){
        if (holdOntoSkill.name == skillList[i].name && holdOntoSkill.address == skillList[i].address) {
            const moveToGeneric = {
                name: holdOntoSkill.name,
                parent: "",
                address: ""
            };
            UpdateSubSkillAddress(moveToGeneric);
            skillList.splice(i, 1);
            break;
        }
    }
    for(let i = 0; i < skillList.length; i++){
        skillList[i].parent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$skillTags$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SetParentSkill"])(skillList[i].address);
    }
    DisplaySkills();
    Message("");
    RemoveDeleteSkill();
    isSkillSelected = false;
}
// finds subskills of a skill that was changed, and updates all of their addresses accordingly.
function UpdateSubSkillAddress(parentSkill) {
    for(let i = 0; i < skillList.length; i++){
        if (skillList[i].parent == parentSkill.name) {
            if (parentSkill.address == "" || parentSkill.address == null) {
                skillList[i].address = skillList[i].name;
            } else {
                skillList[i].address = parentSkill.address + "/" + skillList[i].name;
            }
            UpdateSubSkillAddress(skillList[i]);
        }
    }
}
// Prompts for a string to complete making a new skill.
// I hate how I coded this part, I should really rewrite it.
async function PromptForString() {
    Message("What's the name of the new skill?");
    let stringValue = "new";
    const scanner = document.createElement("input");
    scanner.classList.add("scanner");
    document.getElementById("messagebox")?.appendChild(scanner);
    scanner.addEventListener('keypress', function(event) {
        if (event.key == "Enter") {
            if (scanner.value == "" || scanner.value == null) {
                stringValue = "new";
            } else {
                stringValue = scanner.value;
            }
            skillList.push({
                name: stringValue,
                address: stringValue,
                parent: ""
            });
            EndPrompt();
        }
    });
}
// Deletes the scanner and notifies anything waiting that it finished.
function EndPrompt() {
    let scanner = document.getElementsByClassName("scanner");
    while(scanner.length > 0){
        scanner[0].remove();
    }
    const event = new CustomEvent('methodFinished');
    document.dispatchEvent(event);
}
// deletes the trash skill button
function RemoveDeleteSkill() {
    while(document.getElementById("trashSkill") != null){
        document.getElementById("trashSkill")?.remove();
    }
}
}}),
"[project]/src/app/Skills/page.tsx [app-rsc] (ecmascript, Next.js server component, client modules ssr)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),
"[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
"use strict";
if ("TURBOPACK compile-time falsy", 0) {
    "TURBOPACK unreachable";
} else {
    if ("TURBOPACK compile-time falsy", 0) {
        "TURBOPACK unreachable";
    } else {
        if ("TURBOPACK compile-time truthy", 1) {
            module.exports = __turbopack_require__("[externals]/next/dist/compiled/next-server/app-page.runtime.dev.js [external] (next/dist/compiled/next-server/app-page.runtime.dev.js, cjs)");
        } else {
            "TURBOPACK unreachable";
        }
    }
} //# sourceMappingURL=module.compiled.js.map
}}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
"use strict";
module.exports = __turbopack_require__("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}}),

};

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__e6bbe4._.js.map