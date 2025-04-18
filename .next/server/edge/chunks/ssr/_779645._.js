(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["chunks/ssr/_779645._.js", {

"[project]/public/HelperScripts/skillTags.ts [app-edge-ssr] (ecmascript)": ((__turbopack_context__) => {
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
"[project]/public/HelperScripts/Present.ts [app-edge-ssr] (ecmascript)": ((__turbopack_context__) => {
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
"[project]/public/HelperScripts/ImageHandler.ts [app-edge-ssr] (ecmascript)": ((__turbopack_context__) => {
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
"[project]/public/HelperScripts/Elements.ts [app-edge-ssr] (ecmascript)": ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Present$2e$ts__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/public/HelperScripts/Present.ts [app-edge-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Editor$2e$ts__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/public/HelperScripts/Editor.ts [app-edge-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$skillTags$2e$ts__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/public/HelperScripts/skillTags.ts [app-edge-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$ImageHandler$2e$ts__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/public/HelperScripts/ImageHandler.ts [app-edge-ssr] (ecmascript)");
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
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Editor$2e$ts__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["EditText"])(self);
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
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Editor$2e$ts__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["EditText"])(self);
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
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Editor$2e$ts__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["EditText"])(self);
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
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Editor$2e$ts__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["EditText"])(self);
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
        this.address = (0, __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$skillTags$2e$ts__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["GetAddressFromSkillName"])(this.name);
        this.parent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$skillTags$2e$ts__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["SetParentSkill"])(this.name);
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
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$ImageHandler$2e$ts__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["ImageSetupFromRawAddress"])(img, this.address);
        let name = document.createElement("p");
        img.classList.add("skillImage");
        name.classList.add("skillText");
        name.textContent = this.name;
        name.addEventListener('click', function() {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Editor$2e$ts__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["RemoveFromSkillsBox"])(parentSkillsBox, name.textContent);
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
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$ImageHandler$2e$ts__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["ImageSetupFromRawAddress"])(img, this.address);
        let name = document.createElement("p");
        img.classList.add("skillImage");
        name.classList.add("skillText");
        name.textContent = this.name;
        name.addEventListener('click', function() {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Present$2e$ts__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["FilterBySkills"])(name.textContent);
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
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Editor$2e$ts__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["DeleteTemporary"])();
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Editor$2e$ts__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["SkillDropDownMenu"])("", parent, skillsCopy);
        });
        addButton.addEventListener('click', function() {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Editor$2e$ts__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["DeleteTemporary"])();
        });
        parent.appendChild(addButton);
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "|Remove skills box|";
        let indexCopy = this.index;
        deleteButton.addEventListener('click', function() {
            __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Editor$2e$ts__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["resume"].splice(indexCopy, 1);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Editor$2e$ts__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["DisplayResume"])();
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
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Editor$2e$ts__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["DeleteTemporary"])();
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Editor$2e$ts__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["SkillDropDownMenu"])("", parent, skillsCopy);
        });
        addButton.addEventListener('click', function() {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Editor$2e$ts__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["DeleteTemporary"])();
        });
        parent.appendChild(addButton);
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "|Remove skills box|";
        let indexCopy = this.index;
        deleteButton.addEventListener('click', function() {
            __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Editor$2e$ts__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["resume"].splice(indexCopy, 1);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Editor$2e$ts__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["DisplayResume"])();
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
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Editor$2e$ts__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["EditText"])(self);
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
            //console.log(this.elements[i]);
            let child = groupDiv.appendChild(this.elements[i].ConvertToHTML());
            child.appendChild(GroupMovementButtons(this.elements[i].index, this));
        }
        let removeButton = document.createElement("p");
        removeButton.textContent = "|remove group|";
        let indexCopy = this.index;
        removeButton.addEventListener('click', function() {
            __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Editor$2e$ts__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["resume"].splice(indexCopy, 1);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Editor$2e$ts__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["DisplayResume"])();
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
        __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Editor$2e$ts__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["resume"].splice(groupBox.index, 0, holdThis);
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Editor$2e$ts__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["DisplayResume"])();
}
function MoveDown(index, groupBox) {
    if (!(index == groupBox.index + groupBox.elements.length)) {
        let holdThis = groupBox.elements[index - 1 - groupBox.index];
        groupBox.elements[index - 1 - groupBox.index] = groupBox.elements[index - groupBox.index];
        groupBox.elements[index - groupBox.index] = holdThis;
    } else {
        //console.log("move out from bottom");
        let holdThis = groupBox.elements[index - 1 - groupBox.index];
        groupBox.elements.splice(groupBox.elements.length - 1, 1);
        __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Editor$2e$ts__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["resume"].splice(groupBox.index + groupBox.elements.length, 0, holdThis);
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Editor$2e$ts__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["DisplayResume"])();
}
}}),
"[project]/public/HelperScripts/Editor.ts [app-edge-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
// puts the resume onto the website.
__turbopack_esm__({
    "CreateMovementButtons": (()=>CreateMovementButtons),
    "DeleteTemporary": (()=>DeleteTemporary),
    "DisplayResume": (()=>DisplayResume),
    "EditText": (()=>EditText),
    "LoadExistingResumeCookie": (()=>LoadExistingResumeCookie),
    "RemoveFromSkillsBox": (()=>RemoveFromSkillsBox),
    "Setup": (()=>Setup),
    "SkillDropDownMenu": (()=>SkillDropDownMenu),
    "resume": (()=>resume)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$skillTags$2e$ts__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/public/HelperScripts/skillTags.ts [app-edge-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Elements$2e$ts__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/public/HelperScripts/Elements.ts [app-edge-ssr] (ecmascript)");
;
;
let listOfSkills = (0, __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$skillTags$2e$ts__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["ArrayToSkillType"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$skillTags$2e$ts__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["GetSavedSkillList"])());
let resume = [];
function Setup() {
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
    //console.log(listOfSkills);
    LoadExistingResumeCookie();
    DisplayResume();
}
function LoadExistingResumeCookie() {
    const listOfCookies = decodeURIComponent(document.cookie).split(";");
    for(let i = 0; i < listOfCookies.length; i++){
        if (listOfCookies[i].indexOf("element") == 0 || listOfCookies[i].indexOf("element") == 1) {
            let intermediate = listOfCookies[i].split("=");
            let generic = JSON.parse(intermediate[1]);
            //console.log(intermediate[1])
            switch(generic.type){
                case "Title":
                    {
                        let cookieObj = new __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Elements$2e$ts__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["Title"](generic.index);
                        cookieObj.text = generic.text;
                        cookieObj.cssOptions = generic.cssOptions;
                        resume.push(cookieObj);
                        break;
                    }
                case "Subtitle":
                    {
                        let cookieObj = new __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Elements$2e$ts__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["Subtitle"](generic.index);
                        cookieObj.text = generic.text;
                        cookieObj.cssOptions = generic.cssOptions;
                        resume.push(cookieObj);
                        break;
                    }
                case "DateText":
                    {
                        let cookieObj = new __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Elements$2e$ts__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["DateText"](generic.index);
                        cookieObj.text = generic.text;
                        cookieObj.cssOptions = generic.cssOptions;
                        resume.push(cookieObj);
                        break;
                    }
                case "Description":
                    {
                        let cookieObj = new __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Elements$2e$ts__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["Description"](generic.index);
                        cookieObj.text = generic.text;
                        cookieObj.cssOptions = generic.cssOptions;
                        resume.push(cookieObj);
                        break;
                    }
                case "Divider":
                    {
                        let dividerObj = new __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Elements$2e$ts__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["Divider"](generic.index);
                        dividerObj.text = generic.text;
                        dividerObj.cssOptions = generic.cssOptions;
                        resume.push(dividerObj);
                        break;
                    }
                case "SkillsBox":
                    {
                        let cookieObj = new __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Elements$2e$ts__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["SkillsBox"](generic.index);
                        //console.log(cookieObj)
                        cookieObj.text = generic.text;
                        cookieObj.cssOptions = generic.cssOptions;
                        let skillsArray = [];
                        for(let j = 0; j < generic.skills.length; j++){
                            let skill = new __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Elements$2e$ts__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["Skills"](generic.skills[j].name);
                            skillsArray.push(skill);
                        }
                        cookieObj.skills = skillsArray;
                        resume.push(cookieObj);
                        break;
                    }
                case "Group":
                    {
                        let groupObj = new __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Elements$2e$ts__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["Group"](generic.index);
                        for(let i = 0; i < generic.elements.length; i++){
                            // Yeah, uhh.. this is basically just the method copy pasted again.
                            // I REALLY need to clean this up and move it to another method later.
                            switch(generic.elements[i].type){
                                case "Title":
                                    {
                                        let cookieObj = new __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Elements$2e$ts__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["Title"](generic.elements[i].index);
                                        cookieObj.text = generic.elements[i].text;
                                        cookieObj.cssOptions = generic.elements[i].cssOptions;
                                        groupObj.elements.push(cookieObj);
                                        break;
                                    }
                                case "Subtitle":
                                    {
                                        let cookieObj = new __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Elements$2e$ts__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["Subtitle"](generic.elements[i].index);
                                        cookieObj.text = generic.elements[i].text;
                                        cookieObj.cssOptions = generic.elements[i].cssOptions;
                                        groupObj.elements.push(cookieObj);
                                        break;
                                    }
                                case "DateText":
                                    {
                                        let cookieObj = new __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Elements$2e$ts__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["DateText"](generic.elements[i].index);
                                        cookieObj.text = generic.elements[i].text;
                                        cookieObj.cssOptions = generic.elements[i].cssOptions;
                                        groupObj.elements.push(cookieObj);
                                        break;
                                    }
                                case "Description":
                                    {
                                        let cookieObj = new __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Elements$2e$ts__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["Description"](generic.elements[i].index);
                                        cookieObj.text = generic.elements[i].text;
                                        cookieObj.cssOptions = generic.elements[i].cssOptions;
                                        groupObj.elements.push(cookieObj);
                                        break;
                                    }
                                case "Divider":
                                    {
                                        let cookieObj = new __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Elements$2e$ts__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["Divider"](generic.elements[i].index);
                                        cookieObj.text = generic.elements[i].text;
                                        cookieObj.cssOptions = generic.elements[i].cssOptions;
                                        groupObj.elements.push(cookieObj);
                                        break;
                                    }
                                case "SkillsBox":
                                    {
                                        let cookieObj = new __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Elements$2e$ts__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["SkillsBox"](generic.elements[i].index);
                                        cookieObj.text = generic.elements[i].text;
                                        cookieObj.cssOptions = generic.elements[i].cssOptions;
                                        let skillsArray = [];
                                        for(let j = 0; j < generic.elements[i].skills.length; j++){
                                            let skill = new __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Elements$2e$ts__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["Skills"](generic.elements[i].skills[j].name);
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
function DeleteTemporary() {
    while(document.getElementById("temporary") != null){
        document.getElementById("temporary")?.remove();
    }
}
// Adds a skill to a specified list of skills if it doesn't already exist.
// this only exists because I couldn't find a better way to add to a skillbox's skills list.
function AddToSkillsBox(destination, skillName) {
    let skillToAdd = new __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Elements$2e$ts__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["Skills"](skillName);
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
function EditText(element) {
    if (document.getElementsByClassName("scanner").length == 0) {
        console.log("EditText");
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
                console.log(scanner.value);
                element.text = scanner.value;
                DeleteTemporary();
                console.log(element.index);
                if (element.text == "" || element.text == null) {
                    resume.splice(resume.indexOf(element), 1);
                }
                DisplayResume();
            }
        });
    }
}
function RemoveFromSkillsBox(destination, skillInString) {
    let skillToRemove = new __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Elements$2e$ts__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["Skills"](skillInString);
    for(let i = 0; i < destination.length; i++){
        if (destination[i].Equals(skillToRemove)) {
            destination.splice(i, 1);
            break;
        }
    }
    DisplayResume();
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
function AddRawElement(elementName) {
    switch(elementName){
        case "Title":
            {
                let newTitle = new __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Elements$2e$ts__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["Title"](resume.length);
                resume.push(newTitle);
                DisplayResume();
                break;
            }
        case "Subtitle":
            {
                let newSubtitle = new __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Elements$2e$ts__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["Subtitle"](resume.length);
                resume.push(newSubtitle);
                DisplayResume();
                break;
            }
        case "Description":
            {
                let newDesc = new __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Elements$2e$ts__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["Description"](resume.length);
                resume.push(newDesc);
                DisplayResume();
                break;
            }
        case "DateText":
            {
                let newDateText = new __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Elements$2e$ts__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["DateText"](resume.length);
                resume.push(newDateText);
                DisplayResume();
                break;
            }
        case "SkillsBox":
            {
                let newBox = new __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Elements$2e$ts__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["SkillsBox"](resume.length);
                resume.push(newBox);
                DisplayResume();
                break;
            }
        case "Divider":
            {
                let newDivider = new __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Elements$2e$ts__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["Divider"](resume.length);
                resume.push(newDivider);
                DisplayResume();
                break;
            }
        case "Experience":
            {
                let newSubtitle = new __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Elements$2e$ts__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["Subtitle"](resume.length);
                resume.push(newSubtitle);
                let newDateText = new __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Elements$2e$ts__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["DateText"](resume.length);
                resume.push(newDateText);
                let newDesc = new __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Elements$2e$ts__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["Description"](resume.length);
                resume.push(newDesc);
                let newBox = new __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Elements$2e$ts__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["SkillsBox"](resume.length);
                resume.push(newBox);
                DisplayResume();
                break;
            }
        case "Group":
            {
                let newGroup = new __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Elements$2e$ts__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["Group"](resume.length);
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
}}),
"[project]/src/app/ReactEditor/page.tsx [app-edge-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>ReaactEditor),
    "runtime": (()=>runtime)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-edge-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-edge-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$skillTags$2e$ts__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/public/HelperScripts/skillTags.ts [app-edge-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Editor$2e$ts__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/public/HelperScripts/Editor.ts [app-edge-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/client/app-dir/link.js [app-edge-ssr] (ecmascript)");
'use client';
;
;
;
;
;
const runtime = 'edge';
const isClient = ()=>"undefined" !== 'undefined';
let listOfSkills = (0, __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$skillTags$2e$ts__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["ArrayToSkillType"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$skillTags$2e$ts__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["GetSavedSkillList"])());
function ReaactEditor() {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (isClient()) {
            "TURBOPACK unreachable";
        }
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "topnav",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        children: "Resume Maker"
                    }, void 0, false, {
                        fileName: "[project]/src/app/ReactEditor/page.tsx",
                        lineNumber: 23,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        id: "save",
                        children: "|Save in browser|"
                    }, void 0, false, {
                        fileName: "[project]/src/app/ReactEditor/page.tsx",
                        lineNumber: 24,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: "/Present",
                        children: "|Present|"
                    }, void 0, false, {
                        fileName: "[project]/src/app/ReactEditor/page.tsx",
                        lineNumber: 25,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: "/Skills",
                        children: "|edit skills|"
                    }, void 0, false, {
                        fileName: "[project]/src/app/ReactEditor/page.tsx",
                        lineNumber: 26,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/ReactEditor/page.tsx",
                lineNumber: 22,
                columnNumber: 1
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "content",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    id: "app",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            id: "addElements",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: "add"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/ReactEditor/page.tsx",
                                    lineNumber: 31,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    id: "addRawSubtitle",
                                    onClick: ()=>console.log("raw subtitle"),
                                    children: "|add subtitle|"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/ReactEditor/page.tsx",
                                    lineNumber: 32,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    id: "addDivider",
                                    children: "|add divider|"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/ReactEditor/page.tsx",
                                    lineNumber: 33,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    id: "addRawDateText",
                                    children: "|add DateText|"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/ReactEditor/page.tsx",
                                    lineNumber: 34,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    id: "addRawDesc",
                                    children: "|add description|"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/ReactEditor/page.tsx",
                                    lineNumber: 35,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    id: "addRawTitle",
                                    children: "|add title|"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/ReactEditor/page.tsx",
                                    lineNumber: 36,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    id: "addSkillsBox",
                                    children: "|add skills box|"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/ReactEditor/page.tsx",
                                    lineNumber: 37,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    id: "addExperience",
                                    children: "|add experience|"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/ReactEditor/page.tsx",
                                    lineNumber: 38,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    id: "addGroup",
                                    children: "|add group box|"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/ReactEditor/page.tsx",
                                    lineNumber: 39,
                                    columnNumber: 11
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/ReactEditor/page.tsx",
                            lineNumber: 30,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            id: "Resume"
                        }, void 0, false, {
                            fileName: "[project]/src/app/ReactEditor/page.tsx",
                            lineNumber: 41,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            id: "editElements",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "edit"
                            }, void 0, false, {
                                fileName: "[project]/src/app/ReactEditor/page.tsx",
                                lineNumber: 43,
                                columnNumber: 9
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/ReactEditor/page.tsx",
                            lineNumber: 42,
                            columnNumber: 9
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            id: "editSkills",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$edge$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "skills and options n stuff."
                            }, void 0, false, {
                                fileName: "[project]/src/app/ReactEditor/page.tsx",
                                lineNumber: 46,
                                columnNumber: 9
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/app/ReactEditor/page.tsx",
                            lineNumber: 45,
                            columnNumber: 9
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/ReactEditor/page.tsx",
                    lineNumber: 29,
                    columnNumber: 7
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/ReactEditor/page.tsx",
                lineNumber: 28,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/ReactEditor/page.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, this);
}
}}),
"[project]/src/app/ReactEditor/page.tsx [app-edge-rsc] (ecmascript, Next.js server component, client modules ssr)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),
}]);

//# sourceMappingURL=_779645._.js.map