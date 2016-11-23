import './rxjs-extensions';

import { NgModule }      	from '@angular/core';
import { BrowserModule } 	from '@angular/platform-browser';
import { FormsModule }   	from '@angular/forms';
import { HttpModule }     from '@angular/http';

import { AppRoutingModule }     from './app-routing.module';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

// Imports for components & services
import { AppComponent }  			from './app.component';

import { MemberComponent }   from './member/member.component';
import { MemberAddComponent }   from './member/member-add.component';
import { MemberEditComponent }    from './member/member-edit.component';

import { ProjectComponent }    from './project/project.component';
import { ProjectEditComponent } from './project/project-edit.component';
import { ProjectAddComponent } from './project/project-add.component';

import { SprintComponent }   from './sprint/sprint.component';
import { SprintAddComponent }   from './sprint/sprint-add.component';

import { TaskAddComponent }   from './task/task-add.component';
import { TaskEditComponent }    from './task/task-edit.component';

import { MemberService, ProjectService, SprintService, TaskService } from './services/index';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    ProjectComponent,
    ProjectEditComponent,
    ProjectAddComponent,
    SprintComponent,
    SprintAddComponent,
    MemberComponent,
    MemberAddComponent,
    MemberEditComponent,
    TaskAddComponent,
    TaskEditComponent
  ],
  providers: [
    ProjectService,
    SprintService,
    TaskService,
    MemberService
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
