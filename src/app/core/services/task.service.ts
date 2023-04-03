import { Injectable } from '@angular/core';
import { Task } from 'src/app/Task';
import { TestDataServiceService } from './test-data-service.service';

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


  taskList: Task[] = [];//this taskList will be where all frontend data changes are made, when changes are applied, we just send this array back to replace existing data
  currentID: number = 0;//signifies which ID is next to be given out to a new task
  baseTaskID: number;
  selectedTask: number | undefined;//ID of the current selected task                                                 0 FOR NOW WHILE TESTING



  //
  UpdateTaskTree() {
    const taskTreeElement = document.getElementById('task-tree');
  
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

  //Task general tools

  NewTask(newName: string, newDescription: string)//creates a new task with user given details as a subtask of the current selected task, automatically pushes it to the tasklist
  {
    console.log("A new task called \"", newName, "\" is being added to the tasklist");
    let emptySubtasks: number[] = [];
    this.taskList.push(new Task(this.currentID, newName, newDescription, this.baseTaskID, emptySubtasks, true, false));//baseTaskID needs to be changed to selectedTask if there is a selected task
    this.FindTaskByID(this.baseTaskID).AddSubtask(this.currentID);
    this.currentID++;
    this.UpdateTaskTree()
  }
  EditTask(editID: number)//Allows description and title of given ID to be edited
  {
    console.log("A task called \"", this.FindTaskByID(editID).GetName(), "\" is being edited");
    console.log(this.taskList);
    this.UpdateTaskTree()
  }
  DeleteTask(deleteID: number)
  {
    console.log("A task called \"", this.FindTaskByID(deleteID).GetName(), "\" is being deleted");
    this.UpdateTaskTree()
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
    return this.taskList[1];
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