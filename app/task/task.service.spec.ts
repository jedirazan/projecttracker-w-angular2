import { async, getTestBed, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, Http, Response, ResponseOptions, XHRBackend } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { TaskService } from './task.service';
import { Task } from './task';

describe('Service: TaskService', () => {
	let backend: MockBackend;
	let service: TaskService;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			providers: [
			BaseRequestOptions,
			MockBackend,
			TaskService,
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
		service = testbed.get(TaskService);
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

	it('should return the list of tasks from the server on success', () => {
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

		service.getTasks().then((data: Task[]) => {
			expect(data.length).toBe(3);
			expect(data[0].title).toBe('Red');
			expect(data[1].title).toBe('Green');
			expect(data[2].title).toBe('Blue');
		});
	});

	it('should log an error to the console on error', () => {
		setupConnections(backend, {
			body: { error: `Something broke` },
			status: 500
		});
		spyOn(console, 'error');

		service.getTasks().then(null, () => {
			expect(console.error).toHaveBeenCalledWith(`Something broke`);
		});
	});

	it('should update 1st task', () => {
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

		let task = {
			id: 1,
			title: 'Magenta',
		    sprint: 1,
		    effort: 0,
		    state: '',
		    assignee: 1,
		    relatedTicket: ''
		};

		service.update(task).then((data: Task) => {
			expect(data.title).toBe('Saturday');
		});
	});

	it('should create new task', () => {
		setupConnections(backend, {
			body: [],
			status: 200
		});

		service.create('Yellow', 1, 1, '', 1, '').then((data: Task) => {
			expect(data.title).toBe('Yellow');
		});
	});
});