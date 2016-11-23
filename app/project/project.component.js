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
var ProjectComponent = (function () {
    function ProjectComponent(router, projectService) {
        this.router = router;
        this.projectService = projectService;
    }
    ProjectComponent.prototype.getProjects = function () {
        var _this = this;
        this.projectService.getProjects().then(function (projects) { return _this.projects = projects; });
    };
    ProjectComponent.prototype.ngOnInit = function () {
        this.getProjects();
    };
    ProjectComponent.prototype.gotoProjectDetails = function (project) {
        var link = ['/project', project.id];
        this.router.navigate(link);
    };
    return ProjectComponent;
}());
ProjectComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-project',
        templateUrl: 'project.component.html'
    }),
    __metadata("design:paramtypes", [router_1.Router,
        index_1.ProjectService])
], ProjectComponent);
exports.ProjectComponent = ProjectComponent;
//# sourceMappingURL=project.component.js.map