import { Component, Input } from '@angular/core';
import { TaskService } from '../core/services/task.service';
import { Task } from '../Task';

@Component({
  selector: 'app-tasklist-item',
  template: `
<div class = "card"> <!--This task-->
  <div class = "card-body">
    <div class="task-container">
      <div class="task-header">
        <h3>{{ task.GetName() }}</h3>
      </div>
      <div class="task-details">
        <p>{{ task.GetDescription() }}</p>
      </div>
    </div>
  </div>
</div>
  `,
  styles: [
  ]
})
export class TasklistItemComponent {
  constructor(private taskService: TaskService)
  {}

  @Input() task!: Task;//this is the task that is entered as a parameter for this element, we can grab its information from this
}
