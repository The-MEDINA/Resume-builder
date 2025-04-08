// puts the resume onto the website.
import { resume } from "@/app/page";
export function DisplayResume()
{
  let indexNumber = 0;
  console.log(resume);
  while (document.getElementById("Resume")?.firstChild != null)
  {
    document.getElementById("Resume")?.firstChild?.remove();
  }
  for (let i = 0; i < resume.length; i++)
  {
    resume[i].index = indexNumber;
    if (resume[i].type == "Group")
    {
      for (let j = 0; j < resume[i].elements.length; j++)
      {
        indexNumber++;
        resume[i].elements[j].index = indexNumber;
      }
    }
    resume[i].Display();
    document.getElementById("Resume")?.appendChild(CreateMovementButtons(i));
    indexNumber++;
  }
}

// Adds movement buttons to any resume element.
export function CreateMovementButtons(index: number)
{
  let parent = document.createElement("div");
  let upButton = document.createElement("button");
  upButton.textContent = "|^|";
  upButton.addEventListener('click', function() {MoveElementUp(index)});
  let downButton = document.createElement("button");
  downButton.textContent = "|v|";
  downButton.addEventListener('click', function() {MoveElementDown(index)});
  parent.appendChild(upButton);
  parent.appendChild(downButton);
  return parent;
}

function MoveElementUp(index: number)
{
  if (index != 0)
  {
    if (resume[index].type != "Group" && resume[index-1].type == "Group")
    {
      resume[index-1].elements.push(resume[index]);
      resume.splice(index,1); 
    }
    else
    {
      let holdThis = resume[index-1];
      resume[index-1] = resume[index];
      resume[index] = holdThis;
    }
    DisplayResume();
  }
}

function MoveElementDown(index: number)
{
  if (index != resume.length-1)
  {
    if (resume[index].type != "Group" && resume[index+1].type == "Group")
    {
      resume[index+1].elements.splice(0,0,resume[index]);
      resume.splice(index,1); 
    }
    else
    {
      let holdThis = resume[index+1];
      resume[index+1] = resume[index];
      resume[index] = holdThis;
    }
    DisplayResume();
  }
}