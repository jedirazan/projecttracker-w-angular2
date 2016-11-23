"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var index_1 = require("../services/index");
var MemberComponent = (function () {
    function MemberComponent(router, memberService) {
        this.router = router;
        this.memberService = memberService;
    }
    MemberComponent.prototype.getMembers = function () {
        var _this = this;
        this.memberService.getMembers().then(function (members) { return _this.members = members; });
    };
    MemberComponent.prototype.ngOnInit = function () {
        this.getMembers();
    };
    MemberComponent.prototype.gotoDetailMember = function (member) {
        var link = ['/member', member.id];
        this.router.navigate(link);
    };
    return MemberComponent;
}());
MemberComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-members',
        templateUrl: 'member.component.html'
    }),
    __metadata("design:paramtypes", [router_1.Router,
        index_1.MemberService])
], MemberComponent);
exports.MemberComponent = MemberComponent;
//# sourceMappingURL=member.component.js.map