"use strict";
var testing_1 = require("@angular/core/testing");
var http_1 = require("@angular/http");
var testing_2 = require("@angular/http/testing");
var index_1 = require("../services/index");
describe('Service: ProjectService', function () {
    var backend;
    var service;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [
                http_1.BaseRequestOptions,
                testing_2.MockBackend,
                index_1.ProjectService,
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
        service = testbed.get(index_1.ProjectService);
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
    it('should return the list of projects from the server on success', function () {
        setupConnections(backend, {
            body: [
                {
                    id: 1,
                    title: 'Pizza',
                    summary: '',
                    sprints: [],
                    members: []
                },
                {
                    id: 2,
                    title: 'Taco',
                    summary: '',
                    sprints: [],
                    members: []
                },
                {
                    id: 3,
                    title: 'Cheeseburger',
                    summary: '',
                    sprints: [],
                    members: []
                }
            ],
            status: 200
        });
        service.getProjects().then(function (data) {
            expect(data.length).toBe(3);
            expect(data[0].title).toBe('Pizza');
            expect(data[1].title).toBe('Taco');
            expect(data[2].title).toBe('Cheeseburger');
        });
    });
    it('should log an error to the console on error', function () {
        setupConnections(backend, {
            body: { error: "Houston, we have a problem." },
            status: 500
        });
        spyOn(console, 'error');
        service.getProjects().then(null, function () {
            expect(console.error).toHaveBeenCalledWith("Houston, we have a problem.");
        });
    });
    it('should update 1st project', function () {
        setupConnections(backend, {
            body: [
                {
                    id: 1,
                    title: 'Pizza',
                    summary: '',
                    sprints: [],
                    members: []
                }
            ],
            status: 200
        });
        var project = {
            id: 1,
            title: 'Pizza Roll',
            summary: '',
            sprints: [],
            members: []
        };
        service.update(project).then(function (data) {
            expect(data.title).toBe('Pizza Roll');
        });
    });
    it('should create new project', function () {
        setupConnections(backend, {
            body: [],
            status: 200
        });
        service.create('Preztel', '', []).then(function (data) {
            expect(data.title).toBe('Pretzel');
        });
    });
});
//# sourceMappingURL=project.service.spec.js.map