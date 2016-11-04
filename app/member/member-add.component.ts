import { Component }  from '@angular/core';
import { Location }   from '@angular/common';

import { MemberService } from './member.service';
import { Member } from './member';

@Component({
  moduleId: module.id,
  selector: 'my-member-add',
  templateUrl: 'member-add.component.html'
})

export class MemberAddComponent {

  constructor(
    private memberService: MemberService,
    private location: Location
  ) {}

  goBack(): void {
    this.location.back();
  }

	add(name: string, position: string, capacity: number): void {
    name = name.trim();
    position = position.trim();
    if (!name || !position || !capacity) { return; }
    this.memberService.create(name, position, capacity)
	    .then(() => this.goBack());
  }
}
