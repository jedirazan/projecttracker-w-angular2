import { Component, OnInit }  from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }   from '@angular/common';

import { Member, Sprint, Task, State } from '../models/index';
import { MemberService, SprintService, TaskService } from '../services/index';

@Component({
  moduleId: module.id,
  selector: 'my-task-add',
  templateUrl: 'task-add.component.html'
})

export class TaskAddComponent implements OnInit {
  members: Member[] = []; // initialize because we're gonna do .push later

  constructor(
    private sprintService: SprintService,
    private taskService: TaskService,
    private memberService: MemberService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  populateSelectMember(): void {
    this.route.params.forEach((params: Params) => {
      let sprintId = +params['id'];
      this.sprintService.getSprint(sprintId)
        .then(sprint => {
          for(let m of sprint.members){
            this.memberService.getMember(+m)
              .then(member => this.members.push(member)); // .push each Member here
          }
        });
    });
  }

  ngOnInit(): void {
    this.populateSelectMember();
  }

  goBack(): void {
    this.location.back();
  }

  addTask(title: string, effort: number, state: string, assignee: number, relatedTicket: string): void {
    state = state.trim();
    title = title.trim();
    relatedTicket = relatedTicket.trim();
    if (!state || !title) { return; }
    this.route.params.forEach((params: Params) => {
      let sprintId = +params['id'];
      this.taskService.create(title, sprintId, effort, state, assignee, relatedTicket)
        .then(task => {
          this.sprintService.getSprint(sprintId)
          .then(sprint => {
            sprint.tasks.push(task.id);
            this.sprintService.update(sprint)
              .then(() => this.goBack());
          });
        });
    });
  }
}
