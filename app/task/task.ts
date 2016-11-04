export class Task {
  id: number;
  title: string;
  sprint: number;
  effort: number;
  state: string;
  assignee: number;
  relatedTicket: string;
}

export class State {
	key: string;
	value: string;
}