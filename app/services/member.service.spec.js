"use strict";
var testing_1 = require("@angular/core/testing");
var http_1 = require("@angular/http");
var testing_2 = require("@angular/http/testing");
var index_1 = require("../services/index");
describe('Service: MemberService', function () {
    var backend;
    var service;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [
                http_1.BaseRequestOptions,
                testing_2.MockBackend,
                index_1.MemberService,
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
        service = testbed.get(index_1.MemberService);
    }));
    function setupConnections(backend, options) {
        backend.connections.subscribe(function (connection) {
            if (connection.request.url === 'api/members') {
                var responseOptions = new http_1.ResponseOptions(options);
                var response = new http_1.Response(responseOptions);
                connection.mockRespond(response);
            }
        });
    }
    it('should return the list of members from the server on success', function () {
        setupConnections(backend, {
            body: [
                {
                    id: 1,
                    name: 'R2-D2',
                    position: '',
                    capacity: 0
                },
                {
                    id: 2,
                    name: 'C3P0',
                    position: '',
                    capacity: 0
                },
                {
                    id: 3,
                    name: 'BB8',
                    position: '',
                    capacity: 0
                }
            ],
            status: 200
        });
        service.getMembers().then(function (data) {
            expect(data.length).toBe(3);
            expect(data[0].name).toBe('R2-D2');
            expect(data[1].name).toBe('C3P0');
            expect(data[2].name).toBe('BB8');
        });
    });
    it('should log an error to the console on error', function () {
        setupConnections(backend, {
            body: { error: "I have a bad feeling about this." },
            status: 500
        });
        spyOn(console, 'error');
        service.getMembers().then(null, function () {
            expect(console.error).toHaveBeenCalledWith("I have a bad feeling about this.");
        });
    });
    it('should update 1st member', function () {
        setupConnections(backend, {
            body: [],
            status: 200
        });
        var member = {
            id: 1,
            name: 'C2-B5',
            position: '',
            capacity: 0
        };
        service.update(member).then(function (data) {
            expect(data.name).toBe('C2-B5');
        });
    });
    it('should create new member', function () {
        setupConnections(backend, {
            body: [],
            status: 200
        });
        service.create('K-2S0', '', 0).then(function (data) {
            expect(data.name).toBe('K-2S0');
        });
    });
});
//# sourceMappingURL=member.service.spec.js.map