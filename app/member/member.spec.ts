import { Member } from '../models/index';

describe('Model: Member', () => {
	const testMembers: Array<Member> = [
  {
    id: 1,
    name: 'R2-D2',
    position: '',
    capacity: 0
  }
  ];
  let service: MemberService;

  beforeEach(() => {
    service = new MemberService();
  });

  it('#getAllMembers should, by default, return an empty array', () => {
    expect(service.getAllMembers()).toEqual([]);
  });

  it('#setMembers should set the `members` attribute', () => {
    service.setMembers(testMembers);
    expect(service.getAllMembers()).toEqual(testMembers);
  });

  describe('#getMember', () => {
    beforeEach(() => {
      service.setMembers(testMembers);
    });

    it('should return the member matching the provided ID', () => {
      expect(service.getMember(1)).toEqual(testMembers[0]);
    });

    it('should return `null` if it does NOT find a member matching the provided ID', () => {
      expect(service.getMember(2)).toBeNull();
      expect(service.getMember(null)).toBeNull();
    });
  });
});

export class MemberService {
	private members: Array<Member> = [];

	getAllMembers() {
		return this.members;
	}

	setMembers(newMembers: Array<Member>) {
		this.members = newMembers;
	}

	getMember(memberId: number): Member {
		let member = this.members.find((member) => member.id === memberId);

		if(!member) {
			member = null;
		}

		return member;
	}
}