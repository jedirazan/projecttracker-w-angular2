"use strict";
describe('Model: Task', function () {
    var testTasks = [
        {
            id: 1,
            title: 'Red',
            sprint: 1,
            effort: 0,
            state: '',
            assignee: 1,
            relatedTicket: ''
        }
    ];
    var service;
    beforeEach(function () {
        service = new TaskService();
    });
    it('#getAllTasks should, by default, return an empty array', function () {
        expect(service.getAllTasks()).toEqual([]);
    });
    it('#setTasks should set the `tasks` attribute', function () {
        service.setTasks(testTasks);
        expect(service.getAllTasks()).toEqual(testTasks);
    });
    describe('#getTask', function () {
        beforeEach(function () {
            service.setTasks(testTasks);
        });
        it('should return the task matching the provided ID', function () {
            expect(service.getTask(1)).toEqual(testTasks[0]);
        });
        it('should return `null` if it does NOT find a task matching the provided ID', function () {
            expect(service.getTask(2)).toBeNull();
            expect(service.getTask(null)).toBeNull();
        });
    });
});
var TaskService = (function () {
    function TaskService() {
        this.tasks = [];
    }
    TaskService.prototype.getAllTasks = function () {
        return this.tasks;
    };
    TaskService.prototype.setTasks = function (newTasks) {
        this.tasks = newTasks;
    };
    TaskService.prototype.getTask = function (taskId) {
        var task = this.tasks.find(function (task) { return task.id === taskId; });
        if (!task) {
            task = null;
        }
        return task;
    };
    return TaskService;
}());
exports.TaskService = TaskService;
//# sourceMappingURL=task.spec.js.map