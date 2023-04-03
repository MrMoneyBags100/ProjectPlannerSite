import { Injectable } from '@angular/core';
import { empty, EmptyError } from "rxjs";

export class Task {
  // constructor(id: number, name: string, description: string, parentTask?: number, subTasks?: number[], expanded?: boolean, complete?: boolean)
  // {
  //   if (subTasks)//Check if this task has any sub tasks
  //   {
  //     this.subTasks = subTasks;
  //   }
  //   else
  //   {
  //     this.subTasks = [];
  //   }
  //   if (parentTask)//Check if this task has any parent tasks
  //   {
  //     this.parentTask = parentTask;
  //   }
  //   else
  //   {
  //     this.parentTask = -1;
  //   }
  //   if (expanded == false)//Check whether this task should be expanded on the task tree
  //   {
  //     this.expanded = false;
  //   }
  //   if (complete)//Check whether this task is complete without having to run the function off-rip
  //   {
  //     this.complete = true;
  //   }

  //   this.id = id;
  //   this.name = name;
  //   this.description = description;
  // }

  constructor(id: number, name: string, description: string, parentTask?: number, subTasks?: number[], expanded?: boolean, complete?: boolean)
  {
    if (subTasks !== undefined)//Check if this task has any sub tasks
    {
      this.subTasks = subTasks;
    }
    else
    {
      this.subTasks = [];
    }
  
    if (parentTask !== undefined)//Check if this task has any parent tasks
    {
      this.parentTask = parentTask;
    }
    else
    {
      this.parentTask = -1;
    }
  
    if (expanded !== undefined && expanded == false)//Check whether this task should be expanded on the task tree
    {
      this.expanded = false;
    }
  
    if (complete !== undefined && complete == true)//Check whether this task is complete without having to run the function off-rip
    {
      this.complete = true;
    }
  
    this.id = id;
    this.name = name;
    this.description = description;
  }
  


  //Core task values
  private id: number;
  private name: string;
  private description: string;
  private subTasks: number[] = [];
  private parentTask: number;
  private expanded: boolean = true;//Expanded by default unless set otherwise in constructor
  private complete: boolean = false;//false by default unless set otherwise in constructor, tells us whether a task or all of its immediate sub tasks are complete



  //Getters
  GetID()
  {
    return this.id;
  }
  GetName()
  {
    return this.name;
  }
  GetDescription()
  {
    return this.description;
  }
  GetSubtaskIDs()
  {
    return this.subTasks;
  }
  GetParentTaskID()
  {
    return this.parentTask;
  }
  GetExpandedStatus()
  {
    return this.expanded;
  }
  GetCompleteStatus()
  {
    return this.complete;
  }

  //Setters
  ToggleExpanded(forceStatus?: boolean)//Changes whether this task should have its subtasks expanded
  {
    if(forceStatus)
    {
      this.expanded = forceStatus;
    }
    else
    {
      this.expanded = !this.expanded;
    }
  }

  ToggleComplete(forceStatus?: boolean)//Changes whether this task is complete, if so makes all parent tasks check their status. can also have its status forced upon it
  {
    if(forceStatus)
    {
      this.complete = forceStatus;
    }
    else
    {
      this.complete = !this.complete;
    }
  }

  AddSubtask(ID: number)
  {
    this.subTasks.push(ID);
  }
}
  