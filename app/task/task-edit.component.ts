import { Component, Input, Output, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import { Member, Sprint, Task, State } from '../models/index';
import { MemberService, SprintService, TaskService } from '../services/index';

@Component({
  moduleId: module.id,
  selector: 'my-task-edit',
  templateUrl: 'task-edit.component.html'
})

export class TaskEditComponent implements OnInit {
  @Input()
  task: Task;
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
      let id = +params['id'];
      this.taskService.getTask(id)
        .then(task => {
          this.task = task;
          this.sprintService.getSprint(+task.sprint)
            .then(sprint => {
              for(let m of sprint.members){
                this.memberService.getMember(+m)
                  .then(member => this.members.push(member)); // .push each Member here
              }
            });
        });
    });
  }

  ngOnInit(): void {
    this.populateSelectMember();
  }

  goBack(): void {
    this.location.back();
  }

  saveTask(): void {
    this.taskService.update(this.task)
      .then(task => {
        this.sprintService.getSprint(task.sprint)
          .then(sprint => {
            if(!sprint.tasks.includes(task.id)){
              sprint.tasks.push(task.id);
            }
            this.sprintService.update(sprint)
              .then(() => this.goBack());
          });
      });
  }

}
