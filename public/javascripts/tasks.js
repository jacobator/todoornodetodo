const $tasksList = document.getElementById('tasks');
const $addTask = document.getElementById('add-task');
const socket = io.connect('http://localhost:2000');

socket.on('tasks', tasks => renderTasks(tasks));
socket.on('task-added', task => renderTask(task));
socket.on('task-updated', task => updateTask(task));
socket.on('task-removed', id => removeTask(id));
socket.on('alert', text => alert(text));

$addTask.addEventListener('click', () => {
	socket.emit('add-task', { name: '' });
});

$tasksList.addEventListener('click', e => {
	const target = e.target;

	if (target.className === 'save') {
		const name = target.parentNode.getElementsByClassName('name')[0].value;

		socket.emit('update-task', { _id: target.parentNode.id, name });
	} else if (target.className === 'delete') {
		socket.emit('remove-task', target.parentNode.id);
	}
});

const renderTasks = tasks => {
	$tasksList.innerHTML = '';

	for (let task of tasks) {
		renderTask(task);
	}
};

const renderTask = task => {
	const $task = document.createElement('div');
	$task.className = 'task';
	$task.id = task._id;

	const $taskName = document.createElement('input');
	$taskName.value = task.name;
	$taskName.className = 'name';
	$task.appendChild($taskName);

	const $saveTask = document.createElement('button');
	$saveTask.innerText = 'Save';
	$saveTask.className = 'save'
	$task.appendChild($saveTask);

	const $deleteTask = document.createElement('button');
	$deleteTask.innerText = 'Delete';
	$deleteTask.className = 'delete'
	$task.appendChild($deleteTask);

	$tasksList.appendChild($task);
};

const updateTask = task => {
	const $task = document.getElementById(task._id);

	$task.getElementsByClassName('name')[0].value = task.name;
};

const removeTask = id => {
	const $task = document.getElementById(id);

	$task.remove();
};
