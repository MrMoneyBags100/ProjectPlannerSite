import { Component } from '@angular/core';
import { TaskService } from '../core/services/task.service';

@Component({
  selector: 'app-task-tree',
  template: `
<div class="bg-primary text-black pt-4 pb-4"> 
  <div class="container">

    <div class="container border bg-light text-black pt-4 pb-4 mb-3">
      ToolBar: 
      <button class="AddTask me-2 ms-2" (click)="newTask(hello, hello)">Add Task</button><!--Not working :(-->
      <button class="AddTask me-2">Edit Task</button>
      <button class="AddTask me-2">Delete Task</button>
    </div>

    <h1>Task Tree:</h1>
    <!--Call the base task element, it will recursively call itself until the project is printed-->
    <app-tasktree-item [task]="findTaskByID(getBaseTaskID())"></app-tasktree-item>

  </div>
</div>
  `,
  styles: [
  ]
})

export class TaskTreeComponent {
  constructor(private taskService: TaskService)
  {}

  hello: string = 'hello';

  getBaseTaskID()
  {
    return this.taskService.baseTaskID;
  }

  findTaskByID(id: number)
  {
    return this.taskService.FindTaskByID(id);
  }

  newTask(newName: string, newDescription: string)//creates a new task with user given details as a subtask of the current selected task, automatically pushes it to the tasklist
  {
    this.taskService.NewTask(newName, newDescription);
  }
}