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
var project_1 = require('./project');
var project_service_1 = require('./project.service');
var ProjectDetailComponent = (function () {
    function ProjectDetailComponent(projectService, route, location) {
        this.projectService = projectService;
        this.route = route;
        this.location = location;
    }
    ProjectDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            var id = +params['id'];
            _this.projectService.getProject(id)
                .then(function (project) { return _this.project = project; });
        });
    };
    ProjectDetailComponent.prototype.goBack = function () {
        this.location.back();
    };
    ProjectDetailComponent.prototype.save = function () {
        var _this = this;
        this.projectService.update(this.project)
            .then(function () { return _this.goBack(); });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', project_1.Project)
    ], ProjectDetailComponent.prototype, "project", void 0);
    ProjectDetailComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'my-project-detail',
            templateUrl: 'project-detail.component.html'
        }), 
        __metadata('design:paramtypes', [project_service_1.ProjectService, router_1.ActivatedRoute, common_1.Location])
    ], ProjectDetailComponent);
    return ProjectDetailComponent;
}());
exports.ProjectDetailComponent = ProjectDetailComponent;
//# sourceMappingURL=project-detail.component.js.map