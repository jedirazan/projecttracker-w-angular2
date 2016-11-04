import { Component, OnInit }  from '@angular/core';
import { Router }             from '@angular/router';

import { Member } from './member';
import { MemberService } from './member.service';

@Component({
  moduleId: module.id,
  selector: 'my-members',
  templateUrl: 'member.component.html'
})

export class MemberComponent implements OnInit {
	members: Member[];
  selectedMember: Member;

  constructor(
    private router: Router,
    private memberService: MemberService
  ) { }

  getMembers(): void {
    this.memberService.getMembers().then(members => this.members = members);
  }

  ngOnInit(): void {
    this.getMembers();
  }

  gotoDetailMember(member: Member): void {
    let link = ['/member', member.id];
    this.router.navigate(link);
  }
}