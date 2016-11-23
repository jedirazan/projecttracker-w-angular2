import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Project } from '../models/index';

@Injectable()
export class ProjectService {
	
  constructor(private http: Http) { }

  private projectsUrl = 'app/projects';  // URL to web api
  private headers = new Headers({'Content-Type': 'application/json'});

  private handleError(error: any): Promise<any> {
  	console.error('An error occurred', error); // for demo purposes only
  	return Promise.reject(error.message || error);
  }

  getProject(id: number): Promise<Project> {
  	return this.getProjects()
  	  .then(projects => projects.find(project => project.id === id));
  }

  getProjects(): Promise<Project[]> {
    return this.http.get(this.projectsUrl)
      .toPromise()
      .then(response => response.json().data as Project[])
      .catch(this.handleError);
  }

  update(project: Project): Promise<Project> {
    const url = `${this.projectsUrl}/${project.id}`;
    return this.http
      .put(url, JSON.stringify(project), {headers: this.headers})
      .toPromise()
      .then(() => project)
      .catch(this.handleError);
  }

  create(title: string, summary: string, members: number[]): Promise<Project> {
    return this.http
      .post(this.projectsUrl, JSON.stringify({title: title, summary: summary, sprints: [], members: members}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }
}
