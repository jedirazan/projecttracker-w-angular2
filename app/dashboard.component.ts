import { Component, OnInit }  from '@angular/core';
import { Router }             from '@angular/router';

import { Project } from './project/project';
import { ProjectService } from './project/project.service';

@Component({
  moduleId: module.id,
  selector: 'my-dashboard',
  templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit {
  projects: Project[];

  constructor(
    private router: Router,
    private projectService: ProjectService,
  ) { }

  getProjects(): void {
    this.projectService.getProjects().then(projects => this.projects = projects)
  }

  ngOnInit(): void {
    this.getProjects();
  }

  gotoProjectDetails(project: Project): void {
    let link = ['/project', project.id];
    this.router.navigate(link);
  }
}
