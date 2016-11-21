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
var common_1 = require("@angular/common");
var sprint_service_1 = require("./sprint.service");
var project_service_1 = require("../project/project.service");
var member_service_1 = require("../member/member.service");
var SprintAddComponent = (function () {
    function SprintAddComponent(sprintService, projectService, memberService, route, location) {
        this.sprintService = sprintService;
        this.projectService = projectService;
        this.memberService = memberService;
        this.route = route;
        this.location = location;
        this.sprintMembers = [];
        this.nonMembers = [];
    }
    SprintAddComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            var id = +params['id'];
            _this.projectService.getProject(id)
                .then(function (project) {
                for (var _i = 0, _a = project.members; _i < _a.length; _i++) {
                    var id_1 = _a[_i];
                    _this.memberService.getMember(id_1)
                        .then(function (member) { return _this.nonMembers.push(member); });
                }
            });
        });
    };
    SprintAddComponent.prototype.addMember = function (id) {
        var _this = this;
        this.memberService.getMember(+id)
            .then(function (member) { return _this.sprintMembers.push(member); });
        this.nonMembers = this.nonMembers.filter(function (member) { return member.id !== +id; });
    };
    SprintAddComponent.prototype.removeMember = function (member) {
        this.sprintMembers = this.sprintMembers.filter(function (m) { return m !== member; });
        this.nonMembers.push(member);
    };
    SprintAddComponent.prototype.goBack = function () {
        this.location.back();
    };
    SprintAddComponent.prototype.addSprint = function (title, members) {
        var _this = this;
        title = title.trim();
        if (!title) {
            return;
        }
        var ids = [];
        for (var _i = 0, members_1 = members; _i < members_1.length; _i++) {
            var member = members_1[_i];
            ids.push(member.id);
        }
        this.route.params.forEach(function (params) {
            var projectId = +params['id'];
            _this.sprintService.create(title, projectId, ids)
                .then(function (sprint) {
                _this.projectService.getProject(projectId)
                    .then(function (project) {
                    project.sprints.push(sprint.id);
                    _this.projectService.update(project)
                        .then(function () { return _this.goBack(); });
                });
            });
        });
    };
    return SprintAddComponent;
}());
SprintAddComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-sprint-add',
        templateUrl: 'sprint-add.component.html'
    }),
    __metadata("design:paramtypes", [sprint_service_1.SprintService,
        project_service_1.ProjectService,
        member_service_1.MemberService,
        router_1.ActivatedRoute,
        common_1.Location])
], SprintAddComponent);
exports.SprintAddComponent = SprintAddComponent;
//# sourceMappingURL=sprint-add.component.js.map