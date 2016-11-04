import { Component, OnInit }  from '@angular/core';
import { Router }   from '@angular/router';
import { Location }   from '@angular/common';

import { Project } from './project';
import { ProjectService } from './project.service';

import { Member } from '../member/member';
import { MemberService } from '../member/member.service';

@Component({
  moduleId: module.id,
  selector: 'my-project-add',
  templateUrl: 'project-add.component.html'
})

export class ProjectAddComponent implements OnInit {
  projectMembers: Member[] = [];
  nonMembers: Member[] = [];

  constructor(
    private projectService: ProjectService,
    private memberService: MemberService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.memberService.getMembers()
      .then(members => this.nonMembers = members);
  }

  addMember(id: number): void {
    this.memberService.getMember(+id)
      .then(member => this.projectMembers.push(member));
    this.nonMembers = this.nonMembers.filter(member => member.id !== +id);
  }

  removeMember(member: Member): void {
    this.projectMembers = this.projectMembers.filter(m => m !== member);
    this.nonMembers.push(member);
  }

  goBack(): void {
    this.location.back();
  }

  addProject(title: string, summary: string, members: Member[]): void {
    title = title.trim();
    summary = summary.trim();
    if (!title || !summary) { return; }
    var ids: number[] = [];
    for(let member of members) { ids.push(member.id); }
    this.projectService.create(title, summary, ids)
      .then(() => this.router.navigate(['/dashboard']));
  }
}
