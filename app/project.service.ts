import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Project } from './project';

@Injectable()
export class ProjectService {
	private headers = new Headers({'Content-Type': 'application/json'});
	private projectsUrl = 'app/projects'; //URL to web api

	constructor(private http: Http) { }

	getProject(id: number): Promise<Project> {
		return this.getProjects()
		.then(projects => projects.find(project => project.id === id));
	}

	getProjects(): Promise<Project[]> {
		return this.http
		.get(this.projectsUrl)
		.toPromise()
		.then(response => response.json().data as Project[])
		.catch(this.handleError);
	}

	getProjectsSlowly(): Promise<Project[]> {
	  return new Promise<Project[]>(resolve =>
	    setTimeout(resolve, 2000)) // delay 2 seconds
	    .then(() => this.getProjects());
	}

	update(project: Project): Promise<Project> {
		const url = `${this.projectsUrl}/${project.id}`;
		return this.http
		.put(url, JSON.stringify(project), {headers: this.headers})
		.toPromise()
		.then(() => project)
		.catch(this.handleError);
	}

	create(name: string): Promise<Project> {
		return this.http
		.post(this.projectsUrl, JSON.stringify({name: name}), {headers: this.headers})
		.toPromise()
		.then(res => res.json().data)
		.catch(this.handleError);
	}

	delete(id: number): Promise<void> {
		const url = `${this.projectsUrl}/${id}`;
		return this.http.delete(url, {headers: this.headers})
		.toPromise()
		.then(() => null)
		.catch(this.handleError);
	}

	private handleError(error: any): Promise<any> {
	  console.error('An error occurred', error); // for demo purposes only
	  return Promise.reject(error.message || error);
	}
}