import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { Project } from './project';
import { ProjectService } from './project.service';

@Component({
	moduleId: module.id,
	selector: 'my-project-detail',
	templateUrl: 'project-detail.component.html'
})

export class ProjectDetailComponent implements OnInit {
	@Input()
	project: Project;

	constructor(
		private projectService: ProjectService,
		private route: ActivatedRoute,
		private location: Location
	){}

	ngOnInit(): void {
		this.route.params.forEach((params: Params) => {
			let id = +params['id'];
			this.projectService.getProject(id)
			.then(project => this.project = project);
		})
	}

	goBack(): void {
		this.location.back();
	}

	save(): void {
		this.projectService.update(this.project)
		.then(() => this.goBack());
	}
}
