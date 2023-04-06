import { Component, Input } from '@angular/core';
import { TaskService } from '../core/services/task.service';
import { Task } from '../Task';

@Component({
  selector: 'app-tasktree-item',
  template: `
<div class = "card"> <!--This task-->
  <div class = "card-body">
    <div class="task-container">
      <img class="me-3" src="assets/images/TaskArrow-Expanded.png" *ngIf="GetExpanded()" (click)="task.ToggleExpanded()" style="cursor: pointer;" width="30" height="30"/>
      <img class="me-3" src="assets/images/TaskArrow-Closed.png" *ngIf="!GetExpanded()" (click)="task.ToggleExpanded()" style="cursor: pointer;" width="30" height="30"/>
      <input type="radio" name="selectedButton" [value]="task.GetID()" (click)="SetSelectedTask(task.GetID())">
      <div class="task-header">
        <h3>{{ task.GetName() }}</h3>
      </div>
      <div class="task-details">
        <p>{{ task.GetDescription() }}</p>
      </div>
      <!-- <div class="task-expanded">
        <p>Expansion status: {{ task.GetExpandedStatus() }}</p>
      </div> -->
    </div>
  </div>
</div>

<div class="decider" *ngIf="GetExpanded()">
  <div class="task-subtasks ms-4"> <!--subtasks, if any-->
    <div class="subtask" *ngFor="let subtask of task.GetSubtaskIDs()">
      <app-tasktree-item [task]="FindTaskByID(subtask)"></app-tasktree-item>
    </div>
  </div>
</div>
  `,
  styles: [
  ]
})
export class TaskItemComponent {
  constructor(private taskService: TaskService)
  {}

  @Input() task!: Task;//this is the task that is entered as a parameter for this element, we can grab its information from this

  FindTaskByID(id: number)
  {
    return this.taskService.FindTaskByID(id);
  }

  GetExpanded()//Find out whether this task-item should be shown or not
  {
    return this.task.GetExpandedStatus();
  }

  SetSelectedTask(id: number)
  {
    this.taskService.SetSelectedTask(id);
  }
}