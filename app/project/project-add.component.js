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
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var common_1 = require('@angular/common');
var project_service_1 = require('./project.service');
var member_service_1 = require('../member/member.service');
var ProjectAddComponent = (function () {
    function ProjectAddComponent(projectService, memberService, router, location) {
        this.projectService = projectService;
        this.memberService = memberService;
        this.router = router;
        this.location = location;
        this.projectMembers = [];
        this.nonMembers = [];
    }
    ProjectAddComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.memberService.getMembers()
            .then(function (members) { return _this.nonMembers = members; });
    };
    ProjectAddComponent.prototype.addMember = function (id) {
        var _this = this;
        this.memberService.getMember(+id)
            .then(function (member) { return _this.projectMembers.push(member); });
        this.nonMembers = this.nonMembers.filter(function (member) { return member.id !== +id; });
    };
    ProjectAddComponent.prototype.removeMember = function (member) {
        this.projectMembers = this.projectMembers.filter(function (m) { return m !== member; });
        this.nonMembers.push(member);
    };
    ProjectAddComponent.prototype.goBack = function () {
        this.location.back();
    };
    ProjectAddComponent.prototype.addProject = function (title, summary, members) {
        var _this = this;
        title = title.trim();
        summary = summary.trim();
        if (!title || !summary) {
            return;
        }
        var ids = [];
        for (var _i = 0, members_1 = members; _i < members_1.length; _i++) {
            var member = members_1[_i];
            ids.push(member.id);
        }
        this.projectService.create(title, summary, ids)
            .then(function () { return _this.router.navigate(['/dashboard']); });
    };
    ProjectAddComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-project-add',
            templateUrl: 'project-add.component.html'
        }), 
        __metadata('design:paramtypes', [project_service_1.ProjectService, member_service_1.MemberService, router_1.Router, common_1.Location])
    ], ProjectAddComponent);
    return ProjectAddComponent;
}());
exports.ProjectAddComponent = ProjectAddComponent;
//# sourceMappingURL=project-add.component.js.map