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
    "ArrayToSkillType": (()=>ArrayToSkillType),
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
            skillList = ArrayToSkillType((0, __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$skillTags$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GetSavedSkillList"])());
            DisplaySkills();
            document.getElementById("saveButton")?.addEventListener('click', function() {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$skillTags$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EncodeNewCookieFromSkills"])(skillList);
            });
            document.getElementById("resetButton")?.addEventListener('click', function() {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$skillTags$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EncodeNewCookieFromSkills"])(ArrayToSkillType((0, __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$skillTags$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DefaultSkillListString"])()));
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
function ArrayToSkillType(array) {
    let stringToSkills = [];
    for(let i = 0; i < array.length; i++){
        const newSkill = {
            name: (0, __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$skillTags$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GetSkillFromAddress"])(array[i]),
            address: array[i],
            parent: (0, __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$skillTags$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SetParentSkill"])(array[i])
        };
        stringToSkills.push(newSkill);
    }
    return stringToSkills;
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
"[project]/public/HelperScripts/Present.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "FilterBySkills": (()=>FilterBySkills)
});
function FilterBySkills(skillName) {
    console.log("FilterBySkills " + skillName);
// okay, find a new way to implement this later
/*if (searchBySkills.includes(skillName))
  {
    console.log("remove " + skillName);
    searchBySkills.splice(searchBySkills.indexOf(skillName),1);
  }
  else
  {
    console.log("add " + skillName);
    searchBySkills.push(skillName);
  }*/ }
}}),
"[project]/public/HelperScripts/Elements.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "AddCSSFromString": (()=>AddCSSFromString),
    "DateText": (()=>DateText),
    "Description": (()=>Description),
    "Divider": (()=>Divider),
    "Group": (()=>Group),
    "Skills": (()=>Skills),
    "SkillsBox": (()=>SkillsBox),
    "Subtitle": (()=>Subtitle),
    "Title": (()=>Title)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$page$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/page.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Present$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/public/HelperScripts/Present.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$skillTags$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/public/HelperScripts/skillTags.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$ImageHandler$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/public/HelperScripts/ImageHandler.ts [app-ssr] (ecmascript)");
;
;
;
;
class Title {
    type;
    text;
    cssOptions;
    index;
    constructor(i){
        this.type = "Title";
        this.index = i;
        this.text = "New Title";
        this.cssOptions = [
            "display: flex",
            "justify-content: center",
            "font-size: 48px"
        ];
    }
    Display() {
        let displayText = document.createElement("p");
        displayText.textContent = this.text;
        let self = this;
        displayText.addEventListener('click', function() {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$page$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditText"])(self);
        });
        for(let i = 0; i < this.cssOptions.length; i++){
            AddCSSFromString(displayText, this.cssOptions[i]);
        }
        displayText.setAttribute("index", this.index.toString());
        document.getElementById("Resume")?.appendChild(displayText);
    }
    ConvertToHTML() {
        let displayText = document.createElement("p");
        displayText.textContent = this.text;
        for(let i = 0; i < this.cssOptions.length; i++){
            AddCSSFromString(displayText, this.cssOptions[i]);
        }
        displayText.setAttribute("index", this.index.toString());
        return displayText;
    }
}
class Description {
    type;
    text;
    cssOptions;
    index;
    constructor(i){
        this.type = "Description";
        this.index = i;
        this.text = "New description that says a lot of words about something.";
        this.cssOptions = [
            "font-size: 16px"
        ];
    }
    Display() {
        let displayText = document.createElement("p");
        displayText.textContent = this.text;
        let self = this;
        displayText.addEventListener('click', function() {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$page$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditText"])(self);
        });
        for(let i = 0; i < this.cssOptions.length; i++){
            AddCSSFromString(displayText, this.cssOptions[i]);
        }
        displayText.setAttribute("index", this.index.toString());
        document.getElementById("Resume")?.appendChild(displayText);
    }
    ConvertToHTML() {
        let displayText = document.createElement("p");
        displayText.textContent = this.text;
        for(let i = 0; i < this.cssOptions.length; i++){
            AddCSSFromString(displayText, this.cssOptions[i]);
        }
        displayText.setAttribute("index", this.index.toString());
        return displayText;
    }
}
class DateText {
    type;
    text;
    cssOptions;
    index;
    constructor(i){
        this.type = "DateText";
        this.index = i;
        this.text = "DateText start - DateText end";
        this.cssOptions = [
            "font-size: 12px"
        ];
    }
    Display() {
        let displayText = document.createElement("p");
        displayText.textContent = this.text;
        let self = this;
        displayText.addEventListener('click', function() {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$page$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditText"])(self);
        });
        for(let i = 0; i < this.cssOptions.length; i++){
            AddCSSFromString(displayText, this.cssOptions[i]);
        }
        displayText.setAttribute("index", this.index.toString());
        document.getElementById("Resume")?.appendChild(displayText);
    }
    ConvertToHTML() {
        let displayText = document.createElement("p");
        displayText.textContent = this.text;
        for(let i = 0; i < this.cssOptions.length; i++){
            AddCSSFromString(displayText, this.cssOptions[i]);
        }
        displayText.setAttribute("index", this.index.toString());
        return displayText;
    }
}
class Subtitle {
    type;
    text;
    cssOptions;
    index;
    constructor(i){
        this.type = "Subtitle";
        this.index = i;
        this.text = "New Job title";
        this.cssOptions = [
            "font-size: 24px"
        ];
    }
    Display() {
        let displayText = document.createElement("p");
        displayText.textContent = this.text;
        let self = this;
        displayText.addEventListener('click', function() {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$page$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditText"])(self);
        });
        for(let i = 0; i < this.cssOptions.length; i++){
            AddCSSFromString(displayText, this.cssOptions[i]);
        }
        displayText.setAttribute("index", this.index.toString());
        document.getElementById("Resume")?.appendChild(displayText);
    }
    ConvertToHTML() {
        let displayText = document.createElement("p");
        displayText.textContent = this.text;
        for(let i = 0; i < this.cssOptions.length; i++){
            AddCSSFromString(displayText, this.cssOptions[i]);
        }
        displayText.setAttribute("index", this.index.toString());
        return displayText;
    }
}
class Skills {
    name;
    parent;
    address;
    cssOptions;
    constructor(skillName){
        this.name = skillName;
        this.address = (0, __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$skillTags$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GetAddressFromSkillName"])(this.name);
        this.parent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$skillTags$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SetParentSkill"])(this.name);
        this.cssOptions = [
            "display: inline-block",
            "border: solid"
        ];
    }
    ConvertToHTML(parentSkillsBox) {
        let parent = document.createElement("div");
        for(let i = 0; i < this.cssOptions.length; i++){
            AddCSSFromString(parent, this.cssOptions[i]);
        }
        let img = document.createElement("img");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$ImageHandler$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ImageSetupFromRawAddress"])(img, this.address);
        let name = document.createElement("p");
        img.classList.add("skillImage");
        name.classList.add("skillText");
        name.textContent = this.name;
        name.addEventListener('click', function() {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$page$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RemoveFromSkillsBox"])(parentSkillsBox, name.textContent);
        });
        parent.appendChild(img);
        parent.appendChild(name);
        return parent;
    }
    ConvertToHTMLForPresentPage(parentSkillsBox) {
        let parent = document.createElement("div");
        for(let i = 0; i < this.cssOptions.length; i++){
            AddCSSFromString(parent, this.cssOptions[i]);
        }
        let img = document.createElement("img");
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$ImageHandler$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ImageSetupFromRawAddress"])(img, this.address);
        let name = document.createElement("p");
        img.classList.add("skillImage");
        name.classList.add("skillText");
        name.textContent = this.name;
        name.addEventListener('click', function() {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Present$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FilterBySkills"])(name.textContent);
        });
        parent.appendChild(img);
        parent.appendChild(name);
        return parent;
    }
    // checks if two skills are identical.
    Equals(skillToCompare) {
        if (this.name == skillToCompare.name && this.parent == skillToCompare.parent && this.address == skillToCompare.address) {
            return true;
        }
        return false;
    }
}
class SkillsBox {
    type;
    text;
    cssOptions;
    skills;
    index;
    constructor(i){
        this.type = "SkillsBox";
        this.index = i;
        this.skills = [];
        this.text = "";
        this.cssOptions = [];
    }
    Display() {
        let parent = document.createElement("div");
        for(let i = 0; i < this.cssOptions.length; i++){
            AddCSSFromString(parent, this.cssOptions[i]);
        }
        for(let i = 0; i < this.skills.length; i++){
            parent.appendChild(this.skills[i].ConvertToHTML(this.skills));
        }
        let addButton = document.createElement("button");
        addButton.textContent = "|Add new skill|";
        let skillsCopy = this.skills;
        addButton.addEventListener('mouseover', function() {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$page$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DeleteTemporary"])();
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$page$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SkillDropDownMenu"])("", parent, skillsCopy);
        });
        addButton.addEventListener('click', function() {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$page$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DeleteTemporary"])();
        });
        parent.appendChild(addButton);
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "|Remove skills box|";
        let indexCopy = this.index;
        deleteButton.addEventListener('click', function() {
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$page$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resume"].splice(indexCopy, 1);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$page$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DisplayResume"])();
        });
        parent.appendChild(deleteButton);
        document.getElementById("Resume")?.appendChild(parent);
    }
    ConvertToHTML() {
        let parent = document.createElement("div");
        for(let i = 0; i < this.cssOptions.length; i++){
            AddCSSFromString(parent, this.cssOptions[i]);
        }
        for(let i = 0; i < this.skills.length; i++){
            parent.appendChild(this.skills[i].ConvertToHTML(this.skills));
        }
        let addButton = document.createElement("button");
        addButton.textContent = "|Add new skill|";
        let skillsCopy = this.skills;
        addButton.addEventListener('mouseover', function() {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$page$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DeleteTemporary"])();
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$page$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SkillDropDownMenu"])("", parent, skillsCopy);
        });
        addButton.addEventListener('click', function() {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$page$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DeleteTemporary"])();
        });
        parent.appendChild(addButton);
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "|Remove skills box|";
        let indexCopy = this.index;
        deleteButton.addEventListener('click', function() {
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$page$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resume"].splice(indexCopy, 1);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$page$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DisplayResume"])();
        });
        parent.appendChild(deleteButton);
        return parent;
    }
    ConvertToHTMLForPresentPage() {
        let parent = document.createElement("div");
        for(let i = 0; i < this.cssOptions.length; i++){
            AddCSSFromString(parent, this.cssOptions[i]);
        }
        for(let i = 0; i < this.skills.length; i++){
            parent.appendChild(this.skills[i].ConvertToHTMLForPresentPage(this.skills));
        }
        return parent;
    }
}
class Divider {
    type;
    text;
    cssOptions;
    index;
    constructor(i){
        this.type = "Divider";
        this.index = i;
        this.text = "New divider";
        this.cssOptions = [
            "border-bottom: solid",
            "font-size: 24px"
        ];
    }
    Display() {
        let displayText = document.createElement("p");
        displayText.textContent = this.text;
        let self = this;
        displayText.addEventListener('click', function() {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$page$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EditText"])(self);
        });
        for(let i = 0; i < this.cssOptions.length; i++){
            AddCSSFromString(displayText, this.cssOptions[i]);
        }
        displayText.setAttribute("index", this.index.toString());
        document.getElementById("Resume")?.appendChild(displayText);
    }
    ConvertToHTML() {
        let displayText = document.createElement("p");
        displayText.textContent = this.text;
        for(let i = 0; i < this.cssOptions.length; i++){
            AddCSSFromString(displayText, this.cssOptions[i]);
        }
        displayText.setAttribute("index", this.index.toString());
        return displayText;
    }
}
class Group {
    type;
    elements;
    index;
    constructor(i){
        this.index = i;
        this.elements = [];
        this.type = "Group";
    }
    Display() {
        let groupDiv = document.createElement("div");
        groupDiv.setAttribute("id", "groupBox");
        for(let i = 0; i < this.elements.length; i++){
            console.log(this.elements[i]);
            let child = groupDiv.appendChild(this.elements[i].ConvertToHTML());
            child.appendChild(GroupMovementButtons(this.elements[i].index, this));
        }
        let removeButton = document.createElement("p");
        removeButton.textContent = "|remove group|";
        let indexCopy = this.index;
        removeButton.addEventListener('click', function() {
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$page$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resume"].splice(indexCopy, 1);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$page$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DisplayResume"])();
        });
        groupDiv.appendChild(removeButton);
        document.getElementById("Resume")?.appendChild(groupDiv);
    }
    ConvertToHTML() {}
}
function AddCSSFromString(HTMLElement, rawString) {
    let splitString = rawString.split(":");
    for(let i = 0; i < splitString.length; i++){
        splitString[i] = splitString[i].trim();
    }
    switch(splitString[0]){
        case "display":
            {
                HTMLElement.style.display = splitString[1];
                break;
            }
        case "justify-content":
            {
                HTMLElement.style.justifyContent = splitString[1];
                break;
            }
        case "font-size":
            {
                HTMLElement.style.fontSize = splitString[1];
                break;
            }
        case "border":
            {
                HTMLElement.style.border = splitString[1];
                break;
            }
        case "border-bottom":
            {
                HTMLElement.style.borderBottom = splitString[1];
                break;
            }
        default:
            {
                throw new Error("Could not find a style method HTMLElement.style." + splitString[1]);
            }
    }
}
// Adds movement buttons to any resume element in a group.
function GroupMovementButtons(index, groupBox) {
    let parent = document.createElement("div");
    let upButton = document.createElement("button");
    upButton.textContent = "|^|";
    upButton.addEventListener('click', function() {
        MoveUp(index, groupBox);
    });
    let downButton = document.createElement("button");
    downButton.textContent = "|v|";
    downButton.addEventListener('click', function() {
        MoveDown(index, groupBox);
    });
    parent.appendChild(upButton);
    parent.appendChild(downButton);
    return parent;
}
function MoveUp(index, groupBox) {
    if (!(index - 1 == groupBox.index)) {
        let holdThis = groupBox.elements[index - 2 - groupBox.index];
        groupBox.elements[index - 2 - groupBox.index] = groupBox.elements[index - 1 - groupBox.index];
        groupBox.elements[index - 1 - groupBox.index] = holdThis;
    } else {
        let holdThis = groupBox.elements[index - 1 - groupBox.index];
        groupBox.elements.splice(0, 1);
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$page$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resume"].splice(groupBox.index, 0, holdThis);
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$page$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DisplayResume"])();
}
function MoveDown(index, groupBox) {
    if (!(index == groupBox.index + groupBox.elements.length)) {
        let holdThis = groupBox.elements[index - 1 - groupBox.index];
        groupBox.elements[index - 1 - groupBox.index] = groupBox.elements[index - groupBox.index];
        groupBox.elements[index - groupBox.index] = holdThis;
    } else {
        console.log("move out from bottom");
        let holdThis = groupBox.elements[index - 1 - groupBox.index];
        groupBox.elements.splice(groupBox.elements.length - 1, 1);
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$page$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["resume"].splice(groupBox.index + groupBox.elements.length, 0, holdThis);
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$page$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DisplayResume"])();
}
}}),
"[project]/src/app/page.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "DeleteTemporary": (()=>DeleteTemporary),
    "DisplayResume": (()=>DisplayResume),
    "EditText": (()=>EditText),
    "RemoveFromSkillsBox": (()=>RemoveFromSkillsBox),
    "SkillDropDownMenu": (()=>SkillDropDownMenu),
    "default": (()=>NewEditor),
    "resume": (()=>resume)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$Skills$2f$page$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/src/app/Skills/page.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$skillTags$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/public/HelperScripts/skillTags.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Elements$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/public/HelperScripts/Elements.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
let resume = [];
let listOfSkills = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$Skills$2f$page$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ArrayToSkillType"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$skillTags$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["GetSavedSkillList"])());
function NewEditor() {
    document.onreadystatechange = function() {
        if (document.readyState == "complete") {
            document.getElementById("app")?.classList.add('editor-grid');
            document.getElementById("addRawSubtitle")?.addEventListener('click', function() {
                AddRawElement("Subtitle");
            });
            document.getElementById("addDivider")?.addEventListener('click', function() {
                AddRawElement("Divider");
            });
            document.getElementById("addRawDateText")?.addEventListener('click', function() {
                AddRawElement("DateText");
            });
            document.getElementById("addRawDesc")?.addEventListener('click', function() {
                AddRawElement("Description");
            });
            document.getElementById("addRawTitle")?.addEventListener('click', function() {
                AddRawElement("Title");
            });
            document.getElementById("addSkillsBox")?.addEventListener('click', function() {
                AddRawElement("SkillsBox");
            });
            document.getElementById("addExperience")?.addEventListener('click', function() {
                AddRawElement("Experience");
            });
            document.getElementById("addGroup")?.addEventListener('click', function() {
                AddRawElement("Group");
            });
            document.getElementById("save")?.addEventListener('click', function() {
                EncodeResumeCookie();
            });
            console.log(listOfSkills);
            LoadExistingResumeCookie();
            DisplayResume();
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "topnav",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        children: "Resume Maker"
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 30,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        id: "save",
                        children: "|Save in browser|"
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 31,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: "/Present",
                        children: "|Present|"
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 32,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: "/Skills",
                        children: "|edit skills|"
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 33,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 29,
                columnNumber: 1
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "content",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    id: "app",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            id: "addElements",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: "add"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 38,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    id: "addRawSubtitle",
                                    children: "|add subtitle|"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 39,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    id: "addDivider",
                                    children: "|add divider|"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 40,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    id: "addRawDateText",
                                    children: "|add DateText|"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 41,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    id: "addRawDesc",
                                    children: "|add description|"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 42,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    id: "addRawTitle",
                                    children: "|add title|"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 43,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    id: "addSkillsBox",
                                    children: "|add skills box|"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 44,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    id: "addExperience",
                                    children: "|add experience|"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 45,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    id: "addGroup",
                                    children: "|add group box|"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 46,
                                    columnNumber: 11
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 37,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            id: "Resume"
                        }, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 48,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            id: "editElements",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "edit"
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 50,
                                columnNumber: 9
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 49,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            id: "editSkills",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "skills and options n stuff"
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 53,
                                columnNumber: 9
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 52,
                            columnNumber: 9
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 36,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 35,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/page.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
function DisplayResume() {
    let indexNumber = 0;
    console.log(resume);
    while(document.getElementById("Resume")?.firstChild != null){
        document.getElementById("Resume")?.firstChild?.remove();
    }
    for(let i = 0; i < resume.length; i++){
        resume[i].index = indexNumber;
        if (resume[i].type == "Group") {
            for(let j = 0; j < resume[i].elements.length; j++){
                indexNumber++;
                resume[i].elements[j].index = indexNumber;
            }
        }
        resume[i].Display();
        document.getElementById("Resume")?.appendChild(CreateMovementButtons(i));
        indexNumber++;
    }
}
function AddRawElement(elementName) {
    switch(elementName){
        case "Title":
            {
                let newTitle = new __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Elements$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Title"](resume.length);
                resume.push(newTitle);
                DisplayResume();
                break;
            }
        case "Subtitle":
            {
                let newSubtitle = new __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Elements$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Subtitle"](resume.length);
                resume.push(newSubtitle);
                DisplayResume();
                break;
            }
        case "Description":
            {
                let newDesc = new __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Elements$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Description"](resume.length);
                resume.push(newDesc);
                DisplayResume();
                break;
            }
        case "DateText":
            {
                let newDateText = new __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Elements$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DateText"](resume.length);
                resume.push(newDateText);
                DisplayResume();
                break;
            }
        case "SkillsBox":
            {
                let newBox = new __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Elements$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SkillsBox"](resume.length);
                resume.push(newBox);
                DisplayResume();
                break;
            }
        case "Divider":
            {
                let newDivider = new __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Elements$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Divider"](resume.length);
                resume.push(newDivider);
                DisplayResume();
                break;
            }
        case "Experience":
            {
                let newSubtitle = new __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Elements$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Subtitle"](resume.length);
                resume.push(newSubtitle);
                let newDateText = new __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Elements$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DateText"](resume.length);
                resume.push(newDateText);
                let newDesc = new __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Elements$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Description"](resume.length);
                resume.push(newDesc);
                let newBox = new __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Elements$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SkillsBox"](resume.length);
                resume.push(newBox);
                DisplayResume();
                break;
            }
        case "Group":
            {
                let newGroup = new __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Elements$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Group"](resume.length);
                resume.push(newGroup);
                DisplayResume();
                break;
            }
        default:
            {
                throw new Error("AddRawElement received a string that is not any basic resume element.");
            }
    }
}
function SkillDropDownMenu(parent, parentToAppendTo, destination) {
    console.log("skill drop down");
    let parentdiv = document.createElement("div");
    for(let i = 0; i < listOfSkills.length; i++){
        parentdiv.classList.add("skillDropDown");
        parentdiv.setAttribute("id", "temporary");
        if (listOfSkills[i].parent == parent) {
            let skillHolder = document.createElement("div");
            skillHolder.setAttribute("id", "temporary");
            let skill = document.createElement("button");
            skill.textContent = listOfSkills[i].name;
            skill.addEventListener('click', function() {
                DeleteTemporary();
                AddToSkillsBox(destination, skill.textContent);
            });
            skill.addEventListener('mouseover', function() {
                SkillDropDownMenu(listOfSkills[i].name, skillHolder, destination);
            });
            skillHolder.appendChild(skill);
            parentdiv.appendChild(skillHolder);
            parentToAppendTo.appendChild(parentdiv);
        }
    }
}
// Adds a skill to a specified list of skills if it doesn't already exist.
// this only exists because I couldn't find a better way to add to a skillbox's skills list.
function AddToSkillsBox(destination, skillName) {
    let skillToAdd = new __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Elements$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Skills"](skillName);
    let duplicateSkill = false;
    for(let i = 0; i < destination.length; i++){
        if (destination[i].name == skillToAdd.name && destination[i].address == skillToAdd.address && destination[i].parent == skillToAdd.parent) {
            duplicateSkill = true;
        }
    }
    if (!duplicateSkill) {
        destination.push(skillToAdd);
    }
    DisplayResume();
}
function RemoveFromSkillsBox(destination, skillInString) {
    let skillToRemove = new __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Elements$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Skills"](skillInString);
    for(let i = 0; i < destination.length; i++){
        if (destination[i].Equals(skillToRemove)) {
            destination.splice(i, 1);
            break;
        }
    }
    DisplayResume();
}
function DeleteTemporary() {
    while(document.getElementById("temporary") != null){
        document.getElementById("temporary")?.remove();
    }
}
// Finds the element specified on the page. Returns the resume if it's not found.
function FindElementOnPage(element) {
    let ids = document.querySelectorAll("[index=\"" + element.index + "\"]");
    if (ids.length > 1 || ids.length == 0) {
        return document.getElementById("Resume");
    } else {
        return ids[0];
    }
}
// finds and loads an existing resume in the browser.
function LoadExistingResumeCookie() {
    const listOfCookies = decodeURIComponent(document.cookie).split(";");
    for(let i = 0; i < listOfCookies.length; i++){
        if (listOfCookies[i].indexOf("element") == 0 || listOfCookies[i].indexOf("element") == 1) {
            let intermediate = listOfCookies[i].split("=");
            let generic = JSON.parse(intermediate[1]);
            console.log(intermediate[1]);
            switch(generic.type){
                case "Title":
                    {
                        let cookieObj = new __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Elements$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Title"](generic.index);
                        cookieObj.text = generic.text;
                        cookieObj.cssOptions = generic.cssOptions;
                        resume.push(cookieObj);
                        break;
                    }
                case "Subtitle":
                    {
                        let cookieObj = new __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Elements$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Subtitle"](generic.index);
                        cookieObj.text = generic.text;
                        cookieObj.cssOptions = generic.cssOptions;
                        resume.push(cookieObj);
                        break;
                    }
                case "DateText":
                    {
                        let cookieObj = new __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Elements$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DateText"](generic.index);
                        cookieObj.text = generic.text;
                        cookieObj.cssOptions = generic.cssOptions;
                        resume.push(cookieObj);
                        break;
                    }
                case "Description":
                    {
                        let cookieObj = new __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Elements$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Description"](generic.index);
                        cookieObj.text = generic.text;
                        cookieObj.cssOptions = generic.cssOptions;
                        resume.push(cookieObj);
                        break;
                    }
                case "Divider":
                    {
                        let dividerObj = new __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Elements$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Divider"](generic.index);
                        dividerObj.text = generic.text;
                        dividerObj.cssOptions = generic.cssOptions;
                        resume.push(dividerObj);
                        break;
                    }
                case "SkillsBox":
                    {
                        let cookieObj = new __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Elements$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SkillsBox"](generic.index);
                        console.log(cookieObj);
                        cookieObj.text = generic.text;
                        cookieObj.cssOptions = generic.cssOptions;
                        let skillsArray = [];
                        for(let j = 0; j < generic.skills.length; j++){
                            let skill = new __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Elements$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Skills"](generic.skills[j].name);
                            skillsArray.push(skill);
                        }
                        cookieObj.skills = skillsArray;
                        resume.push(cookieObj);
                        break;
                    }
                case "Group":
                    {
                        let groupObj = new __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Elements$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Group"](generic.index);
                        for(let i = 0; i < generic.elements.length; i++){
                            // Yeah, uhh.. this is basically just the method copy pasted again.
                            // I REALLY need to clean this up and move it to another method later.
                            switch(generic.elements[i].type){
                                case "Title":
                                    {
                                        let cookieObj = new __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Elements$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Title"](generic.elements[i].index);
                                        cookieObj.text = generic.elements[i].text;
                                        cookieObj.cssOptions = generic.elements[i].cssOptions;
                                        groupObj.elements.push(cookieObj);
                                        break;
                                    }
                                case "Subtitle":
                                    {
                                        let cookieObj = new __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Elements$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Subtitle"](generic.elements[i].index);
                                        cookieObj.text = generic.elements[i].text;
                                        cookieObj.cssOptions = generic.elements[i].cssOptions;
                                        groupObj.elements.push(cookieObj);
                                        break;
                                    }
                                case "DateText":
                                    {
                                        let cookieObj = new __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Elements$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DateText"](generic.elements[i].index);
                                        cookieObj.text = generic.elements[i].text;
                                        cookieObj.cssOptions = generic.elements[i].cssOptions;
                                        groupObj.elements.push(cookieObj);
                                        break;
                                    }
                                case "Description":
                                    {
                                        let cookieObj = new __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Elements$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Description"](generic.elements[i].index);
                                        cookieObj.text = generic.elements[i].text;
                                        cookieObj.cssOptions = generic.elements[i].cssOptions;
                                        groupObj.elements.push(cookieObj);
                                        break;
                                    }
                                case "Divider":
                                    {
                                        let cookieObj = new __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Elements$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Divider"](generic.elements[i].index);
                                        cookieObj.text = generic.elements[i].text;
                                        cookieObj.cssOptions = generic.elements[i].cssOptions;
                                        groupObj.elements.push(cookieObj);
                                        break;
                                    }
                                case "SkillsBox":
                                    {
                                        let cookieObj = new __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Elements$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SkillsBox"](generic.elements[i].index);
                                        cookieObj.text = generic.elements[i].text;
                                        cookieObj.cssOptions = generic.elements[i].cssOptions;
                                        let skillsArray = [];
                                        for(let j = 0; j < generic.elements[i].skills.length; j++){
                                            let skill = new __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Elements$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Skills"](generic.elements[i].skills[j].name);
                                            skillsArray.push(skill);
                                        }
                                        cookieObj.skills = skillsArray;
                                        groupObj.elements.push(cookieObj);
                                        break;
                                    }
                            }
                        }
                        resume.push(groupObj);
                        break;
                    }
                default:
                    {
                        throw new Error("Could not find a matching object for " + generic.type);
                    }
            }
        }
    }
}
// Saves a resume in the browser.
// oh my god.. JSON makes this SO much easier.
function EncodeResumeCookie() {
    DeleteResumeCookie();
    const d = new Date();
    d.setTime(d.getTime() * 1.01);
    let expires = "expires=" + d.toUTCString();
    for(let i = 0; i < resume.length; i++){
        document.cookie = "element" + i + "=" + JSON.stringify(resume[i]) + ";" + expires;
    }
}
// Deletes a resume saved in the browser.
function DeleteResumeCookie() {
    const listOfCookies = decodeURIComponent(document.cookie).split(";");
    for(let i = 0; i < listOfCookies.length; i++){
        if (listOfCookies[i].indexOf("element") == 0 || listOfCookies[i].indexOf("element") == 1) {
            let intermediate = listOfCookies[i].split("=");
            document.cookie = intermediate[0] + "=; expires=Thu, 18 Dec 2013 12:00:00 UTC";
        }
    }
}
// Adds movement buttons to any resume element.
function CreateMovementButtons(index) {
    let parent = document.createElement("div");
    let upButton = document.createElement("button");
    upButton.textContent = "|^|";
    upButton.addEventListener('click', function() {
        MoveElementUp(index);
    });
    let downButton = document.createElement("button");
    downButton.textContent = "|v|";
    downButton.addEventListener('click', function() {
        MoveElementDown(index);
    });
    parent.appendChild(upButton);
    parent.appendChild(downButton);
    return parent;
}
function MoveElementUp(index) {
    if (index != 0) {
        if (resume[index].type != "Group" && resume[index - 1].type == "Group") {
            resume[index - 1].elements.push(resume[index]);
            resume.splice(index, 1);
        } else {
            let holdThis = resume[index - 1];
            resume[index - 1] = resume[index];
            resume[index] = holdThis;
        }
        DisplayResume();
    }
}
function MoveElementDown(index) {
    if (index != resume.length - 1) {
        if (resume[index].type != "Group" && resume[index + 1].type == "Group") {
            resume[index + 1].elements.splice(0, 0, resume[index]);
            resume.splice(index, 1);
        } else {
            let holdThis = resume[index + 1];
            resume[index + 1] = resume[index];
            resume[index] = holdThis;
        }
        DisplayResume();
    }
}
function EditText(element) {
    if (document.getElementsByClassName("scanner").length == 0) {
        FindElementOnPage(element).textContent = "";
        const scannerDiv = document.createElement("div");
        scannerDiv.setAttribute("id", "temporary");
        const scanner = document.createElement("input");
        scanner.value = element.text;
        scanner.classList.add("scanner");
        scannerDiv.appendChild(scanner);
        FindElementOnPage(element)?.appendChild(scannerDiv);
        scanner.addEventListener('keypress', function(event) {
            if (event.key == "Enter") {
                element.text = scanner.value;
                DeleteTemporary();
                if (element.text == "" || element.text == null) {
                    resume.splice(element.index, 1);
                }
                DisplayResume();
            }
        });
    }
}
}}),
"[project]/src/app/page.tsx [app-rsc] (ecmascript, Next.js server component, client modules ssr)": ((__turbopack_context__) => {

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
"[project]/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [app-ssr] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
"use strict";
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
exports._ = _interop_require_default;
}}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
"use strict";
module.exports = __turbopack_require__("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxRuntime; //# sourceMappingURL=react-jsx-runtime.js.map
}}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
"use strict";
module.exports = __turbopack_require__("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].React; //# sourceMappingURL=react.js.map
}}),
"[project]/node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs [app-ssr] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
"use strict";
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) return obj;
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") return {
        default: obj
    };
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) return cache.get(obj);
    var newObj = {
        __proto__: null
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) Object.defineProperty(newObj, key, desc);
            else newObj[key] = obj[key];
        }
    }
    newObj.default = obj;
    if (cache) cache.set(obj, newObj);
    return newObj;
}
exports._ = _interop_require_wildcard;
}}),
"[project]/node_modules/next/dist/shared/lib/router/utils/querystring.js [app-ssr] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    assign: null,
    searchParamsToUrlQuery: null,
    urlQueryToSearchParams: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    assign: function() {
        return assign;
    },
    searchParamsToUrlQuery: function() {
        return searchParamsToUrlQuery;
    },
    urlQueryToSearchParams: function() {
        return urlQueryToSearchParams;
    }
});
function searchParamsToUrlQuery(searchParams) {
    const query = {};
    searchParams.forEach((value, key)=>{
        if (typeof query[key] === 'undefined') {
            query[key] = value;
        } else if (Array.isArray(query[key])) {
            ;
            query[key].push(value);
        } else {
            query[key] = [
                query[key],
                value
            ];
        }
    });
    return query;
}
function stringifyUrlQueryParam(param) {
    if (typeof param === 'string' || typeof param === 'number' && !isNaN(param) || typeof param === 'boolean') {
        return String(param);
    } else {
        return '';
    }
}
function urlQueryToSearchParams(urlQuery) {
    const result = new URLSearchParams();
    Object.entries(urlQuery).forEach((param)=>{
        let [key, value] = param;
        if (Array.isArray(value)) {
            value.forEach((item)=>result.append(key, stringifyUrlQueryParam(item)));
        } else {
            result.set(key, stringifyUrlQueryParam(value));
        }
    });
    return result;
}
function assign(target) {
    for(var _len = arguments.length, searchParamsList = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++){
        searchParamsList[_key - 1] = arguments[_key];
    }
    searchParamsList.forEach((searchParams)=>{
        Array.from(searchParams.keys()).forEach((key)=>target.delete(key));
        searchParams.forEach((value, key)=>target.append(key, value));
    });
    return target;
} //# sourceMappingURL=querystring.js.map
}}),
"[project]/node_modules/next/dist/shared/lib/router/utils/format-url.js [app-ssr] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
// Format function modified from nodejs
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    formatUrl: null,
    formatWithValidation: null,
    urlObjectKeys: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    formatUrl: function() {
        return formatUrl;
    },
    formatWithValidation: function() {
        return formatWithValidation;
    },
    urlObjectKeys: function() {
        return urlObjectKeys;
    }
});
const _interop_require_wildcard = __turbopack_require__("[project]/node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs [app-ssr] (ecmascript)");
const _querystring = /*#__PURE__*/ _interop_require_wildcard._(__turbopack_require__("[project]/node_modules/next/dist/shared/lib/router/utils/querystring.js [app-ssr] (ecmascript)"));
const slashedProtocols = /https?|ftp|gopher|file/;
function formatUrl(urlObj) {
    let { auth, hostname } = urlObj;
    let protocol = urlObj.protocol || '';
    let pathname = urlObj.pathname || '';
    let hash = urlObj.hash || '';
    let query = urlObj.query || '';
    let host = false;
    auth = auth ? encodeURIComponent(auth).replace(/%3A/i, ':') + '@' : '';
    if (urlObj.host) {
        host = auth + urlObj.host;
    } else if (hostname) {
        host = auth + (~hostname.indexOf(':') ? "[" + hostname + "]" : hostname);
        if (urlObj.port) {
            host += ':' + urlObj.port;
        }
    }
    if (query && typeof query === 'object') {
        query = String(_querystring.urlQueryToSearchParams(query));
    }
    let search = urlObj.search || query && "?" + query || '';
    if (protocol && !protocol.endsWith(':')) protocol += ':';
    if (urlObj.slashes || (!protocol || slashedProtocols.test(protocol)) && host !== false) {
        host = '//' + (host || '');
        if (pathname && pathname[0] !== '/') pathname = '/' + pathname;
    } else if (!host) {
        host = '';
    }
    if (hash && hash[0] !== '#') hash = '#' + hash;
    if (search && search[0] !== '?') search = '?' + search;
    pathname = pathname.replace(/[?#]/g, encodeURIComponent);
    search = search.replace('#', '%23');
    return "" + protocol + host + pathname + search + hash;
}
const urlObjectKeys = [
    'auth',
    'hash',
    'host',
    'hostname',
    'href',
    'path',
    'pathname',
    'port',
    'protocol',
    'query',
    'search',
    'slashes'
];
function formatWithValidation(url) {
    if ("TURBOPACK compile-time truthy", 1) {
        if (url !== null && typeof url === 'object') {
            Object.keys(url).forEach((key)=>{
                if (!urlObjectKeys.includes(key)) {
                    console.warn("Unknown key passed via urlObject into url.format: " + key);
                }
            });
        }
    }
    return formatUrl(url);
} //# sourceMappingURL=format-url.js.map
}}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/contexts/app-router-context.js [app-ssr] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
"use strict";
module.exports = __turbopack_require__("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['contexts'].AppRouterContext; //# sourceMappingURL=app-router-context.js.map
}}),
"[project]/node_modules/next/dist/client/request-idle-callback.js [app-ssr] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    cancelIdleCallback: null,
    requestIdleCallback: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    cancelIdleCallback: function() {
        return cancelIdleCallback;
    },
    requestIdleCallback: function() {
        return requestIdleCallback;
    }
});
const requestIdleCallback = typeof self !== 'undefined' && self.requestIdleCallback && self.requestIdleCallback.bind(window) || function(cb) {
    let start = Date.now();
    return self.setTimeout(function() {
        cb({
            didTimeout: false,
            timeRemaining: function() {
                return Math.max(0, 50 - (Date.now() - start));
            }
        });
    }, 1);
};
const cancelIdleCallback = typeof self !== 'undefined' && self.cancelIdleCallback && self.cancelIdleCallback.bind(window) || function(id) {
    return clearTimeout(id);
};
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=request-idle-callback.js.map
}}),
"[project]/node_modules/next/dist/client/use-intersection.js [app-ssr] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useIntersection", {
    enumerable: true,
    get: function() {
        return useIntersection;
    }
});
const _react = __turbopack_require__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
const _requestidlecallback = __turbopack_require__("[project]/node_modules/next/dist/client/request-idle-callback.js [app-ssr] (ecmascript)");
const hasIntersectionObserver = typeof IntersectionObserver === 'function';
const observers = new Map();
const idList = [];
function createObserver(options) {
    const id = {
        root: options.root || null,
        margin: options.rootMargin || ''
    };
    const existing = idList.find((obj)=>obj.root === id.root && obj.margin === id.margin);
    let instance;
    if (existing) {
        instance = observers.get(existing);
        if (instance) {
            return instance;
        }
    }
    const elements = new Map();
    const observer = new IntersectionObserver((entries)=>{
        entries.forEach((entry)=>{
            const callback = elements.get(entry.target);
            const isVisible = entry.isIntersecting || entry.intersectionRatio > 0;
            if (callback && isVisible) {
                callback(isVisible);
            }
        });
    }, options);
    instance = {
        id,
        observer,
        elements
    };
    idList.push(id);
    observers.set(id, instance);
    return instance;
}
function observe(element, callback, options) {
    const { id, observer, elements } = createObserver(options);
    elements.set(element, callback);
    observer.observe(element);
    return function unobserve() {
        elements.delete(element);
        observer.unobserve(element);
        // Destroy observer when there's nothing left to watch:
        if (elements.size === 0) {
            observer.disconnect();
            observers.delete(id);
            const index = idList.findIndex((obj)=>obj.root === id.root && obj.margin === id.margin);
            if (index > -1) {
                idList.splice(index, 1);
            }
        }
    };
}
function useIntersection(param) {
    let { rootRef, rootMargin, disabled } = param;
    const isDisabled = disabled || !hasIntersectionObserver;
    const [visible, setVisible] = (0, _react.useState)(false);
    const elementRef = (0, _react.useRef)(null);
    const setElement = (0, _react.useCallback)((element)=>{
        elementRef.current = element;
    }, []);
    (0, _react.useEffect)(()=>{
        if (hasIntersectionObserver) {
            if (isDisabled || visible) return;
            const element = elementRef.current;
            if (element && element.tagName) {
                const unobserve = observe(element, (isVisible)=>isVisible && setVisible(isVisible), {
                    root: rootRef == null ? void 0 : rootRef.current,
                    rootMargin
                });
                return unobserve;
            }
        } else {
            if (!visible) {
                const idleCallback = (0, _requestidlecallback.requestIdleCallback)(()=>setVisible(true));
                return ()=>(0, _requestidlecallback.cancelIdleCallback)(idleCallback);
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        isDisabled,
        rootMargin,
        rootRef,
        visible,
        elementRef.current
    ]);
    const resetVisible = (0, _react.useCallback)(()=>{
        setVisible(false);
    }, []);
    return [
        setElement,
        visible,
        resetVisible
    ];
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=use-intersection.js.map
}}),
"[project]/node_modules/next/dist/client/components/router-reducer/router-reducer-types.js [app-ssr] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    ACTION_HMR_REFRESH: null,
    ACTION_NAVIGATE: null,
    ACTION_PREFETCH: null,
    ACTION_REFRESH: null,
    ACTION_RESTORE: null,
    ACTION_SERVER_ACTION: null,
    ACTION_SERVER_PATCH: null,
    PrefetchCacheEntryStatus: null,
    PrefetchKind: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    ACTION_HMR_REFRESH: function() {
        return ACTION_HMR_REFRESH;
    },
    ACTION_NAVIGATE: function() {
        return ACTION_NAVIGATE;
    },
    ACTION_PREFETCH: function() {
        return ACTION_PREFETCH;
    },
    ACTION_REFRESH: function() {
        return ACTION_REFRESH;
    },
    ACTION_RESTORE: function() {
        return ACTION_RESTORE;
    },
    ACTION_SERVER_ACTION: function() {
        return ACTION_SERVER_ACTION;
    },
    ACTION_SERVER_PATCH: function() {
        return ACTION_SERVER_PATCH;
    },
    PrefetchCacheEntryStatus: function() {
        return PrefetchCacheEntryStatus;
    },
    PrefetchKind: function() {
        return PrefetchKind;
    }
});
const ACTION_REFRESH = 'refresh';
const ACTION_NAVIGATE = 'navigate';
const ACTION_RESTORE = 'restore';
const ACTION_SERVER_PATCH = 'server-patch';
const ACTION_PREFETCH = 'prefetch';
const ACTION_HMR_REFRESH = 'hmr-refresh';
const ACTION_SERVER_ACTION = 'server-action';
var PrefetchKind = /*#__PURE__*/ function(PrefetchKind) {
    PrefetchKind["AUTO"] = "auto";
    PrefetchKind["FULL"] = "full";
    PrefetchKind["TEMPORARY"] = "temporary";
    return PrefetchKind;
}({});
var PrefetchCacheEntryStatus = /*#__PURE__*/ function(PrefetchCacheEntryStatus) {
    PrefetchCacheEntryStatus["fresh"] = "fresh";
    PrefetchCacheEntryStatus["reusable"] = "reusable";
    PrefetchCacheEntryStatus["expired"] = "expired";
    PrefetchCacheEntryStatus["stale"] = "stale";
    return PrefetchCacheEntryStatus;
}({});
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=router-reducer-types.js.map
}}),
"[project]/node_modules/next/dist/client/use-merged-ref.js [app-ssr] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useMergedRef", {
    enumerable: true,
    get: function() {
        return useMergedRef;
    }
});
const _react = __turbopack_require__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
function useMergedRef(refA, refB) {
    const cleanupA = (0, _react.useRef)(()=>{});
    const cleanupB = (0, _react.useRef)(()=>{});
    return (0, _react.useMemo)(()=>{
        if (!refA || !refB) {
            return refA || refB;
        }
        return (current)=>{
            if (current === null) {
                cleanupA.current();
                cleanupB.current();
            } else {
                cleanupA.current = applyRef(refA, current);
                cleanupB.current = applyRef(refB, current);
            }
        };
    }, [
        refA,
        refB
    ]);
}
function applyRef(refA, current) {
    if (typeof refA === 'function') {
        const cleanup = refA(current);
        if (typeof cleanup === 'function') {
            return cleanup;
        } else {
            return ()=>refA(null);
        }
    } else {
        refA.current = current;
        return ()=>{
            refA.current = null;
        };
    }
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=use-merged-ref.js.map
}}),
"[project]/node_modules/next/dist/shared/lib/utils.js [app-ssr] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
0 && (module.exports = {
    DecodeError: null,
    MiddlewareNotFoundError: null,
    MissingStaticPage: null,
    NormalizeError: null,
    PageNotFoundError: null,
    SP: null,
    ST: null,
    WEB_VITALS: null,
    execOnce: null,
    getDisplayName: null,
    getLocationOrigin: null,
    getURL: null,
    isAbsoluteUrl: null,
    isResSent: null,
    loadGetInitialProps: null,
    normalizeRepeatedSlashes: null,
    stringifyError: null
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    DecodeError: function() {
        return DecodeError;
    },
    MiddlewareNotFoundError: function() {
        return MiddlewareNotFoundError;
    },
    MissingStaticPage: function() {
        return MissingStaticPage;
    },
    NormalizeError: function() {
        return NormalizeError;
    },
    PageNotFoundError: function() {
        return PageNotFoundError;
    },
    SP: function() {
        return SP;
    },
    ST: function() {
        return ST;
    },
    WEB_VITALS: function() {
        return WEB_VITALS;
    },
    execOnce: function() {
        return execOnce;
    },
    getDisplayName: function() {
        return getDisplayName;
    },
    getLocationOrigin: function() {
        return getLocationOrigin;
    },
    getURL: function() {
        return getURL;
    },
    isAbsoluteUrl: function() {
        return isAbsoluteUrl;
    },
    isResSent: function() {
        return isResSent;
    },
    loadGetInitialProps: function() {
        return loadGetInitialProps;
    },
    normalizeRepeatedSlashes: function() {
        return normalizeRepeatedSlashes;
    },
    stringifyError: function() {
        return stringifyError;
    }
});
const WEB_VITALS = [
    'CLS',
    'FCP',
    'FID',
    'INP',
    'LCP',
    'TTFB'
];
function execOnce(fn) {
    let used = false;
    let result;
    return function() {
        for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
            args[_key] = arguments[_key];
        }
        if (!used) {
            used = true;
            result = fn(...args);
        }
        return result;
    };
}
// Scheme: https://tools.ietf.org/html/rfc3986#section-3.1
// Absolute URL: https://tools.ietf.org/html/rfc3986#section-4.3
const ABSOLUTE_URL_REGEX = /^[a-zA-Z][a-zA-Z\d+\-.]*?:/;
const isAbsoluteUrl = (url)=>ABSOLUTE_URL_REGEX.test(url);
function getLocationOrigin() {
    const { protocol, hostname, port } = window.location;
    return protocol + "//" + hostname + (port ? ':' + port : '');
}
function getURL() {
    const { href } = window.location;
    const origin = getLocationOrigin();
    return href.substring(origin.length);
}
function getDisplayName(Component) {
    return typeof Component === 'string' ? Component : Component.displayName || Component.name || 'Unknown';
}
function isResSent(res) {
    return res.finished || res.headersSent;
}
function normalizeRepeatedSlashes(url) {
    const urlParts = url.split('?');
    const urlNoQuery = urlParts[0];
    return urlNoQuery // first we replace any non-encoded backslashes with forward
    // then normalize repeated forward slashes
    .replace(/\\/g, '/').replace(/\/\/+/g, '/') + (urlParts[1] ? "?" + urlParts.slice(1).join('?') : '');
}
async function loadGetInitialProps(App, ctx) {
    if ("TURBOPACK compile-time truthy", 1) {
        var _App_prototype;
        if ((_App_prototype = App.prototype) == null ? void 0 : _App_prototype.getInitialProps) {
            const message = '"' + getDisplayName(App) + '.getInitialProps()" is defined as an instance method - visit https://nextjs.org/docs/messages/get-initial-props-as-an-instance-method for more information.';
            throw new Error(message);
        }
    }
    // when called from _app `ctx` is nested in `ctx`
    const res = ctx.res || ctx.ctx && ctx.ctx.res;
    if (!App.getInitialProps) {
        if (ctx.ctx && ctx.Component) {
            // @ts-ignore pageProps default
            return {
                pageProps: await loadGetInitialProps(ctx.Component, ctx.ctx)
            };
        }
        return {};
    }
    const props = await App.getInitialProps(ctx);
    if (res && isResSent(res)) {
        return props;
    }
    if (!props) {
        const message = '"' + getDisplayName(App) + '.getInitialProps()" should resolve to an object. But found "' + props + '" instead.';
        throw new Error(message);
    }
    if ("TURBOPACK compile-time truthy", 1) {
        if (Object.keys(props).length === 0 && !ctx.ctx) {
            console.warn("" + getDisplayName(App) + " returned an empty object from `getInitialProps`. This de-optimizes and prevents automatic static optimization. https://nextjs.org/docs/messages/empty-object-getInitialProps");
        }
    }
    return props;
}
const SP = typeof performance !== 'undefined';
const ST = SP && [
    'mark',
    'measure',
    'getEntriesByName'
].every((method)=>typeof performance[method] === 'function');
class DecodeError extends Error {
}
class NormalizeError extends Error {
}
class PageNotFoundError extends Error {
    constructor(page){
        super();
        this.code = 'ENOENT';
        this.name = 'PageNotFoundError';
        this.message = "Cannot find module for page: " + page;
    }
}
class MissingStaticPage extends Error {
    constructor(page, message){
        super();
        this.message = "Failed to load static file for page: " + page + " " + message;
    }
}
class MiddlewareNotFoundError extends Error {
    constructor(){
        super();
        this.code = 'ENOENT';
        this.message = "Cannot find the middleware module";
    }
}
function stringifyError(error) {
    return JSON.stringify({
        message: error.message,
        stack: error.stack
    });
} //# sourceMappingURL=utils.js.map
}}),
"[project]/node_modules/next/dist/shared/lib/router/utils/parse-path.js [app-ssr] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
/**
 * Given a path this function will find the pathname, query and hash and return
 * them. This is useful to parse full paths on the client side.
 * @param path A path to parse e.g. /foo/bar?id=1#hash
 */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "parsePath", {
    enumerable: true,
    get: function() {
        return parsePath;
    }
});
function parsePath(path) {
    const hashIndex = path.indexOf('#');
    const queryIndex = path.indexOf('?');
    const hasQuery = queryIndex > -1 && (hashIndex < 0 || queryIndex < hashIndex);
    if (hasQuery || hashIndex > -1) {
        return {
            pathname: path.substring(0, hasQuery ? queryIndex : hashIndex),
            query: hasQuery ? path.substring(queryIndex, hashIndex > -1 ? hashIndex : undefined) : '',
            hash: hashIndex > -1 ? path.slice(hashIndex) : ''
        };
    }
    return {
        pathname: path,
        query: '',
        hash: ''
    };
} //# sourceMappingURL=parse-path.js.map
}}),
"[project]/node_modules/next/dist/shared/lib/router/utils/add-path-prefix.js [app-ssr] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "addPathPrefix", {
    enumerable: true,
    get: function() {
        return addPathPrefix;
    }
});
const _parsepath = __turbopack_require__("[project]/node_modules/next/dist/shared/lib/router/utils/parse-path.js [app-ssr] (ecmascript)");
function addPathPrefix(path, prefix) {
    if (!path.startsWith('/') || !prefix) {
        return path;
    }
    const { pathname, query, hash } = (0, _parsepath.parsePath)(path);
    return "" + prefix + pathname + query + hash;
} //# sourceMappingURL=add-path-prefix.js.map
}}),
"[project]/node_modules/next/dist/shared/lib/router/utils/remove-trailing-slash.js [app-ssr] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
/**
 * Removes the trailing slash for a given route or page path. Preserves the
 * root page. Examples:
 *   - `/foo/bar/` -> `/foo/bar`
 *   - `/foo/bar` -> `/foo/bar`
 *   - `/` -> `/`
 */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "removeTrailingSlash", {
    enumerable: true,
    get: function() {
        return removeTrailingSlash;
    }
});
function removeTrailingSlash(route) {
    return route.replace(/\/$/, '') || '/';
} //# sourceMappingURL=remove-trailing-slash.js.map
}}),
"[project]/node_modules/next/dist/client/normalize-trailing-slash.js [app-ssr] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "normalizePathTrailingSlash", {
    enumerable: true,
    get: function() {
        return normalizePathTrailingSlash;
    }
});
const _removetrailingslash = __turbopack_require__("[project]/node_modules/next/dist/shared/lib/router/utils/remove-trailing-slash.js [app-ssr] (ecmascript)");
const _parsepath = __turbopack_require__("[project]/node_modules/next/dist/shared/lib/router/utils/parse-path.js [app-ssr] (ecmascript)");
const normalizePathTrailingSlash = (path)=>{
    if (!path.startsWith('/') || process.env.__NEXT_MANUAL_TRAILING_SLASH) {
        return path;
    }
    const { pathname, query, hash } = (0, _parsepath.parsePath)(path);
    if ("TURBOPACK compile-time falsy", 0) {
        "TURBOPACK unreachable";
    }
    return "" + (0, _removetrailingslash.removeTrailingSlash)(pathname) + query + hash;
};
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=normalize-trailing-slash.js.map
}}),
"[project]/node_modules/next/dist/client/add-base-path.js [app-ssr] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "addBasePath", {
    enumerable: true,
    get: function() {
        return addBasePath;
    }
});
const _addpathprefix = __turbopack_require__("[project]/node_modules/next/dist/shared/lib/router/utils/add-path-prefix.js [app-ssr] (ecmascript)");
const _normalizetrailingslash = __turbopack_require__("[project]/node_modules/next/dist/client/normalize-trailing-slash.js [app-ssr] (ecmascript)");
const basePath = ("TURBOPACK compile-time value", "") || '';
function addBasePath(path, required) {
    return (0, _normalizetrailingslash.normalizePathTrailingSlash)(("TURBOPACK compile-time falsy", 0) ? ("TURBOPACK unreachable", undefined) : (0, _addpathprefix.addPathPrefix)(path, basePath));
}
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=add-base-path.js.map
}}),
"[project]/node_modules/next/dist/shared/lib/utils/warn-once.js [app-ssr] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "warnOnce", {
    enumerable: true,
    get: function() {
        return warnOnce;
    }
});
let warnOnce = (_)=>{};
if ("TURBOPACK compile-time truthy", 1) {
    const warnings = new Set();
    warnOnce = (msg)=>{
        if (!warnings.has(msg)) {
            console.warn(msg);
        }
        warnings.add(msg);
    };
} //# sourceMappingURL=warn-once.js.map
}}),
"[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
'use client';
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _interop_require_default = __turbopack_require__("[project]/node_modules/@swc/helpers/cjs/_interop_require_default.cjs [app-ssr] (ecmascript)");
const _jsxruntime = __turbopack_require__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-runtime.js [app-ssr] (ecmascript)");
const _react = /*#__PURE__*/ _interop_require_default._(__turbopack_require__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)"));
const _formaturl = __turbopack_require__("[project]/node_modules/next/dist/shared/lib/router/utils/format-url.js [app-ssr] (ecmascript)");
const _approutercontextsharedruntime = __turbopack_require__("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/contexts/app-router-context.js [app-ssr] (ecmascript)");
const _useintersection = __turbopack_require__("[project]/node_modules/next/dist/client/use-intersection.js [app-ssr] (ecmascript)");
const _routerreducertypes = __turbopack_require__("[project]/node_modules/next/dist/client/components/router-reducer/router-reducer-types.js [app-ssr] (ecmascript)");
const _usemergedref = __turbopack_require__("[project]/node_modules/next/dist/client/use-merged-ref.js [app-ssr] (ecmascript)");
const _utils = __turbopack_require__("[project]/node_modules/next/dist/shared/lib/utils.js [app-ssr] (ecmascript)");
const _addbasepath = __turbopack_require__("[project]/node_modules/next/dist/client/add-base-path.js [app-ssr] (ecmascript)");
const _warnonce = __turbopack_require__("[project]/node_modules/next/dist/shared/lib/utils/warn-once.js [app-ssr] (ecmascript)");
function prefetch(router, href, options) {
    if (typeof window === 'undefined') {
        return;
    }
    const doPrefetch = async ()=>{
        // note that `appRouter.prefetch()` is currently sync,
        // so we have to wrap this call in an async function to be able to catch() errors below.
        return router.prefetch(href, options);
    };
    // Prefetch the page if asked (only in the client)
    // We need to handle a prefetch error here since we may be
    // loading with priority which can reject but we don't
    // want to force navigation since this is only a prefetch
    doPrefetch().catch((err)=>{
        if (("TURBOPACK compile-time value", "development") !== 'production') {
            // rethrow to show invalid URL errors
            throw err;
        }
    });
}
function isModifiedEvent(event) {
    const eventTarget = event.currentTarget;
    const target = eventTarget.getAttribute('target');
    return target && target !== '_self' || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || // triggers resource download
    event.nativeEvent && event.nativeEvent.which === 2;
}
function linkClicked(e, router, href, as, replace, shallow, scroll) {
    const { nodeName } = e.currentTarget;
    // anchors inside an svg have a lowercase nodeName
    const isAnchorNodeName = nodeName.toUpperCase() === 'A';
    if (isAnchorNodeName && isModifiedEvent(e)) {
        // ignore click for browser’s default behavior
        return;
    }
    e.preventDefault();
    const navigate = ()=>{
        // If the router is an NextRouter instance it will have `beforePopState`
        const routerScroll = scroll != null ? scroll : true;
        if ('beforePopState' in router) {
            router[replace ? 'replace' : 'push'](href, as, {
                shallow,
                scroll: routerScroll
            });
        } else {
            router[replace ? 'replace' : 'push'](as || href, {
                scroll: routerScroll
            });
        }
    };
    _react.default.startTransition(navigate);
}
function formatStringOrUrl(urlObjOrString) {
    if (typeof urlObjOrString === 'string') {
        return urlObjOrString;
    }
    return (0, _formaturl.formatUrl)(urlObjOrString);
}
/**
 * A React component that extends the HTML `<a>` element to provide [prefetching](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#2-prefetching)
 * and client-side navigation between routes.
 *
 * It is the primary way to navigate between routes in Next.js.
 *
 * Read more: [Next.js docs: `<Link>`](https://nextjs.org/docs/app/api-reference/components/link)
 */ const Link = /*#__PURE__*/ _react.default.forwardRef(function LinkComponent(props, forwardedRef) {
    let children;
    const { href: hrefProp, as: asProp, children: childrenProp, prefetch: prefetchProp = null, passHref, replace, shallow, scroll, onClick, onMouseEnter: onMouseEnterProp, onTouchStart: onTouchStartProp, legacyBehavior = false, ...restProps } = props;
    children = childrenProp;
    if (legacyBehavior && (typeof children === 'string' || typeof children === 'number')) {
        children = /*#__PURE__*/ (0, _jsxruntime.jsx)("a", {
            children: children
        });
    }
    const router = _react.default.useContext(_approutercontextsharedruntime.AppRouterContext);
    const prefetchEnabled = prefetchProp !== false;
    /**
     * The possible states for prefetch are:
     * - null: this is the default "auto" mode, where we will prefetch partially if the link is in the viewport
     * - true: we will prefetch if the link is visible and prefetch the full page, not just partially
     * - false: we will not prefetch if in the viewport at all
     */ const appPrefetchKind = prefetchProp === null ? _routerreducertypes.PrefetchKind.AUTO : _routerreducertypes.PrefetchKind.FULL;
    if ("TURBOPACK compile-time truthy", 1) {
        function createPropError(args) {
            return new Error("Failed prop type: The prop `" + args.key + "` expects a " + args.expected + " in `<Link>`, but got `" + args.actual + "` instead." + (typeof window !== 'undefined' ? "\nOpen your browser's console to view the Component stack trace." : ''));
        }
        // TypeScript trick for type-guarding:
        const requiredPropsGuard = {
            href: true
        };
        const requiredProps = Object.keys(requiredPropsGuard);
        requiredProps.forEach((key)=>{
            if (key === 'href') {
                if (props[key] == null || typeof props[key] !== 'string' && typeof props[key] !== 'object') {
                    throw createPropError({
                        key,
                        expected: '`string` or `object`',
                        actual: props[key] === null ? 'null' : typeof props[key]
                    });
                }
            } else {
                // TypeScript trick for type-guarding:
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const _ = key;
            }
        });
        // TypeScript trick for type-guarding:
        const optionalPropsGuard = {
            as: true,
            replace: true,
            scroll: true,
            shallow: true,
            passHref: true,
            prefetch: true,
            onClick: true,
            onMouseEnter: true,
            onTouchStart: true,
            legacyBehavior: true
        };
        const optionalProps = Object.keys(optionalPropsGuard);
        optionalProps.forEach((key)=>{
            const valType = typeof props[key];
            if (key === 'as') {
                if (props[key] && valType !== 'string' && valType !== 'object') {
                    throw createPropError({
                        key,
                        expected: '`string` or `object`',
                        actual: valType
                    });
                }
            } else if (key === 'onClick' || key === 'onMouseEnter' || key === 'onTouchStart') {
                if (props[key] && valType !== 'function') {
                    throw createPropError({
                        key,
                        expected: '`function`',
                        actual: valType
                    });
                }
            } else if (key === 'replace' || key === 'scroll' || key === 'shallow' || key === 'passHref' || key === 'prefetch' || key === 'legacyBehavior') {
                if (props[key] != null && valType !== 'boolean') {
                    throw createPropError({
                        key,
                        expected: '`boolean`',
                        actual: valType
                    });
                }
            } else {
                // TypeScript trick for type-guarding:
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const _ = key;
            }
        });
    }
    if ("TURBOPACK compile-time truthy", 1) {
        if (props.locale) {
            (0, _warnonce.warnOnce)('The `locale` prop is not supported in `next/link` while using the `app` router. Read more about app router internalization: https://nextjs.org/docs/app/building-your-application/routing/internationalization');
        }
        if (!asProp) {
            let href;
            if (typeof hrefProp === 'string') {
                href = hrefProp;
            } else if (typeof hrefProp === 'object' && typeof hrefProp.pathname === 'string') {
                href = hrefProp.pathname;
            }
            if (href) {
                const hasDynamicSegment = href.split('/').some((segment)=>segment.startsWith('[') && segment.endsWith(']'));
                if (hasDynamicSegment) {
                    throw new Error("Dynamic href `" + href + "` found in <Link> while using the `/app` router, this is not supported. Read more: https://nextjs.org/docs/messages/app-dir-dynamic-href");
                }
            }
        }
    }
    const { href, as } = _react.default.useMemo(()=>{
        const resolvedHref = formatStringOrUrl(hrefProp);
        return {
            href: resolvedHref,
            as: asProp ? formatStringOrUrl(asProp) : resolvedHref
        };
    }, [
        hrefProp,
        asProp
    ]);
    const previousHref = _react.default.useRef(href);
    const previousAs = _react.default.useRef(as);
    // This will return the first child, if multiple are provided it will throw an error
    let child;
    if (legacyBehavior) {
        if ("TURBOPACK compile-time truthy", 1) {
            if (onClick) {
                console.warn('"onClick" was passed to <Link> with `href` of `' + hrefProp + '` but "legacyBehavior" was set. The legacy behavior requires onClick be set on the child of next/link');
            }
            if (onMouseEnterProp) {
                console.warn('"onMouseEnter" was passed to <Link> with `href` of `' + hrefProp + '` but "legacyBehavior" was set. The legacy behavior requires onMouseEnter be set on the child of next/link');
            }
            try {
                child = _react.default.Children.only(children);
            } catch (err) {
                if (!children) {
                    throw new Error("No children were passed to <Link> with `href` of `" + hrefProp + "` but one child is required https://nextjs.org/docs/messages/link-no-children");
                }
                throw new Error("Multiple children were passed to <Link> with `href` of `" + hrefProp + "` but only one child is supported https://nextjs.org/docs/messages/link-multiple-children" + (typeof window !== 'undefined' ? " \nOpen your browser's console to view the Component stack trace." : ''));
            }
        } else {
            "TURBOPACK unreachable";
        }
    } else {
        if ("TURBOPACK compile-time truthy", 1) {
            if ((children == null ? void 0 : children.type) === 'a') {
                throw new Error('Invalid <Link> with <a> child. Please remove <a> or use <Link legacyBehavior>.\nLearn more: https://nextjs.org/docs/messages/invalid-new-link-with-extra-anchor');
            }
        }
    }
    const childRef = legacyBehavior ? child && typeof child === 'object' && child.ref : forwardedRef;
    const [setIntersectionRef, isVisible, resetVisible] = (0, _useintersection.useIntersection)({
        rootMargin: '200px'
    });
    const setIntersectionWithResetRef = _react.default.useCallback((el)=>{
        // Before the link getting observed, check if visible state need to be reset
        if (previousAs.current !== as || previousHref.current !== href) {
            resetVisible();
            previousAs.current = as;
            previousHref.current = href;
        }
        setIntersectionRef(el);
    }, [
        as,
        href,
        resetVisible,
        setIntersectionRef
    ]);
    const setRef = (0, _usemergedref.useMergedRef)(setIntersectionWithResetRef, childRef);
    // Prefetch the URL if we haven't already and it's visible.
    _react.default.useEffect(()=>{
        // in dev, we only prefetch on hover to avoid wasting resources as the prefetch will trigger compiling the page.
        if ("TURBOPACK compile-time truthy", 1) {
            return;
        }
        "TURBOPACK unreachable";
    }, [
        as,
        href,
        isVisible,
        prefetchEnabled,
        router,
        appPrefetchKind
    ]);
    const childProps = {
        ref: setRef,
        onClick (e) {
            if ("TURBOPACK compile-time truthy", 1) {
                if (!e) {
                    throw new Error('Component rendered inside next/link has to pass click event to "onClick" prop.');
                }
            }
            if (!legacyBehavior && typeof onClick === 'function') {
                onClick(e);
            }
            if (legacyBehavior && child.props && typeof child.props.onClick === 'function') {
                child.props.onClick(e);
            }
            if (!router) {
                return;
            }
            if (e.defaultPrevented) {
                return;
            }
            linkClicked(e, router, href, as, replace, shallow, scroll);
        },
        onMouseEnter (e) {
            if (!legacyBehavior && typeof onMouseEnterProp === 'function') {
                onMouseEnterProp(e);
            }
            if (legacyBehavior && child.props && typeof child.props.onMouseEnter === 'function') {
                child.props.onMouseEnter(e);
            }
            if (!router) {
                return;
            }
            if ("TURBOPACK compile-time truthy", 1) {
                return;
            }
            "TURBOPACK unreachable";
        },
        onTouchStart: ("TURBOPACK compile-time falsy", 0) ? ("TURBOPACK unreachable", undefined) : function onTouchStart(e) {
            if (!legacyBehavior && typeof onTouchStartProp === 'function') {
                onTouchStartProp(e);
            }
            if (legacyBehavior && child.props && typeof child.props.onTouchStart === 'function') {
                child.props.onTouchStart(e);
            }
            if (!router) {
                return;
            }
            if (!prefetchEnabled) {
                return;
            }
            prefetch(router, href, {
                kind: appPrefetchKind
            });
        }
    };
    // If child is an <a> tag and doesn't have a href attribute, or if the 'passHref' property is
    // defined, we specify the current 'href', so that repetition is not needed by the user.
    // If the url is absolute, we can bypass the logic to prepend the basePath.
    if ((0, _utils.isAbsoluteUrl)(as)) {
        childProps.href = as;
    } else if (!legacyBehavior || passHref || child.type === 'a' && !('href' in child.props)) {
        childProps.href = (0, _addbasepath.addBasePath)(as);
    }
    return legacyBehavior ? /*#__PURE__*/ _react.default.cloneElement(child, childProps) : /*#__PURE__*/ (0, _jsxruntime.jsx)("a", {
        ...restProps,
        ...childProps,
        children: children
    });
});
const _default = Link;
if ((typeof exports.default === 'function' || typeof exports.default === 'object' && exports.default !== null) && typeof exports.default.__esModule === 'undefined') {
    Object.defineProperty(exports.default, '__esModule', {
        value: true
    });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
} //# sourceMappingURL=link.js.map
}}),

};

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__e4afb6._.js.map