import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';
import { Location }                 from '@angular/common';

import { Member } from '../models/index';
import { MemberService } from '../services/index';

@Component({
  moduleId: module.id,
  selector: 'my-member-edit',
  templateUrl: 'member-edit.component.html'
})

export class MemberEditComponent {
  member: Member;

  constructor(
    private memberService: MemberService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      let id = +params['id'];
      this.memberService.getMember(id)
        .then(member => this.member = member);
    });
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.memberService.update(this.member)
      .then(() => this.goBack());
  }
}
