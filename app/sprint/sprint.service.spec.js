"use strict";
var testing_1 = require('@angular/core/testing');
var http_1 = require('@angular/http');
var testing_2 = require('@angular/http/testing');
var sprint_service_1 = require('./sprint.service');
describe('Service: SprintService', function () {
    var backend;
    var service;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [
                http_1.BaseRequestOptions,
                testing_2.MockBackend,
                sprint_service_1.SprintService,
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
        service = testbed.get(sprint_service_1.SprintService);
    }));
    function setupConnections(backend, options) {
        backend.connections.subscribe(function (connection) {
            if (connection.request.url === 'api/forms') {
                var responseOptions = new http_1.ResponseOptions(options);
                var response = new http_1.Response(responseOptions);
                connection.mockRespond(response);
            }
        });
    }
    it('should return the list of sprints from the server on success', function () {
        setupConnections(backend, {
            body: [
                {
                    id: 1,
                    title: 'Sunday',
                    project: 1,
                    tasks: [],
                    members: []
                },
                {
                    id: 2,
                    title: 'Monday',
                    project: 1,
                    tasks: [],
                    members: []
                },
                {
                    id: 3,
                    title: 'Tuesday',
                    project: 1,
                    tasks: [],
                    members: []
                }
            ],
            status: 200
        });
        service.getSprints().then(function (data) {
            expect(data.length).toBe(3);
            expect(data[0].title).toBe('Sunday');
            expect(data[1].title).toBe('Monday');
            expect(data[2].title).toBe('Tuesday');
        });
    });
    it('should log an error to the console on error', function () {
        setupConnections(backend, {
            body: { error: "Something broke" },
            status: 500
        });
        spyOn(console, 'error');
        service.getSprints().then(null, function () {
            expect(console.error).toHaveBeenCalledWith("Something broke");
        });
    });
    it('should update 1st sprint', function () {
        setupConnections(backend, {
            body: [
                {
                    id: 1,
                    title: 'Sunday',
                    project: 1,
                    tasks: [],
                    members: []
                }
            ],
            status: 200
        });
        var sprint = {
            id: 1,
            title: 'Saturday',
            project: 1,
            tasks: [],
            members: []
        };
        service.update(sprint).then(function (data) {
            expect(data.title).toBe('Saturday');
        });
    });
    it('should create new sprint', function () {
        setupConnections(backend, {
            body: [],
            status: 200
        });
        service.create('Friday', 1, []).then(function (data) {
            expect(data.title).toBe('Friday');
        });
    });
});
//# sourceMappingURL=sprint.service.spec.js.map