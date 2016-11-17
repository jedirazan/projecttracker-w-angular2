"use strict";
describe('Model: Project', function () {
    var testProjects = [
        {
            id: 1,
            title: 'Pizza',
            summary: '',
            sprints: [],
            members: []
        }
    ];
    var service;
    beforeEach(function () {
        service = new ProjectService();
    });
    it('#getAllProjects should, by default, return an empty array', function () {
        expect(service.getAllProjects()).toEqual([]);
    });
    it('#setProjects should set the `projects` attribute', function () {
        service.setProjects(testProjects);
        expect(service.getAllProjects()).toEqual(testProjects);
    });
    describe('#getProject', function () {
        beforeEach(function () {
            service.setProjects(testProjects);
        });
        it('should return the project matching the provided ID', function () {
            expect(service.getProject(1)).toEqual(testProjects[0]);
        });
        it('should return `null` if it does NOT find a project matching the provided ID', function () {
            expect(service.getProject(2)).toBeNull();
            expect(service.getProject(null)).toBeNull();
        });
    });
});
var ProjectService = (function () {
    function ProjectService() {
        this.projects = [];
    }
    ProjectService.prototype.getAllProjects = function () {
        return this.projects;
    };
    ProjectService.prototype.setProjects = function (newProjects) {
        this.projects = newProjects;
    };
    ProjectService.prototype.getProject = function (projectId) {
        var project = this.projects.find(function (project) { return project.id === projectId; });
        if (!project) {
            project = null;
        }
        return project;
    };
    return ProjectService;
}());
exports.ProjectService = ProjectService;
//# sourceMappingURL=project.spec.js.map