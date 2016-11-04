import { Component, Input, OnInit }  from '@angular/core';
import { Router, ActivatedRoute, Params }    from '@angular/router';
import { Location }                 from '@angular/common';

import { ProjectService } from '../project/project.service';
import { Project } from '../project/project';

import { Sprint } from './sprint';
import { SprintService } from './sprint.service';

import { Task, State } from '../task/task';
import { TaskService } from '../task/task.service';

import { Member } from '../member/member';
import { MemberService } from '../member/member.service';

@Component({
  moduleId: module.id,
  selector: 'my-sprint',
  templateUrl: 'sprint.component.html'
})

export class SprintComponent implements OnInit {
  @Input()
  sprint: Sprint;

  sprintTasks: Task[] = [];
  sumEffort: number = 0;
  totalAssigned: number = 0;
  totalNew: number = 0;
  totalInProgress: number = 0;
  totalDone: number = 0;

  sprintMembers: Member[] = [];
  sumCapacity: number = 0;
  displayStats = 'ui tiny horizontal statistic';

  nonMembers: Member[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private sprintService: SprintService,
    private taskService: TaskService,
    private memberService: MemberService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      let id = +params['id'];
      this.sprintService.getSprint(id)
        .then(sprint => this.sprint = sprint)
        .then(sprint => {
          if(sprint.tasks.length > 0){
            for(let tid of sprint.tasks) {
              this.taskService.getTask(tid).then(task => {
                this.sprintTasks.push(task);
                this.sumEffort += +task.effort;
                if(task.assignee) { this.totalAssigned++; }
                switch (task.state) {
                  case 'New':
                    this.totalNew++;
                    break;
                  case 'In Progress':
                    this.totalInProgress++;
                    break;
                  case 'Done':
                    this.totalDone++;
                    break;
                }
              });
            }
          }
          if(sprint.members.length > 0){
            for(let mid of sprint.members) {
              this.memberService.getMember(mid).then(member => {
                this.sprintMembers.push(member);
                this.sumCapacity += +member.capacity;
              });
            }
          }
          this.projectService.getProject(sprint.project)
            .then(project => {
              for(let id of project.members) {
                if(!sprint.members.includes(id)) {
                  this.memberService.getMember(id).then(member => this.nonMembers.push(member));
                }
              }
            });
        });
    });
  }

  getMemberName(id: number): string {
    let m: string;
    for(let member of this.sprintMembers){
      if(member.id === +id) { m = member.name; }
    }
    return m;
  }

  sumEffortIndividual(member: Member): number {
    let s: number = 0;
    let relatedTasks: Task[];
    relatedTasks = this.sprintTasks.filter(relatedTasks => +relatedTasks.assignee === +member.id);
    for(let t of relatedTasks){
      s += +t.effort;
    }
    return s;
  }

  statsState(danger: boolean, variations: string): string {
    if(danger) {
      return 'ui red statistic' + variations;
    } else {
      return 'ui statistic' + variations;
    }
  }

  addTask(sprint: Sprint): void {
    let link = ['/task/add', sprint.id];
    this.router.navigate(link);
  }

  removeTask(task: Task): void {
    this.sprint.tasks = this.sprint.tasks.filter(i => i !== task.id);
    this.sprintTasks = this.sprintTasks.filter(t => t.id !== task.id);
    this.sprintService.update(this.sprint);
    this.sumEffort -= task.effort;
    this.totalAssigned--;
    switch (task.state) {
      case 'New':
        this.totalNew--;
        break;
      case 'In Progress':
        this.totalInProgress--;
        break;
      case 'Done':
        this.totalDone--;
        break;
    }
  }

  gotoDetailTask(task: Task): void {
    let link = ['/task', task.id];
    this.router.navigate(link);
  }

  addMember(id: number): void {
    this.sprint.members.push(+id);
    this.sprintService.update(this.sprint);
    this.memberService.getMember(+id)
      .then(member => {
        this.sprintMembers.push(member);
        this.sumCapacity += member.capacity;
      });
    this.nonMembers = this.nonMembers.filter(member => member.id !== +id);
  }

  removeMember(member: Member): void {
    this.sprint.members = this.sprint.members.filter(i => i !== member.id);
    this.sprintMembers = this.sprintMembers.filter(m => m.id !== member.id);
    this.sprintService.update(this.sprint);
    this.sumCapacity -= member.capacity;
    this.nonMembers.push(member);
  }

  gotoDetailMember(member: Member): void {
    let link = ['/member', member.id];
    this.router.navigate(link);
  }

  saveSprint(): void {
    let link = ['/project', this.sprint.project];
    this.sprintService.update(this.sprint).then(() => this.router.navigate(link));
  }
}
