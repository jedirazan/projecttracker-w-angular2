import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectComponent }   from './project/project.component';
import { ProjectAddComponent }    from './project/project-add.component';
import { ProjectEditComponent }    from './project/project-edit.component';
import { SprintComponent }   from './sprint/sprint.component';
import { SprintAddComponent }   from './sprint/sprint-add.component';
import { MemberComponent }   from './member/member.component';
import { MemberAddComponent }   from './member/member-add.component';
import { MemberEditComponent }    from './member/member-edit.component';
import { TaskAddComponent }   from './task/task-add.component';
import { TaskEditComponent }    from './task/task-edit.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: ProjectComponent
  },
    {
    path: 'project/add',
    component: ProjectAddComponent
  },
  {
    path: 'project/:id',
    component: ProjectEditComponent
  },
  {
    path: 'iteration/:id',
    component: SprintComponent
  },
  {
    path: 'iteration/add/:id',
    component: SprintAddComponent
  },
  {
    path: 'task/add/:id',
    component: TaskAddComponent
  },
  {
    path: 'task/:id',
    component: TaskEditComponent
  },
  {
    path: 'members',
    component: MemberComponent
  },
  {
    path: 'member/add',
    component: MemberAddComponent
  },
  {
    path: 'member/:id',
    component: MemberEditComponent
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
