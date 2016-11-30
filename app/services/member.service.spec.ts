import { async, getTestBed, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, Http, Response, ResponseOptions, XHRBackend } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { Member } from '../models/index';
import { MemberService } from '../services/index';

describe('Service: MemberService', () => {
	let backend: MockBackend;
	let service: MemberService;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			providers: [
			BaseRequestOptions,
			MockBackend,
			MemberService,
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
		service = testbed.get(MemberService);
	}));

	function setupConnections(backend: MockBackend, options: any) {
		backend.connections.subscribe((connection: MockConnection) => {
			if (connection.request.url === 'api/members') {
				const responseOptions = new ResponseOptions(options);
				const response = new Response(responseOptions);

				connection.mockRespond(response);
			}
		});
	}

	it('should return the list of members from the server on success', () => {
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

		service.getMembers().then((data: Member[]) => {
			expect(data.length).toBe(3);
			expect(data[0].name).toBe('R2-D2');
			expect(data[1].name).toBe('C3P0');
			expect(data[2].name).toBe('BB8');
		});
	});

	it('should log an error to the console on error', () => {
		setupConnections(backend, {
			body: { error: `I have a bad feeling about this.` },
			status: 500
		});
		spyOn(console, 'error');

		service.getMembers().then(null, () => {
			expect(console.error).toHaveBeenCalledWith(`I have a bad feeling about this.`);
		});
	});

	it('should update 1st member', () => {
		setupConnections(backend, {
			body: [],
				status: 200
			});

		let member = {
			id: 1,
			name: 'C2-B5',
			position: '',
			capacity: 0
		};

		service.update(member).then((data: Member) => {
			expect(data.name).toBe('C2-B5');
		});
	});

	it('should create new member', () => {
		setupConnections(backend, {
			body: [],
			status: 200
		});

		service.create('K-2S0', '', 0).then((data: Member) => {
			expect(data.name).toBe('K-2S0');
		});
	});
});