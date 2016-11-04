import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  template: `
    <nav class="ui secondary menu">
      <div class="header item"><h1>{{title}}</h1></div>
	    <a class="item" routerLink="/dashboard">Dashboard</a>
      <a class="item" routerLink="/members">All members</a>
    </nav>
    <div class="ui divider"></div>
    <router-outlet></router-outlet>
  `
})

export class AppComponent {
  title = 'Tour of Heroes';
}
