"use strict";
describe('Model: Member', function () {
    var testMembers = [
        {
            id: 1,
            name: 'R2-D2',
            position: '',
            capacity: 0
        }
    ];
    var service;
    beforeEach(function () {
        service = new MemberService();
    });
    it('#getAllMembers should, by default, return an empty array', function () {
        expect(service.getAllMembers()).toEqual([]);
    });
    it('#setMembers should set the `members` attribute', function () {
        service.setMembers(testMembers);
        expect(service.getAllMembers()).toEqual(testMembers);
    });
    describe('#getMember', function () {
        beforeEach(function () {
            service.setMembers(testMembers);
        });
        it('should return the member matching the provided ID', function () {
            expect(service.getMember(1)).toEqual(testMembers[0]);
        });
        it('should return `null` if it does NOT find a member matching the provided ID', function () {
            expect(service.getMember(2)).toBeNull();
            expect(service.getMember(null)).toBeNull();
        });
    });
});
var MemberService = (function () {
    function MemberService() {
        this.members = [];
    }
    MemberService.prototype.getAllMembers = function () {
        return this.members;
    };
    MemberService.prototype.setMembers = function (newMembers) {
        this.members = newMembers;
    };
    MemberService.prototype.getMember = function (memberId) {
        var member = this.members.find(function (member) { return member.id === memberId; });
        if (!member) {
            member = null;
        }
        return member;
    };
    return MemberService;
}());
exports.MemberService = MemberService;
//# sourceMappingURL=member.spec.js.map