import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Sprint } from '../models/index';

@Injectable()
export class SprintService {
	
  constructor(private http: Http) { }

  private sprintsUrl = 'app/sprints';  // URL to web api
  private headers = new Headers({'Content-Type': 'application/json'});

  private handleError(error: any): Promise<any> {
  	console.error('An error occurred', error); // for demo purposes only
  	return Promise.reject(error.message || error);
  }

  getSprint(id: number): Promise<Sprint> {
  	return this.getSprints()
  	  .then(sprints => sprints.find(sprint => sprint.id === id));
  }

  getSprints(): Promise<Sprint[]> {
    return this.http.get(this.sprintsUrl)
      .toPromise()
      .then(response => response.json().data as Sprint[])
      .catch(this.handleError);
  }

  update(sprint: Sprint): Promise<Sprint> {
    const url = `${this.sprintsUrl}/${sprint.id}`;
    return this.http
      .put(url, JSON.stringify(sprint), {headers: this.headers})
      .toPromise()
      .then(() => sprint)
      .catch(this.handleError);
  }

  create(title: string, project: number, members: number[]): Promise<Sprint> {
    return this.http
      .post(this.sprintsUrl, JSON.stringify({title: title, project: project, tasks: [], members: members}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }
}
