import './rxjs-extensions';

import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppRoutingModule }  from './app-routing.module';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api/in-memory-web-api.module';
import { InMemoryDataService }  from './in-memory-data.service';

import { AppComponent }   from './app.component';
import { DashboardComponent }   from './dashboard.component';
import { ProjectDetailComponent } from './project-detail.component';
import { ProjectsComponent }   from './projects.component';
import { ProjectService }   from './project.service';
import { ProjectSearchComponent }   from './project-search.component';

@NgModule({
  imports:      [ 
	  BrowserModule,
	  FormsModule,
	  HttpModule,
	  InMemoryWebApiModule.forRoot(InMemoryDataService),
	  AppRoutingModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    ProjectDetailComponent,
    ProjectsComponent,
    ProjectSearchComponent
  ],
  providers:   [ ProjectService ],
  bootstrap:   [ AppComponent ]
})

export class AppModule { }