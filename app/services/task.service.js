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
var http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
var TaskService = (function () {
    function TaskService(http) {
        this.http = http;
        this.tasksUrl = 'app/tasks'; // URL to web api
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    TaskService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    TaskService.prototype.getTask = function (id) {
        return this.getTasks()
            .then(function (tasks) { return tasks.find(function (task) { return task.id === id; }); });
    };
    TaskService.prototype.getTasks = function () {
        return this.http.get(this.tasksUrl)
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    TaskService.prototype.totalEffort = function () {
        return this.getTasks().then(function (tasks) {
            var sum = 0;
            for (var _i = 0, tasks_1 = tasks; _i < tasks_1.length; _i++) {
                var task = tasks_1[_i];
                sum += +task.effort;
            }
            return sum;
        });
    };
    TaskService.prototype.update = function (task) {
        var url = this.tasksUrl + "/" + task.id;
        return this.http
            .put(url, JSON.stringify(task), { headers: this.headers })
            .toPromise()
            .then(function () { return task; })
            .catch(this.handleError);
    };
    TaskService.prototype.create = function (title, sprint, effort, state, assignee, relatedTicket) {
        return this.http
            .post(this.tasksUrl, JSON.stringify({ title: title, sprint: sprint, effort: effort, state: state, assignee: assignee, relatedTicket: relatedTicket }), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    return TaskService;
}());
TaskService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], TaskService);
exports.TaskService = TaskService;
//# sourceMappingURL=task.service.js.map