import { Injectable } from '@angular/core';
import { Task } from 'src/app/Task';
import { TestDataServiceService } from './test-data-service.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(testDataService: TestDataServiceService)
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



  //Task general tools

  NewTask(newName: string, newDescription: string)//creates a new task with user given details as a subtask of the current selected task, automatically pushes it to the tasklist
  {
    let emptySubtasks: number[] = [];
    this.taskList.push(new Task(this.currentID, newName, newDescription, this.baseTaskID, emptySubtasks));//baseTaskID needs to be changed to selectedTask if there is a selected task
    this.currentID++;
  }

  EditTask(editID: number)//Allows description and title of given ID to be edited
  {

  }

  DeleteTask()
  {

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