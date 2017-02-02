const tasksService = require('../entities/tasks/tasksService');

const initializeSockets = app => {
	const server = require('http').Server(app);
	const io = require('socket.io')(server);

	server.listen(2000);

	io.on('connection', socket => {
		tasksService.getAllTasks().then(tasks => {
			socket.emit('tasks', tasks);
		});

		socket.on('add-task', task => {
			tasksService.addTask(task).then(task => {
				io.emit('task-added', task);
			});
		});

		socket.on('update-task', task => {
			tasksService.editTask(task._id, task).then(() => {
				io.emit('task-updated', task);
			})
			.catch(err => {
				if (err.message == 'зрада') {
					socket.emit('alert', 'ЦЕ ЗРАДА. НЕСІТЬ ВИЛА!');
				}
			});
		});

		socket.on('remove-task', id => {
			tasksService.deleteTask(id).then(() => {
				io.emit('task-removed', id);
			});
		});
	});
};

module.exports = initializeSockets;