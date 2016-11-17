import { Sprint } from './sprint';

describe('Model: Sprint', () => {
	const testSprints: Array<Sprint> = [
  {
    id: 1,
    title: 'Sunday',
    project: 1,
    tasks: [],
    members: []
  }
  ];
  let service: SprintService;

  beforeEach(() => {
    service = new SprintService();
  });

  it('#getAllSprints should, by default, return an empty array', () => {
    expect(service.getAllSprints()).toEqual([]);
  });

  it('#setSprints should set the `sprints` attribute', () => {
    service.setSprints(testSprints);
    expect(service.getAllSprints()).toEqual(testSprints);
  });

  describe('#getSprint', () => {
    beforeEach(() => {
      service.setSprints(testSprints);
    });

    it('should return the sprint matching the provided ID', () => {
      expect(service.getSprint(1)).toEqual(testSprints[0]);
    });

    it('should return `null` if it does NOT find a sprint matching the provided ID', () => {
      expect(service.getSprint(2)).toBeNull();
      expect(service.getSprint(null)).toBeNull();
    });
  });
});

export class SprintService {
	private sprints: Array<Sprint> = [];

	getAllSprints() {
		return this.sprints;
	}

	setSprints(newSprints: Array<Sprint>) {
		this.sprints = newSprints;
	}

	getSprint(sprintId: number): Sprint {
		let sprint = this.sprints.find((sprint) => sprint.id === sprintId);

		if(!sprint) {
			sprint = null;
		}

		return sprint;
	}
}