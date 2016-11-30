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
var index_1 = require("../services/index");
var TaskAddComponent = (function () {
    function TaskAddComponent(sprintService, taskService, memberService, route, location) {
        this.sprintService = sprintService;
        this.taskService = taskService;
        this.memberService = memberService;
        this.route = route;
        this.location = location;
        this.members = []; // initialize because we're gonna do .push later
    }
    TaskAddComponent.prototype.populateSelectMember = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            var sprintId = +params['id'];
            _this.sprintService.getSprint(sprintId)
                .then(function (sprint) {
                for (var _i = 0, _a = sprint.members; _i < _a.length; _i++) {
                    var m = _a[_i];
                    _this.memberService.getMember(+m)
                        .then(function (member) { return _this.members.push(member); }); // .push each Member here
                }
            });
        });
    };
    TaskAddComponent.prototype.ngOnInit = function () {
        this.populateSelectMember();
    };
    TaskAddComponent.prototype.goBack = function () {
        this.location.back();
    };
    TaskAddComponent.prototype.addTask = function (title, effort, state, assignee, relatedTicket) {
        var _this = this;
        state = state.trim();
        title = title.trim();
        relatedTicket = relatedTicket.trim();
        if (!state || !title) {
            return;
        }
        this.route.params.forEach(function (params) {
            var sprintId = +params['id'];
            _this.taskService.create(title, sprintId, effort, state, assignee, relatedTicket)
                .then(function (task) {
                _this.sprintService.getSprint(sprintId)
                    .then(function (sprint) {
                    sprint.tasks.push(task.id);
                    _this.sprintService.update(sprint)
                        .then(function () { return _this.goBack(); });
                });
            });
        });
    };
    return TaskAddComponent;
}());
TaskAddComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-task-add',
        templateUrl: 'task-add.component.html'
    }),
    __metadata("design:paramtypes", [index_1.SprintService,
        index_1.TaskService,
        index_1.MemberService,
        router_1.ActivatedRoute,
        common_1.Location])
], TaskAddComponent);
exports.TaskAddComponent = TaskAddComponent;
//# sourceMappingURL=task-add.component.js.map