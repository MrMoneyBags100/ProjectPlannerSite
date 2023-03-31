import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuideComponent } from './guide/guide.component';
import { HomeComponent } from './home/home.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskTreeComponent } from './task-tree/task-tree.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'task-tree',
    component: TaskTreeComponent
  },
  {
    path: 'task-list',
    component: TaskListComponent
  },
  {
    path: 'guide',
    component: GuideComponent
  },
  {
    path: 'profile-settings',
    component: ProfileSettingsComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
