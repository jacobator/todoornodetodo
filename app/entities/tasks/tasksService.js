const taskRepository = require('./taskRepository');

class TasksService {
	getAllTasks() {
		return taskRepository.findAll();
	}

	getTaskById(id) {
		return taskRepository.findById(id);
	}

	editTask(id, task) {
		if (task.name.toLowerCase().indexOf('зрада') !== -1) {
			return Promise.reject(new Error('зрада'));
		}

		return taskRepository.update({_id: id}, task);
	}

	deleteTask(id) {
		return taskRepository.delete({_id: id});
	}

	addTask(task) {
		return taskRepository.add(task);
	}
}

module.exports = new TasksService();