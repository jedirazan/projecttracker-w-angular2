import { Component, OnInit }  from '@angular/core';
import { Router }             from '@angular/router';

import { Project } from '../models/index';
import { ProjectService } from '../services/index';

@Component({
  moduleId: module.id,
  selector: 'my-project',
  templateUrl: 'project.component.html'
})

export class ProjectComponent implements OnInit {
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
