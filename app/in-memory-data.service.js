"use strict";
var InMemoryDataService = (function () {
    function InMemoryDataService() {
    }
    InMemoryDataService.prototype.createDb = function () {
        var projects = [
            {
                id: 1,
                title: 'Pirates of Geuce Isles',
                summary: 'Quest for dubloons and stay in conquer of Guece Isles.',
                sprints: [1],
                members: [1, 2, 3]
            }
        ];
        var sprints = [
            {
                id: 1,
                title: 'Sprint 1',
                project: 1,
                tasks: [1, 2, 3],
                members: [1, 2]
            }
        ];
        var tasks = [
            {
                id: 1,
                title: 'Collect chest at Kraken Inn.',
                sprint: 1,
                effort: 4,
                state: 'Done',
                assignee: 1,
                relatedTicket: '#1'
            },
            {
                id: 2,
                title: 'Follow King to Snake Lair.',
                sprint: 1,
                effort: 1,
                state: 'New',
                assignee: 2,
                relatedTicket: '#2'
            },
            {
                id: 3,
                title: 'Fight witch doctor Jojo.',
                sprint: 1,
                effort: 8,
                state: 'New',
                assignee: 1,
                relatedTicket: '#4'
            }
        ];
        var state = [
            {
                key: 'New',
                value: 'New'
            },
            {
                key: 'In Progress',
                value: 'In Progress'
            },
            {
                key: 'Done',
                value: 'Done'
            }
        ];
        var members = [
            {
                id: 1,
                name: 'Captain Jonathan',
                position: 'Captain, Pirate',
                capacity: 10
            },
            {
                id: 2,
                name: 'Polly',
                position: 'Quarter Master, Parrot',
                capacity: 2
            },
            {
                id: 3,
                name: 'Sam',
                position: 'Extraordinary ship crew',
                capacity: 10
            }
        ];
        return { projects: projects, sprints: sprints, tasks: tasks, state: state, members: members };
    };
    return InMemoryDataService;
}());
exports.InMemoryDataService = InMemoryDataService;
//# sourceMappingURL=in-memory-data.service.js.map