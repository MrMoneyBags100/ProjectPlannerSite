import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { TaskTreeComponent } from './task-tree/task-tree.component';
import { TaskListComponent } from './task-list/task-list.component';
import { GuideComponent } from './guide/guide.component';
import { TaskItemComponent } from './tasktree-item/tasktree-item.component';
import { TasklistItemComponent } from './tasklist-item/tasklist-item.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TaskTreeComponent,
    TaskListComponent,
    GuideComponent,
    TaskItemComponent,
    TasklistItemComponent,
    ProfileSettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    FormsModule
  ],
  providers: [   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
