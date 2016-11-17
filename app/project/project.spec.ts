import { Project } from './project';

describe('Model: Project', () => {
	const testProjects: Array<Project> = [
  {
    id: 1,
    title: 'Pizza',
    summary: '',
    sprints: [],
    members: []
  }
  ];
  let service: ProjectService;

  beforeEach(() => {
    service = new ProjectService();
  });

  it('#getAllProjects should, by default, return an empty array', () => {
    expect(service.getAllProjects()).toEqual([]);
  });

  it('#setProjects should set the `projects` attribute', () => {
    service.setProjects(testProjects);
    expect(service.getAllProjects()).toEqual(testProjects);
  });

  describe('#getProject', () => {
    beforeEach(() => {
      service.setProjects(testProjects);
    });

    it('should return the project matching the provided ID', () => {
      expect(service.getProject(1)).toEqual(testProjects[0]);
    });

    it('should return `null` if it does NOT find a project matching the provided ID', () => {
      expect(service.getProject(2)).toBeNull();
      expect(service.getProject(null)).toBeNull();
    });
  });
});

export class ProjectService {
	private projects: Array<Project> = [];

	getAllProjects() {
		return this.projects;
	}

	setProjects(newProjects: Array<Project>) {
		this.projects = newProjects;
	}

	getProject(projectId: number): Project {
		let project = this.projects.find((project) => project.id === projectId);

		if(!project) {
			project = null;
		}

		return project;
	}
}