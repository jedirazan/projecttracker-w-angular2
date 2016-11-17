"use strict";
describe('Model: Sprint', function () {
    var testSprints = [
        {
            id: 1,
            title: 'Sunday',
            project: 1,
            tasks: [],
            members: []
        }
    ];
    var service;
    beforeEach(function () {
        service = new SprintService();
    });
    it('#getAllSprints should, by default, return an empty array', function () {
        expect(service.getAllSprints()).toEqual([]);
    });
    it('#setSprints should set the `sprints` attribute', function () {
        service.setSprints(testSprints);
        expect(service.getAllSprints()).toEqual(testSprints);
    });
    describe('#getSprint', function () {
        beforeEach(function () {
            service.setSprints(testSprints);
        });
        it('should return the sprint matching the provided ID', function () {
            expect(service.getSprint(1)).toEqual(testSprints[0]);
        });
        it('should return `null` if it does NOT find a sprint matching the provided ID', function () {
            expect(service.getSprint(2)).toBeNull();
            expect(service.getSprint(null)).toBeNull();
        });
    });
});
var SprintService = (function () {
    function SprintService() {
        this.sprints = [];
    }
    SprintService.prototype.getAllSprints = function () {
        return this.sprints;
    };
    SprintService.prototype.setSprints = function (newSprints) {
        this.sprints = newSprints;
    };
    SprintService.prototype.getSprint = function (sprintId) {
        var sprint = this.sprints.find(function (sprint) { return sprint.id === sprintId; });
        if (!sprint) {
            sprint = null;
        }
        return sprint;
    };
    return SprintService;
}());
exports.SprintService = SprintService;
//# sourceMappingURL=sprint.spec.js.map