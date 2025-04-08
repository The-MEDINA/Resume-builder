(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/_0d726a._.js", {

"[project]/public/HelperScripts/Present.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
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
_c = FilterBySkills;
var _c;
__turbopack_refresh__.register(_c, "FilterBySkills");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/public/HelperScripts/skillTags.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
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
_c = GetSavedSkillList;
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
_c1 = DecodeSkillListCookie;
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
_c2 = EncodeNewCookieFromSkills;
function GetSkillFromAddress(address) {
    let skillAddress = address.split("/");
    return skillAddress[skillAddress.length - 1];
}
_c3 = GetSkillFromAddress;
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
_c4 = GetAddressFromSkillName;
function SetParentSkill(address) {
    let skillAddress = address.split("/");
    if (skillAddress.length <= 1) return "";
    else return skillAddress[skillAddress.length - 2];
}
_c5 = SetParentSkill;
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
_c6 = IsSubSkill;
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
_c7 = DefaultSkillListString;
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
_c8 = ArrayToSkillType;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8;
__turbopack_refresh__.register(_c, "GetSavedSkillList");
__turbopack_refresh__.register(_c1, "DecodeSkillListCookie");
__turbopack_refresh__.register(_c2, "EncodeNewCookieFromSkills");
__turbopack_refresh__.register(_c3, "GetSkillFromAddress");
__turbopack_refresh__.register(_c4, "GetAddressFromSkillName");
__turbopack_refresh__.register(_c5, "SetParentSkill");
__turbopack_refresh__.register(_c6, "IsSubSkill");
__turbopack_refresh__.register(_c7, "DefaultSkillListString");
__turbopack_refresh__.register(_c8, "ArrayToSkillType");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/public/HelperScripts/Editor.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
// puts the resume onto the website.
__turbopack_esm__({
    "CreateMovementButtons": (()=>CreateMovementButtons),
    "DeleteTemporary": (()=>DeleteTemporary),
    "DisplayResume": (()=>DisplayResume),
    "EditText": (()=>EditText),
    "LoadExistingResumeCookie": (()=>LoadExistingResumeCookie),
    "RemoveFromSkillsBox": (()=>RemoveFromSkillsBox),
    "SkillDropDownMenu": (()=>SkillDropDownMenu),
    "resume": (()=>resume)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$skillTags$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/public/HelperScripts/skillTags.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Elements$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/public/HelperScripts/Elements.ts [app-client] (ecmascript)");
;
;
let listOfSkills = (0, __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$skillTags$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ArrayToSkillType"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$skillTags$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GetSavedSkillList"])());
let resume = [];
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
                        let cookieObj = new __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Elements$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Title"](generic.index);
                        cookieObj.text = generic.text;
                        cookieObj.cssOptions = generic.cssOptions;
                        resume.push(cookieObj);
                        break;
                    }
                case "Subtitle":
                    {
                        let cookieObj = new __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Elements$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Subtitle"](generic.index);
                        cookieObj.text = generic.text;
                        cookieObj.cssOptions = generic.cssOptions;
                        resume.push(cookieObj);
                        break;
                    }
                case "DateText":
                    {
                        let cookieObj = new __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Elements$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DateText"](generic.index);
                        cookieObj.text = generic.text;
                        cookieObj.cssOptions = generic.cssOptions;
                        resume.push(cookieObj);
                        break;
                    }
                case "Description":
                    {
                        let cookieObj = new __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Elements$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Description"](generic.index);
                        cookieObj.text = generic.text;
                        cookieObj.cssOptions = generic.cssOptions;
                        resume.push(cookieObj);
                        break;
                    }
                case "Divider":
                    {
                        let dividerObj = new __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Elements$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Divider"](generic.index);
                        dividerObj.text = generic.text;
                        dividerObj.cssOptions = generic.cssOptions;
                        resume.push(dividerObj);
                        break;
                    }
                case "SkillsBox":
                    {
                        let cookieObj = new __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Elements$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SkillsBox"](generic.index);
                        //console.log(cookieObj)
                        cookieObj.text = generic.text;
                        cookieObj.cssOptions = generic.cssOptions;
                        let skillsArray = [];
                        for(let j = 0; j < generic.skills.length; j++){
                            let skill = new __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Elements$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skills"](generic.skills[j].name);
                            skillsArray.push(skill);
                        }
                        cookieObj.skills = skillsArray;
                        resume.push(cookieObj);
                        break;
                    }
                case "Group":
                    {
                        let groupObj = new __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Elements$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"](generic.index);
                        for(let i = 0; i < generic.elements.length; i++){
                            // Yeah, uhh.. this is basically just the method copy pasted again.
                            // I REALLY need to clean this up and move it to another method later.
                            switch(generic.elements[i].type){
                                case "Title":
                                    {
                                        let cookieObj = new __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Elements$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Title"](generic.elements[i].index);
                                        cookieObj.text = generic.elements[i].text;
                                        cookieObj.cssOptions = generic.elements[i].cssOptions;
                                        groupObj.elements.push(cookieObj);
                                        break;
                                    }
                                case "Subtitle":
                                    {
                                        let cookieObj = new __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Elements$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Subtitle"](generic.elements[i].index);
                                        cookieObj.text = generic.elements[i].text;
                                        cookieObj.cssOptions = generic.elements[i].cssOptions;
                                        groupObj.elements.push(cookieObj);
                                        break;
                                    }
                                case "DateText":
                                    {
                                        let cookieObj = new __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Elements$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DateText"](generic.elements[i].index);
                                        cookieObj.text = generic.elements[i].text;
                                        cookieObj.cssOptions = generic.elements[i].cssOptions;
                                        groupObj.elements.push(cookieObj);
                                        break;
                                    }
                                case "Description":
                                    {
                                        let cookieObj = new __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Elements$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Description"](generic.elements[i].index);
                                        cookieObj.text = generic.elements[i].text;
                                        cookieObj.cssOptions = generic.elements[i].cssOptions;
                                        groupObj.elements.push(cookieObj);
                                        break;
                                    }
                                case "Divider":
                                    {
                                        let cookieObj = new __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Elements$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Divider"](generic.elements[i].index);
                                        cookieObj.text = generic.elements[i].text;
                                        cookieObj.cssOptions = generic.elements[i].cssOptions;
                                        groupObj.elements.push(cookieObj);
                                        break;
                                    }
                                case "SkillsBox":
                                    {
                                        let cookieObj = new __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Elements$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SkillsBox"](generic.elements[i].index);
                                        cookieObj.text = generic.elements[i].text;
                                        cookieObj.cssOptions = generic.elements[i].cssOptions;
                                        let skillsArray = [];
                                        for(let j = 0; j < generic.elements[i].skills.length; j++){
                                            let skill = new __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Elements$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skills"](generic.elements[i].skills[j].name);
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
_c = LoadExistingResumeCookie;
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
_c1 = DisplayResume;
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
_c2 = CreateMovementButtons;
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
_c3 = MoveElementUp;
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
_c4 = MoveElementDown;
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
_c5 = SkillDropDownMenu;
function DeleteTemporary() {
    while(document.getElementById("temporary") != null){
        document.getElementById("temporary")?.remove();
    }
}
_c6 = DeleteTemporary;
// Adds a skill to a specified list of skills if it doesn't already exist.
// this only exists because I couldn't find a better way to add to a skillbox's skills list.
function AddToSkillsBox(destination, skillName) {
    let skillToAdd = new __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Elements$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skills"](skillName);
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
_c7 = AddToSkillsBox;
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
_c8 = EditText;
function RemoveFromSkillsBox(destination, skillInString) {
    let skillToRemove = new __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Elements$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skills"](skillInString);
    for(let i = 0; i < destination.length; i++){
        if (destination[i].Equals(skillToRemove)) {
            destination.splice(i, 1);
            break;
        }
    }
    DisplayResume();
}
_c9 = RemoveFromSkillsBox;
// Finds the element specified on the page. Returns the resume if it's not found.
function FindElementOnPage(element) {
    let ids = document.querySelectorAll("[index=\"" + element.index + "\"]");
    if (ids.length > 1 || ids.length == 0) {
        return document.getElementById("Resume");
    } else {
        return ids[0];
    }
}
_c10 = FindElementOnPage;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10;
__turbopack_refresh__.register(_c, "LoadExistingResumeCookie");
__turbopack_refresh__.register(_c1, "DisplayResume");
__turbopack_refresh__.register(_c2, "CreateMovementButtons");
__turbopack_refresh__.register(_c3, "MoveElementUp");
__turbopack_refresh__.register(_c4, "MoveElementDown");
__turbopack_refresh__.register(_c5, "SkillDropDownMenu");
__turbopack_refresh__.register(_c6, "DeleteTemporary");
__turbopack_refresh__.register(_c7, "AddToSkillsBox");
__turbopack_refresh__.register(_c8, "EditText");
__turbopack_refresh__.register(_c9, "RemoveFromSkillsBox");
__turbopack_refresh__.register(_c10, "FindElementOnPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/public/HelperScripts/ImageHandler.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
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
_c = ImageSetup;
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
_c1 = ImageSetupFromRawAddress;
// I don't know why C#.png doesn't work, or why switch/case doesn't either...
// That's the only reason for this method's existence.
// just making it a method if anything else like this shows up.
function ImageExceptions(skillImgName) {
    if (skillImgName == "C#") skillImgName = "C sharp";
    return skillImgName;
}
_c2 = ImageExceptions;
var _c, _c1, _c2;
__turbopack_refresh__.register(_c, "ImageSetup");
__turbopack_refresh__.register(_c1, "ImageSetupFromRawAddress");
__turbopack_refresh__.register(_c2, "ImageExceptions");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/public/HelperScripts/Elements.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
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
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Present$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/public/HelperScripts/Present.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/public/HelperScripts/Editor.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$skillTags$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/public/HelperScripts/skillTags.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$ImageHandler$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/public/HelperScripts/ImageHandler.ts [app-client] (ecmascript)");
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
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditText"])(self);
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
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditText"])(self);
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
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditText"])(self);
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
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditText"])(self);
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
        this.address = (0, __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$skillTags$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GetAddressFromSkillName"])(this.name);
        this.parent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$skillTags$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SetParentSkill"])(this.name);
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
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$ImageHandler$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ImageSetupFromRawAddress"])(img, this.address);
        let name = document.createElement("p");
        img.classList.add("skillImage");
        name.classList.add("skillText");
        name.textContent = this.name;
        name.addEventListener('click', function() {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RemoveFromSkillsBox"])(parentSkillsBox, name.textContent);
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
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$ImageHandler$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ImageSetupFromRawAddress"])(img, this.address);
        let name = document.createElement("p");
        img.classList.add("skillImage");
        name.classList.add("skillText");
        name.textContent = this.name;
        name.addEventListener('click', function() {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Present$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FilterBySkills"])(name.textContent);
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
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DeleteTemporary"])();
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SkillDropDownMenu"])("", parent, skillsCopy);
        });
        addButton.addEventListener('click', function() {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DeleteTemporary"])();
        });
        parent.appendChild(addButton);
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "|Remove skills box|";
        let indexCopy = this.index;
        deleteButton.addEventListener('click', function() {
            __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resume"].splice(indexCopy, 1);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DisplayResume"])();
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
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DeleteTemporary"])();
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SkillDropDownMenu"])("", parent, skillsCopy);
        });
        addButton.addEventListener('click', function() {
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DeleteTemporary"])();
        });
        parent.appendChild(addButton);
        let deleteButton = document.createElement("button");
        deleteButton.textContent = "|Remove skills box|";
        let indexCopy = this.index;
        deleteButton.addEventListener('click', function() {
            __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resume"].splice(indexCopy, 1);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DisplayResume"])();
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
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EditText"])(self);
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
            __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resume"].splice(indexCopy, 1);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DisplayResume"])();
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
_c = AddCSSFromString;
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
_c1 = GroupMovementButtons;
function MoveUp(index, groupBox) {
    if (!(index - 1 == groupBox.index)) {
        let holdThis = groupBox.elements[index - 2 - groupBox.index];
        groupBox.elements[index - 2 - groupBox.index] = groupBox.elements[index - 1 - groupBox.index];
        groupBox.elements[index - 1 - groupBox.index] = holdThis;
    } else {
        let holdThis = groupBox.elements[index - 1 - groupBox.index];
        groupBox.elements.splice(0, 1);
        __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resume"].splice(groupBox.index, 0, holdThis);
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DisplayResume"])();
}
_c2 = MoveUp;
function MoveDown(index, groupBox) {
    if (!(index == groupBox.index + groupBox.elements.length)) {
        let holdThis = groupBox.elements[index - 1 - groupBox.index];
        groupBox.elements[index - 1 - groupBox.index] = groupBox.elements[index - groupBox.index];
        groupBox.elements[index - groupBox.index] = holdThis;
    } else {
        //console.log("move out from bottom");
        let holdThis = groupBox.elements[index - 1 - groupBox.index];
        groupBox.elements.splice(groupBox.elements.length - 1, 1);
        __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resume"].splice(groupBox.index + groupBox.elements.length, 0, holdThis);
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Editor$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DisplayResume"])();
}
_c3 = MoveDown;
var _c, _c1, _c2, _c3;
__turbopack_refresh__.register(_c, "AddCSSFromString");
__turbopack_refresh__.register(_c1, "GroupMovementButtons");
__turbopack_refresh__.register(_c2, "MoveUp");
__turbopack_refresh__.register(_c3, "MoveDown");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/Present/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>NewDisplay)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Elements$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/public/HelperScripts/Elements.ts [app-client] (ecmascript)");
'use client';
;
;
//import { FilterBySkills } from "../../../public/HelperScripts/Present";
let presentResume = [];
let searchBySkills = [];
function NewDisplay() {
    document.onreadystatechange = function() {
        if (typeof document != undefined && document.readyState == "complete") {
            document.getElementById("print")?.addEventListener('click', function() {
                PrintResume();
            });
            LoadExistingResumeCookie();
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "topnav",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        children: "Resume Maker"
                    }, void 0, false, {
                        fileName: "[project]/src/app/Present/page.tsx",
                        lineNumber: 17,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        id: "print",
                        children: " |print|"
                    }, void 0, false, {
                        fileName: "[project]/src/app/Present/page.tsx",
                        lineNumber: 18,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/Present/page.tsx",
                lineNumber: 16,
                columnNumber: 1
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "content",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    id: "app"
                }, void 0, false, {
                    fileName: "[project]/src/app/Present/page.tsx",
                    lineNumber: 21,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/Present/page.tsx",
                lineNumber: 20,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/Present/page.tsx",
        lineNumber: 15,
        columnNumber: 5
    }, this);
}
_c = NewDisplay;
// does the same thing as the function on the editor side.
// I should.. make it return something instead of copy-pasting it.
// I'll do it later (never)
function LoadExistingResumeCookie() {
    const listOfCookies = decodeURIComponent(document.cookie).split(";");
    for(let i = 0; i < listOfCookies.length; i++){
        if (listOfCookies[i].indexOf("element") == 0 || listOfCookies[i].indexOf("element") == 1) {
            let intermediate = listOfCookies[i].split("=");
            let generic = JSON.parse(intermediate[1]);
            switch(generic.type){
                case "Title":
                    {
                        let cookieObj = new __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Elements$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Title"](generic.index);
                        cookieObj.text = generic.text;
                        cookieObj.cssOptions = generic.cssOptions;
                        presentResume.push(cookieObj);
                        break;
                    }
                case "Subtitle":
                    {
                        let cookieObj = new __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Elements$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Subtitle"](generic.index);
                        cookieObj.text = generic.text;
                        cookieObj.cssOptions = generic.cssOptions;
                        presentResume.push(cookieObj);
                        break;
                    }
                case "DateText":
                    {
                        let cookieObj = new __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Elements$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DateText"](generic.index);
                        cookieObj.text = generic.text;
                        cookieObj.cssOptions = generic.cssOptions;
                        presentResume.push(cookieObj);
                        break;
                    }
                case "Description":
                    {
                        let cookieObj = new __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Elements$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Description"](generic.index);
                        cookieObj.text = generic.text;
                        cookieObj.cssOptions = generic.cssOptions;
                        presentResume.push(cookieObj);
                        break;
                    }
                case "Divider":
                    {
                        let dividerObj = new __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Elements$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Divider"](generic.index);
                        dividerObj.text = generic.text;
                        dividerObj.cssOptions = generic.cssOptions;
                        presentResume.push(dividerObj);
                        break;
                    }
                case "SkillsBox":
                    {
                        let cookieObj = new __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Elements$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SkillsBox"](generic.index);
                        cookieObj.text = generic.text;
                        cookieObj.cssOptions = generic.cssOptions;
                        let skillsArray = [];
                        for(let j = 0; j < generic.skills.length; j++){
                            let skill = new __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Elements$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skills"](generic.skills[j].name);
                            skillsArray.push(skill);
                        }
                        cookieObj.skills = skillsArray;
                        presentResume.push(cookieObj);
                        break;
                    }
                case "Group":
                    {
                        let groupObj = new __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Elements$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"](generic.index);
                        for(let i = 0; i < generic.elements.length; i++){
                            // Yeah, uhh.. this is basically just the method copy pasted again.
                            // I REALLY need to clean this up and move it to another method later.
                            switch(generic.elements[i].type){
                                case "Title":
                                    {
                                        let cookieObj = new __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Elements$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Title"](generic.elements[i].index);
                                        cookieObj.text = generic.elements[i].text;
                                        cookieObj.cssOptions = generic.elements[i].cssOptions;
                                        groupObj.elements.push(cookieObj);
                                        break;
                                    }
                                case "Subtitle":
                                    {
                                        let cookieObj = new __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Elements$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Subtitle"](generic.elements[i].index);
                                        cookieObj.text = generic.elements[i].text;
                                        cookieObj.cssOptions = generic.elements[i].cssOptions;
                                        groupObj.elements.push(cookieObj);
                                        break;
                                    }
                                case "DateText":
                                    {
                                        let cookieObj = new __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Elements$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DateText"](generic.elements[i].index);
                                        cookieObj.text = generic.elements[i].text;
                                        cookieObj.cssOptions = generic.elements[i].cssOptions;
                                        groupObj.elements.push(cookieObj);
                                        break;
                                    }
                                case "Description":
                                    {
                                        let cookieObj = new __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Elements$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Description"](generic.elements[i].index);
                                        cookieObj.text = generic.elements[i].text;
                                        cookieObj.cssOptions = generic.elements[i].cssOptions;
                                        groupObj.elements.push(cookieObj);
                                        break;
                                    }
                                case "Divider":
                                    {
                                        let cookieObj = new __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Elements$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Divider"](generic.elements[i].index);
                                        cookieObj.text = generic.elements[i].text;
                                        cookieObj.cssOptions = generic.elements[i].cssOptions;
                                        groupObj.elements.push(cookieObj);
                                        break;
                                    }
                                case "SkillsBox":
                                    {
                                        let cookieObj = new __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Elements$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SkillsBox"](generic.elements[i].index);
                                        cookieObj.text = generic.elements[i].text;
                                        cookieObj.cssOptions = generic.elements[i].cssOptions;
                                        let skillsArray = [];
                                        for(let j = 0; j < generic.elements[i].skills.length; j++){
                                            let skill = new __TURBOPACK__imported__module__$5b$project$5d2f$public$2f$HelperScripts$2f$Elements$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Skills"](generic.elements[i].skills[j].name);
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
                default:
                    {
                        throw new Error("Could not find a matching object for " + generic.type);
                    }
            }
        }
    }
    PresentResume();
}
_c1 = LoadExistingResumeCookie;
// brings up a printing dialog for the resume.
function PrintResume() {
    document.getElementsByClassName("topnav")[0].remove();
    const content = document.getElementsByClassName("content");
    content[0].classList.remove("content");
    print();
}
_c2 = PrintResume;
function PresentResume() {
    for(let i = 0; i < presentResume.length; i++){
        if (presentResume[i].type == "SkillsBox") {
            document.getElementById("app")?.appendChild(presentResume[i].ConvertToHTMLForPresentPage());
        } else {
            let element;
            if (presentResume[i].type == "Group") {
                let groupDiv = document.createElement("div");
                for(let j = 0; j < presentResume[i].elements.length; j++){
                    // change this later to not be so nasty oml
                    // (condense some of these if/else statements jeez)
                    // this is some HIDEOUS programming tbh... but I mean, it gets the job done.
                    if (presentResume[i].elements[j].type == "SkillsBox") {
                        element = groupDiv.appendChild(presentResume[i].elements[j].ConvertToHTMLForPresentPage());
                    } else {
                        element = groupDiv.appendChild(presentResume[i].elements[j].ConvertToHTML());
                    }
                    document.getElementById("app")?.appendChild(groupDiv);
                    element.animate([
                        {
                            paddingTop: "10px",
                            opacity: 0
                        },
                        {
                            paddingTop: "0px",
                            opacity: 1
                        }
                    ], {
                        duration: 500,
                        easing: "ease-out"
                    });
                }
            } else {
                element = document.getElementById("app")?.appendChild(presentResume[i].ConvertToHTML());
                element.animate([
                    {
                        paddingTop: "10px",
                        opacity: 0
                    },
                    {
                        paddingTop: "0px",
                        opacity: 1
                    }
                ], {
                    duration: 500,
                    easing: "ease-out"
                });
            }
        // so for animating you might wanna reference these links:
        // https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Using_the_Web_Animations_API
        // https://stackoverflow.com/questions/18481550/how-to-dynamically-create-keyframe-css-animations
        }
    }
}
_c3 = PresentResume;
var _c, _c1, _c2, _c3;
__turbopack_refresh__.register(_c, "NewDisplay");
__turbopack_refresh__.register(_c1, "LoadExistingResumeCookie");
__turbopack_refresh__.register(_c2, "PrintResume");
__turbopack_refresh__.register(_c3, "PresentResume");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/Present/page.tsx [app-rsc] (ecmascript, Next.js server component, client modules)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),
"[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE$2 ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_CONTEXT_TYPE:
                return (type.displayName || "Context") + ".Provider";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function disabledLog() {}
    function disableLogs() {
        if (0 === disabledDepth) {
            prevLog = console.log;
            prevInfo = console.info;
            prevWarn = console.warn;
            prevError = console.error;
            prevGroup = console.group;
            prevGroupCollapsed = console.groupCollapsed;
            prevGroupEnd = console.groupEnd;
            var props = {
                configurable: !0,
                enumerable: !0,
                value: disabledLog,
                writable: !0
            };
            Object.defineProperties(console, {
                info: props,
                log: props,
                warn: props,
                error: props,
                group: props,
                groupCollapsed: props,
                groupEnd: props
            });
        }
        disabledDepth++;
    }
    function reenableLogs() {
        disabledDepth--;
        if (0 === disabledDepth) {
            var props = {
                configurable: !0,
                enumerable: !0,
                writable: !0
            };
            Object.defineProperties(console, {
                log: assign({}, props, {
                    value: prevLog
                }),
                info: assign({}, props, {
                    value: prevInfo
                }),
                warn: assign({}, props, {
                    value: prevWarn
                }),
                error: assign({}, props, {
                    value: prevError
                }),
                group: assign({}, props, {
                    value: prevGroup
                }),
                groupCollapsed: assign({}, props, {
                    value: prevGroupCollapsed
                }),
                groupEnd: assign({}, props, {
                    value: prevGroupEnd
                })
            });
        }
        0 > disabledDepth && console.error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
    }
    function describeBuiltInComponentFrame(name) {
        if (void 0 === prefix) try {
            throw Error();
        } catch (x) {
            var match = x.stack.trim().match(/\n( *(at )?)/);
            prefix = match && match[1] || "";
            suffix = -1 < x.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < x.stack.indexOf("@") ? "@unknown:0:0" : "";
        }
        return "\n" + prefix + name + suffix;
    }
    function describeNativeComponentFrame(fn, construct) {
        if (!fn || reentry) return "";
        var frame = componentFrameCache.get(fn);
        if (void 0 !== frame) return frame;
        reentry = !0;
        frame = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        var previousDispatcher = null;
        previousDispatcher = ReactSharedInternals.H;
        ReactSharedInternals.H = null;
        disableLogs();
        try {
            var RunInRootFrame = {
                DetermineComponentFrameRoot: function() {
                    try {
                        if (construct) {
                            var Fake = function() {
                                throw Error();
                            };
                            Object.defineProperty(Fake.prototype, "props", {
                                set: function() {
                                    throw Error();
                                }
                            });
                            if ("object" === typeof Reflect && Reflect.construct) {
                                try {
                                    Reflect.construct(Fake, []);
                                } catch (x) {
                                    var control = x;
                                }
                                Reflect.construct(fn, [], Fake);
                            } else {
                                try {
                                    Fake.call();
                                } catch (x$0) {
                                    control = x$0;
                                }
                                fn.call(Fake.prototype);
                            }
                        } else {
                            try {
                                throw Error();
                            } catch (x$1) {
                                control = x$1;
                            }
                            (Fake = fn()) && "function" === typeof Fake.catch && Fake.catch(function() {});
                        }
                    } catch (sample) {
                        if (sample && control && "string" === typeof sample.stack) return [
                            sample.stack,
                            control.stack
                        ];
                    }
                    return [
                        null,
                        null
                    ];
                }
            };
            RunInRootFrame.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
            var namePropDescriptor = Object.getOwnPropertyDescriptor(RunInRootFrame.DetermineComponentFrameRoot, "name");
            namePropDescriptor && namePropDescriptor.configurable && Object.defineProperty(RunInRootFrame.DetermineComponentFrameRoot, "name", {
                value: "DetermineComponentFrameRoot"
            });
            var _RunInRootFrame$Deter = RunInRootFrame.DetermineComponentFrameRoot(), sampleStack = _RunInRootFrame$Deter[0], controlStack = _RunInRootFrame$Deter[1];
            if (sampleStack && controlStack) {
                var sampleLines = sampleStack.split("\n"), controlLines = controlStack.split("\n");
                for(_RunInRootFrame$Deter = namePropDescriptor = 0; namePropDescriptor < sampleLines.length && !sampleLines[namePropDescriptor].includes("DetermineComponentFrameRoot");)namePropDescriptor++;
                for(; _RunInRootFrame$Deter < controlLines.length && !controlLines[_RunInRootFrame$Deter].includes("DetermineComponentFrameRoot");)_RunInRootFrame$Deter++;
                if (namePropDescriptor === sampleLines.length || _RunInRootFrame$Deter === controlLines.length) for(namePropDescriptor = sampleLines.length - 1, _RunInRootFrame$Deter = controlLines.length - 1; 1 <= namePropDescriptor && 0 <= _RunInRootFrame$Deter && sampleLines[namePropDescriptor] !== controlLines[_RunInRootFrame$Deter];)_RunInRootFrame$Deter--;
                for(; 1 <= namePropDescriptor && 0 <= _RunInRootFrame$Deter; namePropDescriptor--, _RunInRootFrame$Deter--)if (sampleLines[namePropDescriptor] !== controlLines[_RunInRootFrame$Deter]) {
                    if (1 !== namePropDescriptor || 1 !== _RunInRootFrame$Deter) {
                        do if (namePropDescriptor--, _RunInRootFrame$Deter--, 0 > _RunInRootFrame$Deter || sampleLines[namePropDescriptor] !== controlLines[_RunInRootFrame$Deter]) {
                            var _frame = "\n" + sampleLines[namePropDescriptor].replace(" at new ", " at ");
                            fn.displayName && _frame.includes("<anonymous>") && (_frame = _frame.replace("<anonymous>", fn.displayName));
                            "function" === typeof fn && componentFrameCache.set(fn, _frame);
                            return _frame;
                        }
                        while (1 <= namePropDescriptor && 0 <= _RunInRootFrame$Deter)
                    }
                    break;
                }
            }
        } finally{
            reentry = !1, ReactSharedInternals.H = previousDispatcher, reenableLogs(), Error.prepareStackTrace = frame;
        }
        sampleLines = (sampleLines = fn ? fn.displayName || fn.name : "") ? describeBuiltInComponentFrame(sampleLines) : "";
        "function" === typeof fn && componentFrameCache.set(fn, sampleLines);
        return sampleLines;
    }
    function describeUnknownElementTypeFrameInDEV(type) {
        if (null == type) return "";
        if ("function" === typeof type) {
            var prototype = type.prototype;
            return describeNativeComponentFrame(type, !(!prototype || !prototype.isReactComponent));
        }
        if ("string" === typeof type) return describeBuiltInComponentFrame(type);
        switch(type){
            case REACT_SUSPENSE_TYPE:
                return describeBuiltInComponentFrame("Suspense");
            case REACT_SUSPENSE_LIST_TYPE:
                return describeBuiltInComponentFrame("SuspenseList");
        }
        if ("object" === typeof type) switch(type.$$typeof){
            case REACT_FORWARD_REF_TYPE:
                return type = describeNativeComponentFrame(type.render, !1), type;
            case REACT_MEMO_TYPE:
                return describeUnknownElementTypeFrameInDEV(type.type);
            case REACT_LAZY_TYPE:
                prototype = type._payload;
                type = type._init;
                try {
                    return describeUnknownElementTypeFrameInDEV(type(prototype));
                } catch (x) {}
        }
        return "";
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, self, source, owner, props) {
        self = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== self ? self : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, source, self) {
        if ("string" === typeof type || "function" === typeof type || type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || type === REACT_OFFSCREEN_TYPE || "object" === typeof type && null !== type && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_CONSUMER_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_CLIENT_REFERENCE$1 || void 0 !== type.getModuleId)) {
            var children = config.children;
            if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
                for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren], type);
                Object.freeze && Object.freeze(children);
            } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else validateChildKeys(children, type);
        } else {
            children = "";
            if (void 0 === type || "object" === typeof type && null !== type && 0 === Object.keys(type).length) children += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.";
            null === type ? isStaticChildren = "null" : isArrayImpl(type) ? isStaticChildren = "array" : void 0 !== type && type.$$typeof === REACT_ELEMENT_TYPE ? (isStaticChildren = "<" + (getComponentNameFromType(type.type) || "Unknown") + " />", children = " Did you accidentally export a JSX literal instead of a component?") : isStaticChildren = typeof type;
            console.error("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", isStaticChildren, children);
        }
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, self, source, getOwner(), maybeKey);
    }
    function validateChildKeys(node, parentType) {
        if ("object" === typeof node && node && node.$$typeof !== REACT_CLIENT_REFERENCE) {
            if (isArrayImpl(node)) for(var i = 0; i < node.length; i++){
                var child = node[i];
                isValidElement(child) && validateExplicitKey(child, parentType);
            }
            else if (isValidElement(node)) node._store && (node._store.validated = 1);
            else if (null === node || "object" !== typeof node ? i = null : (i = MAYBE_ITERATOR_SYMBOL && node[MAYBE_ITERATOR_SYMBOL] || node["@@iterator"], i = "function" === typeof i ? i : null), "function" === typeof i && i !== node.entries && (i = i.call(node), i !== node)) for(; !(node = i.next()).done;)isValidElement(node.value) && validateExplicitKey(node.value, parentType);
        }
    }
    function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    function validateExplicitKey(element, parentType) {
        if (element._store && !element._store.validated && null == element.key && (element._store.validated = 1, parentType = getCurrentComponentErrorInfo(parentType), !ownerHasKeyUseWarning[parentType])) {
            ownerHasKeyUseWarning[parentType] = !0;
            var childOwner = "";
            element && null != element._owner && element._owner !== getOwner() && (childOwner = null, "number" === typeof element._owner.tag ? childOwner = getComponentNameFromType(element._owner.type) : "string" === typeof element._owner.name && (childOwner = element._owner.name), childOwner = " It was passed a child from " + childOwner + ".");
            var prevGetCurrentStack = ReactSharedInternals.getCurrentStack;
            ReactSharedInternals.getCurrentStack = function() {
                var stack = describeUnknownElementTypeFrameInDEV(element.type);
                prevGetCurrentStack && (stack += prevGetCurrentStack() || "");
                return stack;
            };
            console.error('Each child in a list should have a unique "key" prop.%s%s See https://react.dev/link/warning-keys for more information.', parentType, childOwner);
            ReactSharedInternals.getCurrentStack = prevGetCurrentStack;
        }
    }
    function getCurrentComponentErrorInfo(parentType) {
        var info = "", owner = getOwner();
        owner && (owner = getComponentNameFromType(owner.type)) && (info = "\n\nCheck the render method of `" + owner + "`.");
        info || (parentType = getComponentNameFromType(parentType)) && (info = "\n\nCheck the top-level render call using <" + parentType + ">.");
        return info;
    }
    var React = __turbopack_require__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler");
    Symbol.for("react.provider");
    var REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_OFFSCREEN_TYPE = Symbol.for("react.offscreen"), MAYBE_ITERATOR_SYMBOL = Symbol.iterator, REACT_CLIENT_REFERENCE$2 = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, assign = Object.assign, REACT_CLIENT_REFERENCE$1 = Symbol.for("react.client.reference"), isArrayImpl = Array.isArray, disabledDepth = 0, prevLog, prevInfo, prevWarn, prevError, prevGroup, prevGroupCollapsed, prevGroupEnd;
    disabledLog.__reactDisabledLog = !0;
    var prefix, suffix, reentry = !1;
    var componentFrameCache = new ("function" === typeof WeakMap ? WeakMap : Map)();
    var REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var didWarnAboutKeySpread = {}, ownerHasKeyUseWarning = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren, source, self) {
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, source, self);
    };
}();
}}),
"[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)": (function(__turbopack_context__) {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, m: module, e: exports, t: __turbopack_require_real__ } = __turbopack_context__;
{
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) {
    "TURBOPACK unreachable";
} else {
    module.exports = __turbopack_require__("[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}}),
}]);

//# sourceMappingURL=_0d726a._.js.map