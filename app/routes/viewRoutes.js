const tasks = require('../entities/tasks/tasksViewRoutes');

const initializeRoutes = app => {
	app.use('/', tasks);
}

module.exports = initializeRoutes;