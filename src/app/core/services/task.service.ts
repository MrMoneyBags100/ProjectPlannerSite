import { Injectable } from '@angular/core';
import { Task } from 'src/app/Task';
import { TestDataServiceService } from './test-data-service.service';
import { elementAt } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(testDataService: TestDataServiceService)//Initial grabbing of our data from the "backend"
  {
    //Grab all neccessary data from the backend and assign it:
    //taskList array, this will need to be done recursively, seeing as 
    //currentID number
    const testData = testDataService.getTasks();//get test data into a value
    this.currentID = testDataService.GetCurrentID();//gets the next ID that will be used to generate tasks
    this.baseTaskID = testDataService.GetBaseTask();
    for (let i = 0; i < testData.length; i++)
    {
      const element = testData[i];

      this.taskList[i] = new Task(element.id, element.name, element.description, element.parentTask, element.subTasks, element.expanded, element.complete);//This brings across ALL information form the
    }
  }


  //
  //Global values
  //
  taskList: Task[] = [];//this taskList will be where all frontend data changes are made, when changes are applied, we just send this array back to replace existing data
  currentID: number = 0;//signifies which ID is next to be given out to a new task
  baseTaskID: number;
  private selectedTaskID: number = -1;//ID of the current selected task



  UpdateTaskTree()//To be everytime after a data-changing function is called to make sure visuals are accurate to data
  {
    const taskTreeElement = document.getElementById('task-tree-toolbar');
  
    if (taskTreeElement) {
      // Create a new div element to hold the new tree
      const newTreeContainer = document.createElement('div');
  
      // Create the new tree element and append it to the container
      const newTree = document.createElement('app-task-tree');
      newTreeContainer.appendChild(newTree);
  
      // Append the new container to the task-tree element
      taskTreeElement.appendChild(newTreeContainer);
    }
  }

  //
  //Task general tools
  //

  NewTask(newName: string, newDescription: string)//creates a new task with user given details as a subtask of the current selected task, automatically pushes it to the tasklist
  {
    let emptySubtasks: number[] = [];
    this.taskList.push(new Task(this.currentID, newName, newDescription, this.selectedTaskID, emptySubtasks, true, false));
    console.log("A new task called \"", newName, "\" is being added to the tasklist as a subtask of task ID: \"", this.FindTaskByID(this.currentID).GetParentTaskID(), "\"");
    this.FindTaskByID(this.selectedTaskID).AddSubtask(this.currentID);
    this.currentID++;
    this.UpdateTaskTree();
  }
  EditTask(newName: string, newDescription: string)//Allows description and title of selectedID to be edited
  {
    console.log("A task called \"", this.FindTaskByID(this.selectedTaskID).GetName(), "\" is having its name turned to \"", newName, "\" and its description turned to \"", newDescription, "\"");
    this.FindTaskByID(this.selectedTaskID).SetName(newName);
    this.FindTaskByID(this.selectedTaskID).SetDescription(newDescription);
    this.UpdateTaskTree()
  }
  DeleteTask(deleteID: number)//Deletes the selected task and all subtasks
  {
    console.log("A task called \"", this.FindTaskByID(this.selectedTaskID).GetName(), "\" is being deleted");

    let DeleteSubtaskList: number[] = this.FindTaskByID(deleteID).GetSubtaskIDs();//Create list of all current tasks subtasks to reduce calls to grab them
    //------------------------------------------------Make sure there are subtasks first
    if (DeleteSubtaskList.length > 0)
    {
      for (let i = 0; i < DeleteSubtaskList.length; i++)//Call this delete function for each of the DeleteSubtaskList elements ID's
      {
        this.DeleteTask(DeleteSubtaskList[i]);
      }
    }
    //Delete self after calling this function on subtasks to ensure no problems and reduce data being transferred evertime a change is made
    //Make two arrays make a slice() either side of the task we want to delete
    console.log(this.taskList);
    let firstSlice: Task[] = this.taskList.slice(0, deleteID);
    console.log(firstSlice);
    let secondSlice: Task[] = this.taskList.slice(deleteID+1, this.taskList.length);
    console.log(secondSlice);
    //Clear the main taskList and repopulate it with the afformentioned half-arrays, BOOM
    this.taskList = [...firstSlice, ...secondSlice];
    console.log(this.taskList);


    this.UpdateTaskTree()
  }

  GetSelectedTaskID()
  {
    return this.selectedTaskID;
  }

  FindTaskByID(id: number): Task//each task object will have an ID, this function will search the task array for an object with a specific ID and return it
  {
    //Loop over entire array to find object 
    for (let i=0; i<this.taskList.length; i++) 
    {
      //Check whether current element has ID matching what we are looking for
      const element: Task = this.taskList[i];
      if(element.GetID() == id)
      {
        return element;
      }
    }
    return this.taskList[this.FindElementNumberFromID(this.baseTaskID)];//If Task not found, just return the baseTaskID
  }

  FindElementNumberFromID(id: number)
  {
    let elementNumber = -1;
    for (let i = 0; i < this.taskList.length; i++)
    {
      if (this.taskList[i].GetID() == id)
      {
        elementNumber = i;
      }
    }
    if (elementNumber == -1)
    {
      console.log("cannot find element number of ID: \"", id, "\"");
    }
    return elementNumber;
  }

  FindEndpointIDs() {
    const endPointIDs: number[] = [];
    for (let i=0; i<this.taskList.length; i++) {
      const element: Task = this.taskList[i];
      if(element.GetSubtaskIDs().length == 0) {
        endPointIDs.push(element.GetID());
      }
    }
    return endPointIDs;
  }

  SetSelectedTask(id: number)
  {
    this.selectedTaskID = id;
    console.log("selected task ID is: ", id);
  }


  //Task detail tools

  CheckParentComplete(id: number)//makes the parent of this task perform a CheckSubTasksComplete()
  {
    let thisTask: Task = this.FindTaskByID(id);
    let thisTaskParentID: number;
    if(thisTask.GetParentTaskID() > 0)
    {
      thisTaskParentID = thisTask.GetParentTaskID();
      this.CheckSubtasksComplete(thisTaskParentID);//Make current parent of this task call CheckSubtasksComplete() function
    }
  }

  CheckSubtasksComplete(id: number)//Checks the status of all this tasks subtasks
  {
    let thisTask: Task = this.FindTaskByID(id);
    let thisTaskSubtasks: number[] = thisTask.GetSubtaskIDs();

    let tempComplete = true;//Set true by default

    for(let i=0; i<thisTaskSubtasks.length; i++)
    {
      if(this.FindTaskByID(thisTaskSubtasks[i]).GetCompleteStatus() == false)//If any subtasks of this task are not complete, then this task is not complete
      {
        tempComplete = false;
        break;
      }
    }

    thisTask.ToggleComplete(tempComplete);
  }
}