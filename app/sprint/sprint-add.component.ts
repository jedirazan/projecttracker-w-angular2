import { Component, OnInit }  from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }   from '@angular/common';

import { SprintService } from './sprint.service';
import { Sprint } from './sprint';

import { Project } from '../project/project';
import { ProjectService } from '../project/project.service';

import { Member } from '../member/member';
import { MemberService } from '../member/member.service';

@Component({
  moduleId: module.id,
  selector: 'my-sprint-add',
  templateUrl: 'sprint-add.component.html'
})

export class SprintAddComponent implements OnInit {
  sprintMembers: Member[] = [];
  nonMembers: Member[] = [];

  constructor(
    private sprintService: SprintService,
    private projectService: ProjectService,
    private memberService: MemberService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      let id = +params['id'];
      this.projectService.getProject(id)
        .then(project => {
          for(let id of project.members) {
            this.memberService.getMember(id)
              .then(member => this.nonMembers.push(member));
          }
        });
    });
  }

  addMember(id: number): void {
    this.memberService.getMember(+id)
      .then(member => this.sprintMembers.push(member));
    this.nonMembers = this.nonMembers.filter(member => member.id !== +id);
  }

  removeMember(member: Member): void {
    this.sprintMembers = this.sprintMembers.filter(m => m !== member);
    this.nonMembers.push(member);
  }

  goBack(): void {
    this.location.back();
  }

	addSprint(title: string, members: Member[]): void {
    title = title.trim();
    if (!title) { return; }
    var ids: number[] = [];
    for(let member of members) { ids.push(member.id); }
    this.route.params.forEach((params: Params) => {
      let projectId = +params['id'];
      this.sprintService.create(title, projectId, ids)
  	    .then(sprint => {
          this.projectService.getProject(projectId)
            .then(project => {
              project.sprints.push(sprint.id);
              this.projectService.update(project)
                .then(() => this.goBack());
            });
        });
    });
  }
}
