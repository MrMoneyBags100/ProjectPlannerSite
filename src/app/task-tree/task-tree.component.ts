import { ChangeDetectorRef, Component } from '@angular/core';
import { TaskService } from '../core/services/task.service';

@Component({
  selector: 'app-task-tree',
  template: `
<div class="bg-primary text-black pt-4 pb-4"> 
  <div class="container">

    <div id="task-tree-toolbar" class="container border bg-light text-black pt-4 pb-4 mb-3">
      ToolBar: 
      <button class="AddTask me-2 ms-2" (click)="newTask(newName, newDescription)">Add Task</button>
      <button class="AddTask me-2" (click)="editTask(newName, newDescription)">Edit Task</button>
      <button class="AddTask me-5" (click)="deleteTask()">Delete Task</button>
      <input type="text" name="name" class="input me-2" [(ngModel)]="newName" placeholder="Title">
      <input type="text" name="name" class="input me-2" [(ngModel)]="newDescription" placeholder="Description">
      <button class="ClearInputs me-2" (click)="clearInputs()">Clear-inputs</button>
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
  constructor(private taskService: TaskService,
    private changeDetectorRef: ChangeDetectorRef)
  {}

  newName: string = '';
  newDescription: string = '';

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
  editTask(newName: string, newDescription: string)
  {
    this.taskService.EditTask(this.newName, this.newDescription);
  }
  deleteTask()
  {
    this.taskService.DeleteTask(this.taskService.GetSelectedTaskID());
  }
  clearInputs()
  {
    this.newName = '';
    this.newDescription = '';
  }
}