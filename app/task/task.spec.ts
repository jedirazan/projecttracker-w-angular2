import { Task } from '../models/index';

describe('Model: Task', () => {
	const testTasks: Array<Task> = [
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
  let service: TaskService;

  beforeEach(() => {
    service = new TaskService();
  });

  it('#getAllTasks should, by default, return an empty array', () => {
    expect(service.getAllTasks()).toEqual([]);
  });

  it('#setTasks should set the `tasks` attribute', () => {
    service.setTasks(testTasks);
    expect(service.getAllTasks()).toEqual(testTasks);
  });

  describe('#getTask', () => {
    beforeEach(() => {
      service.setTasks(testTasks);
    });

    it('should return the task matching the provided ID', () => {
      expect(service.getTask(1)).toEqual(testTasks[0]);
    });

    it('should return `null` if it does NOT find a task matching the provided ID', () => {
      expect(service.getTask(2)).toBeNull();
      expect(service.getTask(null)).toBeNull();
    });
  });
});

export class TaskService {
	private tasks: Array<Task> = [];

	getAllTasks() {
		return this.tasks;
	}

	setTasks(newTasks: Array<Task>) {
		this.tasks = newTasks;
	}

	getTask(taskId: number): Task {
		let task = this.tasks.find((task) => task.id === taskId);

		if(!task) {
			task = null;
		}

		return task;
	}
}