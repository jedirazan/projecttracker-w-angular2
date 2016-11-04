import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Task, State } from './task';

@Injectable()
export class TaskService {

  constructor(private http: Http) { }

  private tasksUrl = 'app/tasks';  // URL to web api
  private headers = new Headers({'Content-Type': 'application/json'});

  private handleError(error: any): Promise<any> {
  	console.error('An error occurred', error); // for demo purposes only
  	return Promise.reject(error.message || error);
  }

  getTask(id: number): Promise<Task> {
  	return this.getTasks()
  	  .then(tasks => tasks.find(task => task.id === id));
  }

  getTasks(): Promise<Task[]> {
    return this.http.get(this.tasksUrl)
     .toPromise()
     .then(response => response.json().data as Task[])
     .catch(this.handleError);
  }

  totalEffort(): Promise<number> {
    return this.getTasks().then(tasks => { 
        let sum: number = 0;
        for (let task of tasks) { sum += +task.effort; }
        return sum; 
      });
  }

  getState(): Promise<State[]> {
    return this.http.get('app/state')
     .toPromise()
     .then(response => response.json().data as State[])
     .catch(this.handleError);
  }

  update(task: Task): Promise<Task> {
    const url = `${this.tasksUrl}/${task.id}`;
    return this.http
      .put(url, JSON.stringify(task), {headers: this.headers})
      .toPromise()
      .then(() => task)
      .catch(this.handleError);
  }

  create(title: string, sprint: number, effort: number, state: string, assignee: number, relatedTicket: string): Promise<Task> {
    return this.http
      .post(this.tasksUrl, JSON.stringify({title: title, sprint: sprint, effort: effort, state: state, assignee: assignee, relatedTicket: relatedTicket}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }
}
