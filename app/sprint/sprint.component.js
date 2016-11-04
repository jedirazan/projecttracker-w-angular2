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
var project_service_1 = require('../project/project.service');
var sprint_1 = require('./sprint');
var sprint_service_1 = require('./sprint.service');
var task_service_1 = require('../task/task.service');
var member_service_1 = require('../member/member.service');
var SprintComponent = (function () {
    function SprintComponent(router, route, projectService, sprintService, taskService, memberService, location) {
        this.router = router;
        this.route = route;
        this.projectService = projectService;
        this.sprintService = sprintService;
        this.taskService = taskService;
        this.memberService = memberService;
        this.location = location;
        this.sprintTasks = [];
        this.sumEffort = 0;
        this.totalAssigned = 0;
        this.totalNew = 0;
        this.totalInProgress = 0;
        this.totalDone = 0;
        this.sprintMembers = [];
        this.sumCapacity = 0;
        this.displayStats = 'ui tiny horizontal statistic';
        this.nonMembers = [];
    }
    SprintComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            var id = +params['id'];
            _this.sprintService.getSprint(id)
                .then(function (sprint) { return _this.sprint = sprint; })
                .then(function (sprint) {
                if (sprint.tasks.length > 0) {
                    for (var _i = 0, _a = sprint.tasks; _i < _a.length; _i++) {
                        var tid = _a[_i];
                        _this.taskService.getTask(tid).then(function (task) {
                            _this.sprintTasks.push(task);
                            _this.sumEffort += +task.effort;
                            if (task.assignee) {
                                _this.totalAssigned++;
                            }
                            switch (task.state) {
                                case 'New':
                                    _this.totalNew++;
                                    break;
                                case 'In Progress':
                                    _this.totalInProgress++;
                                    break;
                                case 'Done':
                                    _this.totalDone++;
                                    break;
                            }
                        });
                    }
                }
                if (sprint.members.length > 0) {
                    for (var _b = 0, _c = sprint.members; _b < _c.length; _b++) {
                        var mid = _c[_b];
                        _this.memberService.getMember(mid).then(function (member) {
                            _this.sprintMembers.push(member);
                            _this.sumCapacity += +member.capacity;
                        });
                    }
                }
                _this.projectService.getProject(sprint.project)
                    .then(function (project) {
                    for (var _i = 0, _a = project.members; _i < _a.length; _i++) {
                        var id_1 = _a[_i];
                        if (!sprint.members.includes(id_1)) {
                            _this.memberService.getMember(id_1).then(function (member) { return _this.nonMembers.push(member); });
                        }
                    }
                });
            });
        });
    };
    SprintComponent.prototype.getMemberName = function (id) {
        var m;
        for (var _i = 0, _a = this.sprintMembers; _i < _a.length; _i++) {
            var member = _a[_i];
            if (member.id === +id) {
                m = member.name;
            }
        }
        return m;
    };
    SprintComponent.prototype.sumEffortIndividual = function (member) {
        var s = 0;
        var relatedTasks;
        relatedTasks = this.sprintTasks.filter(function (relatedTasks) { return +relatedTasks.assignee === +member.id; });
        for (var _i = 0, relatedTasks_1 = relatedTasks; _i < relatedTasks_1.length; _i++) {
            var t = relatedTasks_1[_i];
            s += +t.effort;
        }
        return s;
    };
    SprintComponent.prototype.statsState = function (danger, variations) {
        if (danger) {
            return 'ui red statistic' + variations;
        }
        else {
            return 'ui statistic' + variations;
        }
    };
    SprintComponent.prototype.addTask = function (sprint) {
        var link = ['/task/add', sprint.id];
        this.router.navigate(link);
    };
    SprintComponent.prototype.removeTask = function (task) {
        this.sprint.tasks = this.sprint.tasks.filter(function (i) { return i !== task.id; });
        this.sprintTasks = this.sprintTasks.filter(function (t) { return t.id !== task.id; });
        this.sprintService.update(this.sprint);
        this.sumEffort -= task.effort;
        this.totalAssigned--;
        switch (task.state) {
            case 'New':
                this.totalNew--;
                break;
            case 'In Progress':
                this.totalInProgress--;
                break;
            case 'Done':
                this.totalDone--;
                break;
        }
    };
    SprintComponent.prototype.gotoDetailTask = function (task) {
        var link = ['/task', task.id];
        this.router.navigate(link);
    };
    SprintComponent.prototype.addMember = function (id) {
        var _this = this;
        this.sprint.members.push(+id);
        this.sprintService.update(this.sprint);
        this.memberService.getMember(+id)
            .then(function (member) {
            _this.sprintMembers.push(member);
            _this.sumCapacity += member.capacity;
        });
        this.nonMembers = this.nonMembers.filter(function (member) { return member.id !== +id; });
    };
    SprintComponent.prototype.removeMember = function (member) {
        this.sprint.members = this.sprint.members.filter(function (i) { return i !== member.id; });
        this.sprintMembers = this.sprintMembers.filter(function (m) { return m.id !== member.id; });
        this.sprintService.update(this.sprint);
        this.sumCapacity -= member.capacity;
        this.nonMembers.push(member);
    };
    SprintComponent.prototype.gotoDetailMember = function (member) {
        var link = ['/member', member.id];
        this.router.navigate(link);
    };
    SprintComponent.prototype.saveSprint = function () {
        var _this = this;
        var link = ['/project', this.sprint.project];
        this.sprintService.update(this.sprint).then(function () { return _this.router.navigate(link); });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', sprint_1.Sprint)
    ], SprintComponent.prototype, "sprint", void 0);
    SprintComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-sprint',
            templateUrl: 'sprint.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, project_service_1.ProjectService, sprint_service_1.SprintService, task_service_1.TaskService, member_service_1.MemberService, common_1.Location])
    ], SprintComponent);
    return SprintComponent;
}());
exports.SprintComponent = SprintComponent;
//# sourceMappingURL=sprint.component.js.map