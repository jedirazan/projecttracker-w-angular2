import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Project } from './project';
import { ProjectService } from './project.service';

@Component({
  moduleId: module.id,
  selector: 'my-projects',
  templateUrl: 'projects.component.html',
  styleUrls: [ 'projects.component.css' ],
})

export class ProjectsComponent implements OnInit { 
	projects: Project[];
	selectedProject: Project;

	constructor(
		private router: Router,
		private projectService: ProjectService
	) { }

	getProjects(): void {
		this.projectService.getProjects().then(projects => this.projects = projects);
	}

	ngOnInit(): void {
		this.getProjects();
	}

	onSelect(project: Project): void {
	  this.selectedProject = project;
	}

	gotoDetail(): void {
		this.router.navigate(['/detail', this.selectedProject.id])
	}

	add(name: string): void {
		name = name.trim();
		if(!name) { return; }
		this.projectService.create(name)
		.then(project => {
			this.projects.push(project);
			this.selectedProject = null;
		});
	}

	delete(project: Project): void {
		this.projectService
		.delete(project.id)
		.then(() => {
			this.projects = this.projects.filter(p => p !== project);
			if(this.selectedProject == project) { this.selectedProject = null; }
		});
	}
}