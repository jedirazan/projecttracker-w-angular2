import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import { Member, Project, Sprint } from '../models/index';
import { MemberService, ProjectService, SprintService } from '../services/index';

@Component({
  moduleId: module.id,
  selector: 'my-project-edit',
  templateUrl: 'project-edit.component.html'
})

export class ProjectEditComponent implements OnInit {
  @Input()
  project: Project;
  projectMembers: Member[] = [];
  projectSprints: Sprint[] = [];

  nonMembers: Member[];

  constructor(
    private projectService: ProjectService,
    private sprintService: SprintService,
    private memberService: MemberService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  getMembers(): void {
    this.memberService.getMembers()
      .then(members => this.nonMembers = members);
  }

  ngOnInit(): void {
    this.getMembers();
    this.route.params.forEach((params: Params) => {
      let id = +params['id'];
      this.projectService.getProject(id)
        .then(project => this.project = project)
        .then(project => {
          for(let id of project.members) {
            this.memberService.getMember(id)
              .then(member => this.projectMembers.push(member));
            this.nonMembers = this.nonMembers.filter(member => member.id !== id);
          }
          for(let id of project.sprints) {
            this.sprintService.getSprint(id)
              .then(sprint => this.projectSprints.push(sprint));
          }
        });
    });
  }

  addMember(id: number): void {
    this.project.members.push(+id);
    this.projectService.update(this.project);
    this.memberService.getMember(+id)
      .then(member => this.projectMembers.push(member));
    this.nonMembers = this.nonMembers.filter(member => member.id !== +id);
  }

  removeMember(member: Member): void {
    this.project.members = this.project.members.filter(i => i !== member.id);
    this.projectService.update(this.project);
    this.projectMembers = this.projectMembers.filter(m => m !== member);
    this.nonMembers.push(member);
  }

  gotoIteration(sprint: Sprint): void {
    let link = ['/iteration', sprint.id];
    this.router.navigate(link);
  }

  addIteration(project: Project): void {
    let link = ['/iteration/add', project.id];
    this.router.navigate(link);
  }

  goBack(): void {
    this.location.back();
  }

  saveProject(): void {
    let link = ['/dashboard'];
    this.projectService.update(this.project).then(() => this.router.navigate(link));
  }

}
