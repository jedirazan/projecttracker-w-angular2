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
var project_service_1 = require("./project.service");
var project_1 = require("./project");
var member_service_1 = require("../member/member.service");
var sprint_service_1 = require("../sprint/sprint.service");
var ProjectComponent = (function () {
    function ProjectComponent(projectService, sprintService, memberService, router, route, location) {
        this.projectService = projectService;
        this.sprintService = sprintService;
        this.memberService = memberService;
        this.router = router;
        this.route = route;
        this.location = location;
        this.projectMembers = [];
        this.projectSprints = [];
    }
    ProjectComponent.prototype.getMembers = function () {
        var _this = this;
        this.memberService.getMembers()
            .then(function (members) { return _this.nonMembers = members; });
    };
    ProjectComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getMembers();
        this.route.params.forEach(function (params) {
            var id = +params['id'];
            _this.projectService.getProject(id)
                .then(function (project) { return _this.project = project; })
                .then(function (project) {
                var _loop_1 = function (id_1) {
                    _this.memberService.getMember(id_1)
                        .then(function (member) { return _this.projectMembers.push(member); });
                    _this.nonMembers = _this.nonMembers.filter(function (member) { return member.id !== id_1; });
                };
                for (var _i = 0, _a = project.members; _i < _a.length; _i++) {
                    var id_1 = _a[_i];
                    _loop_1(id_1);
                }
                for (var _b = 0, _c = project.sprints; _b < _c.length; _b++) {
                    var id_2 = _c[_b];
                    _this.sprintService.getSprint(id_2)
                        .then(function (sprint) { return _this.projectSprints.push(sprint); });
                }
            });
        });
    };
    ProjectComponent.prototype.addMember = function (id) {
        var _this = this;
        this.project.members.push(+id);
        this.projectService.update(this.project);
        this.memberService.getMember(+id)
            .then(function (member) { return _this.projectMembers.push(member); });
        this.nonMembers = this.nonMembers.filter(function (member) { return member.id !== +id; });
    };
    ProjectComponent.prototype.removeMember = function (member) {
        this.project.members = this.project.members.filter(function (i) { return i !== member.id; });
        this.projectService.update(this.project);
        this.projectMembers = this.projectMembers.filter(function (m) { return m !== member; });
        this.nonMembers.push(member);
    };
    ProjectComponent.prototype.gotoIteration = function (sprint) {
        var link = ['/iteration', sprint.id];
        this.router.navigate(link);
    };
    ProjectComponent.prototype.addIteration = function (project) {
        var link = ['/iteration/add', project.id];
        this.router.navigate(link);
    };
    ProjectComponent.prototype.goBack = function () {
        this.location.back();
    };
    ProjectComponent.prototype.saveProject = function () {
        var _this = this;
        var link = ['/dashboard'];
        this.projectService.update(this.project).then(function () { return _this.router.navigate(link); });
    };
    return ProjectComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", project_1.Project)
], ProjectComponent.prototype, "project", void 0);
ProjectComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-project',
        templateUrl: 'project.component.html'
    }),
    __metadata("design:paramtypes", [project_service_1.ProjectService,
        sprint_service_1.SprintService,
        member_service_1.MemberService,
        router_1.Router,
        router_1.ActivatedRoute,
        common_1.Location])
], ProjectComponent);
exports.ProjectComponent = ProjectComponent;
//# sourceMappingURL=project.component.js.map