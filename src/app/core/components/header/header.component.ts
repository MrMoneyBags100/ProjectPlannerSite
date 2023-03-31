import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
  <nav class="navbar navbar-expand-sm bg-dark navbar-dark mb-4">
    <div class="container-fluid">


      <!--Logo/Title-->
      <a class="navbar-brand d-inline-block align-text-middle" href="">
        <img src="assets/images/Logo.png" alt="Logo" width="100" height="100">
        Project Planner
      </a>

      <!--Collapse links button-->
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
        <span class="navbar-toggler-icon"></span>
      </button>

      <!--Collapse navbar links-->
      <div class="collapse navbar-collapse" id="collapsibleNavbar">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item">
          <a class="nav-link" href="task-list">
            <img src="assets/images/TaskList.png" alt="Task list" class="nav-item-image" width="50" height="50">
            To-do list
          </a>
        </li>

        <li class="nav-item">
          <a class="nav-link" href="task-tree">
            <img src="assets/images/TaskTree.png" alt="Task list" class="nav-item-image" width="50" height="50">
            Task tree
          </a>
        </li>

        <li class="nav-item">
          <a class="nav-link" href="guide">
            <img src="assets/images/Guide.png" alt="Task list" class="nav-item-image" width="50" height="50">
            Guide
          </a>
        </li>

        <li class="nav-item">
          <a class="nav-link" href="profile-settings">
            <img src="assets/images/ProfileSettings.png" alt="Task list" class="nav-item-image" width="50" height="50">
            Profile/Settings
          </a>
        </li>
      </ul>
      </div>


    </div>
  </nav>
  `,
  styles: [

  ]
})
export class HeaderComponent {

}