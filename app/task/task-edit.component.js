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
var sprint_service_1 = require("../sprint/sprint.service");
var task_service_1 = require("./task.service");
var task_1 = require("./task");
var member_service_1 = require("../member/member.service");
var TaskEditComponent = (function () {
    function TaskEditComponent(sprintService, taskService, memberService, route, location) {
        this.sprintService = sprintService;
        this.taskService = taskService;
        this.memberService = memberService;
        this.route = route;
        this.location = location;
        this.members = []; // initialize because we're gonna do .push later
    }
    TaskEditComponent.prototype.populateSelectState = function () {
        var _this = this;
        this.taskService.getState()
            .then(function (state) { return _this.state = state; });
    };
    TaskEditComponent.prototype.populateSelectMember = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            var id = +params['id'];
            _this.taskService.getTask(id)
                .then(function (task) {
                _this.task = task;
                _this.sprintService.getSprint(+task.sprint)
                    .then(function (sprint) {
                    for (var _i = 0, _a = sprint.members; _i < _a.length; _i++) {
                        var m = _a[_i];
                        _this.memberService.getMember(+m)
                            .then(function (member) { return _this.members.push(member); }); // .push each Member here
                    }
                });
            });
        });
    };
    TaskEditComponent.prototype.ngOnInit = function () {
        this.populateSelectState();
        this.populateSelectMember();
    };
    TaskEditComponent.prototype.goBack = function () {
        this.location.back();
    };
    TaskEditComponent.prototype.saveTask = function () {
        var _this = this;
        this.taskService.update(this.task)
            .then(function (task) {
            _this.sprintService.getSprint(task.sprint)
                .then(function (sprint) {
                if (!sprint.tasks.includes(task.id)) {
                    sprint.tasks.push(task.id);
                }
                _this.sprintService.update(sprint)
                    .then(function () { return _this.goBack(); });
            });
        });
    };
    return TaskEditComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", task_1.Task)
], TaskEditComponent.prototype, "task", void 0);
TaskEditComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-task-edit',
        templateUrl: 'task-edit.component.html'
    }),
    __metadata("design:paramtypes", [sprint_service_1.SprintService,
        task_service_1.TaskService,
        member_service_1.MemberService,
        router_1.ActivatedRoute,
        common_1.Location])
], TaskEditComponent);
exports.TaskEditComponent = TaskEditComponent;
//# sourceMappingURL=task-edit.component.js.map