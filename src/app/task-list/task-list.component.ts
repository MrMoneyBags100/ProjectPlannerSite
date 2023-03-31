import { Component } from '@angular/core';
import { TaskService } from '../core/services/task.service';
import { Task } from '../Task';

@Component({
  selector: 'app-task-list',
  template: `
<div class="bg-primary text-black pt-4 pb-4"> 
  <div class="container">
    
    <h1>To-do-list:</h1>
    <!--Check entire tasklist for tasks with no subtasks, print em'-->
    <div class="subtask" *ngFor="let id of findEndPointIDs()">
      <app-tasklist-item [task]="findTaskByID(id)"></app-tasklist-item>
    </div>

  </div>
</div>
  `,
  styles: [
  ]
})
export class TaskListComponent {
  constructor(private taskService: TaskService)
  {}

  findTaskByID(id: number)
  {
    return this.taskService.FindTaskByID(id);
  }

  findEndPointIDs()
  {
    return this.taskService.FindEndpointIDs();
  }
}