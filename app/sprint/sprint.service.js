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
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
var SprintService = (function () {
    function SprintService(http) {
        this.http = http;
        this.sprintsUrl = 'app/sprints'; // URL to web api
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
    }
    SprintService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    SprintService.prototype.getSprint = function (id) {
        return this.getSprints()
            .then(function (sprints) { return sprints.find(function (sprint) { return sprint.id === id; }); });
    };
    SprintService.prototype.getSprints = function () {
        return this.http.get(this.sprintsUrl)
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    SprintService.prototype.update = function (sprint) {
        var url = this.sprintsUrl + "/" + sprint.id;
        return this.http
            .put(url, JSON.stringify(sprint), { headers: this.headers })
            .toPromise()
            .then(function () { return sprint; })
            .catch(this.handleError);
    };
    SprintService.prototype.create = function (title, project, members) {
        return this.http
            .post(this.sprintsUrl, JSON.stringify({ title: title, project: project, tasks: [], members: members }), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    SprintService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], SprintService);
    return SprintService;
}());
exports.SprintService = SprintService;
//# sourceMappingURL=sprint.service.js.map