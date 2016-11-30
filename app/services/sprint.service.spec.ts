import { async, getTestBed, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, Http, Response, ResponseOptions, XHRBackend } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { Sprint } from '../models/index';
import { SprintService } from '../services/index';

describe('Service: SprintService', () => {
	let backend: MockBackend;
	let service: SprintService;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			providers: [
			BaseRequestOptions,
			MockBackend,
			SprintService,
			{
				deps: [
				MockBackend,
				BaseRequestOptions
				],
				provide: Http,
				useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
					return new Http(backend, defaultOptions);
				}
			}
			]
		});

		const testbed = getTestBed();
		backend = testbed.get(MockBackend);
		service = testbed.get(SprintService);
	}));

	function setupConnections(backend: MockBackend, options: any) {
		backend.connections.subscribe((connection: MockConnection) => {
			if (connection.request.url === 'api/sprints') {
				const responseOptions = new ResponseOptions(options);
				const response = new Response(responseOptions);

				connection.mockRespond(response);
			}
		});
	}

	it('should return the list of sprints from the server on success', () => {
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

		service.getSprints().then((data: Sprint[]) => {
			expect(data.length).toBe(3);
			expect(data[0].title).toBe('Sunday');
			expect(data[1].title).toBe('Monday');
			expect(data[2].title).toBe('Tuesday');
		});
	});

	it('should log an error to the console on error', () => {
		setupConnections(backend, {
			body: { error: `Something broke` },
			status: 500
		});
		spyOn(console, 'error');

		service.getSprints().then(null, () => {
			expect(console.error).toHaveBeenCalledWith(`Something broke`);
		});
	});

	it('should update 1st sprint', () => {
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

		let sprint = {
			id: 1,
			title: 'Saturday',
		    project: 1,
		    tasks: [],
		    members: []
		};

		service.update(sprint).then((data: Sprint) => {
			expect(data.title).toBe('Saturday');
		});
	});

	it('should create new sprint', () => {
		setupConnections(backend, {
			body: [],
			status: 200
		});

		service.create('Friday', 1, []).then((data: Sprint) => {
			expect(data.title).toBe('Friday');
		});
	});
});