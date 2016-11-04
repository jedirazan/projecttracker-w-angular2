import './rxjs-extensions';

import { NgModule }      	from '@angular/core';
import { BrowserModule } 	from '@angular/platform-browser';
import { FormsModule }   	from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppRoutingModule }     from './app-routing.module';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { AppComponent }  			from './app.component';
import { DashboardComponent }    from './dashboard.component';
import { ProjectComponent } from './project/project.component';
import { ProjectAddComponent } from './project/project-add.component';
import { ProjectService } from './project/project.service';
import { SprintComponent }   from './sprint/sprint.component';
import { SprintAddComponent }   from './sprint/sprint-add.component';
import { SprintService }    from './sprint/sprint.service';
import { MemberComponent }   from './member/member.component';
import { MemberAddComponent }   from './member/member-add.component';
import { MemberEditComponent }    from './member/member-edit.component';
import { MemberService }    from './member/member.service';
import { TaskAddComponent }   from './task/task-add.component';
import { TaskEditComponent }    from './task/task-edit.component';
import { TaskService }    from './task/task.service';


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
    DashboardComponent,
    ProjectComponent,
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
