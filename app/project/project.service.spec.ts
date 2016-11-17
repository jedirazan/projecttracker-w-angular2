import { async, getTestBed, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, Http, Response, ResponseOptions, XHRBackend } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { ProjectService } from './project.service';
import { Project } from './project';

describe('Service: ProjectService', () => {
	let backend: MockBackend;
	let service: ProjectService;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			providers: [
			BaseRequestOptions,
			MockBackend,
			ProjectService,
			{
				deps: [
				MockBackend,
				BaseRequestOptions
				],
				provide: Http,
				useFactory: (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
					return new Http(backend, defaultOptions);
				}
			}
			]
		});

		const testbed = getTestBed();
		backend = testbed.get(MockBackend);
		service = testbed.get(ProjectService);
	}));

	function setupConnections(backend: MockBackend, options: any) {
		backend.connections.subscribe((connection: MockConnection) => {
			if (connection.request.url === 'api/forms') {
				const responseOptions = new ResponseOptions(options);
				const response = new Response(responseOptions);

				connection.mockRespond(response);
			}
		});
	}

	it('should return the list of projects from the server on success', () => {
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

		service.getProjects().then((data: Project[]) => {
			expect(data.length).toBe(3);
			expect(data[0].title).toBe('Pizza');
			expect(data[1].title).toBe('Taco');
			expect(data[2].title).toBe('Cheeseburger');
		});
	});

	it('should log an error to the console on error', () => {
		setupConnections(backend, {
			body: { error: `Houston, we have a problem.` },
			status: 500
		});
		spyOn(console, 'error');

		service.getProjects().then(null, () => {
			expect(console.error).toHaveBeenCalledWith(`Houston, we have a problem.`);
		});
	});

	it('should update 1st project', () => {
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

		let project = {
				id: 1,
				title: 'Pizza Roll',
				summary: '',
				sprints: [],
				members: []
			};

		service.update(project).then((data: Project) => {
			expect(data.title).toBe('Pizza Roll');
		});
	});

	it('should create new project', () => {
		setupConnections(backend, {
			body: [],
			status: 200
		});

		service.create('Preztel', '', []).then((data: Project) => {
			expect(data.title).toBe('Pretzel');
		});
	});
});