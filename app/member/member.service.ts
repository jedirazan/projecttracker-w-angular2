import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Member } from './member';

@Injectable()
export class MemberService {
	
  constructor(private http: Http) { }

  private membersUrl = 'app/members';  // URL to web api
  private headers = new Headers({'Content-Type': 'application/json'});

  private handleError(error: any): Promise<any> {
  	console.error('An error occurred', error); // for demo purposes only
  	return Promise.reject(error.message || error);
  }

  getMemberName(id: number): Promise<string> {
  return this.getMember(id)
    .then(member => member.name);
  }

  getMember(id: number): Promise<Member> {
	return this.getMembers()
	  .then(members => members.find(member => member.id === id));
  }

  getMembers(): Promise<Member[]> {
    return this.http.get(this.membersUrl)
     .toPromise()
     .then(response => response.json().data as Member[])
     .catch(this.handleError);
  }

  totalCapacity(): Promise<number> {
    return this.getMembers().then(members => { 
        let sum: number = 0;
        for (let member of members) { sum += +member.capacity; }
        return sum; 
      });
  }

  update(member: Member): Promise<Member> {
    const url = `${this.membersUrl}/${member.id}`;
    return this.http
      .put(url, JSON.stringify(member), {headers: this.headers})
      .toPromise()
      .then(() => member)
      .catch(this.handleError);
  }

  create(name: string, position: string, capacity: number): Promise<Member> {
    return this.http
      .post(this.membersUrl, JSON.stringify({name: name, position: position, capacity: capacity}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }
}
