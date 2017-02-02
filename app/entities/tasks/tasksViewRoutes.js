const express = require('express');
const tasks = express.Router();

const tasksService = require('./tasksService');

tasks.get('/', (req, res, next) => {
	res.render('tasks');
});

module.exports = tasks;
