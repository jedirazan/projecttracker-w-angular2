"use strict";
var testing_1 = require("@angular/core/testing");
var http_1 = require("@angular/http");
var testing_2 = require("@angular/http/testing");
var index_1 = require("../services/index");
describe('Service: TaskService', function () {
    var backend;
    var service;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [
                http_1.BaseRequestOptions,
                testing_2.MockBackend,
                index_1.TaskService,
                {
                    deps: [
                        testing_2.MockBackend,
                        http_1.BaseRequestOptions
                    ],
                    provide: http_1.Http,
                    useFactory: function (backend, defaultOptions) {
                        return new http_1.Http(backend, defaultOptions);
                    }
                }
            ]
        });
        var testbed = testing_1.getTestBed();
        backend = testbed.get(testing_2.MockBackend);
        service = testbed.get(index_1.TaskService);
    }));
    function setupConnections(backend, options) {
        backend.connections.subscribe(function (connection) {
            if (connection.request.url === 'api/tasks') {
                var responseOptions = new http_1.ResponseOptions(options);
                var response = new http_1.Response(responseOptions);
                connection.mockRespond(response);
            }
        });
    }
    it('should return the list of tasks from the server on success', function () {
        setupConnections(backend, {
            body: [
                {
                    id: 1,
                    title: 'Red',
                    sprint: 1,
                    effort: 0,
                    state: '',
                    assignee: 1,
                    relatedTicket: ''
                },
                {
                    id: 2,
                    title: 'Green',
                    sprint: 1,
                    effort: 0,
                    state: '',
                    assignee: 1,
                    relatedTicket: ''
                },
                {
                    id: 3,
                    title: 'Blue',
                    sprint: 1,
                    effort: 0,
                    state: '',
                    assignee: 1,
                    relatedTicket: ''
                }
            ],
            status: 200
        });
        service.getTasks().then(function (data) {
            expect(data.length).toBe(3);
            expect(data[0].title).toBe('Red');
            expect(data[1].title).toBe('Green');
            expect(data[2].title).toBe('Blue');
        });
    });
    it('should log an error to the console on error', function () {
        setupConnections(backend, {
            body: { error: "Something broke" },
            status: 500
        });
        spyOn(console, 'error');
        service.getTasks().then(null, function () {
            expect(console.error).toHaveBeenCalledWith("Something broke");
        });
    });
    it('should update 1st task', function () {
        setupConnections(backend, {
            body: [
                {
                    id: 1,
                    title: 'Red',
                    sprint: 1,
                    effort: 0,
                    state: '',
                    assignee: 1,
                    relatedTicket: ''
                }
            ],
            status: 200
        });
        var task = {
            id: 1,
            title: 'Magenta',
            sprint: 1,
            effort: 0,
            state: '',
            assignee: 1,
            relatedTicket: ''
        };
        service.update(task).then(function (data) {
            expect(data.title).toBe('Saturday');
        });
    });
    it('should create new task', function () {
        setupConnections(backend, {
            body: [],
            status: 200
        });
        service.create('Yellow', 1, 1, '', 1, '').then(function (data) {
            expect(data.title).toBe('Yellow');
        });
    });
});
//# sourceMappingURL=task.service.spec.js.map