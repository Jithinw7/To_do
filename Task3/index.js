document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    taskForm.addEventListener('submit', addTask);
    taskList.addEventListener('click', manageTask);

    loadTasks();

    function addTask(e) {
        e.preventDefault();
        const taskText = taskInput.value.trim();
        if (!taskText) return;
        const taskItem = createTaskElement(taskText);
        taskList.appendChild(taskItem);
        saveTask(taskText);
        taskInput.value = '';
    }

    function createTaskElement(taskText) {
        const li = document.createElement('li');
        li.textContent = taskText;

        const completeBtn = document.createElement('button');
        completeBtn.textContent = 'Complete';
        completeBtn.classList.add('complete-btn');
        li.appendChild(completeBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        li.appendChild(deleteBtn);

        return li;
    }

    function manageTask(e) {
        if (e.target.classList.contains('complete-btn')) {
            const li = e.target.parentElement;
            li.classList.toggle('completed');
            updateTaskStatus(li.textContent);
        } else if (e.target.classList.contains('delete-btn')) {
            const li = e.target.parentElement;
            li.remove();
            removeTask(li.textContent);
        }
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            const taskItem = createTaskElement(task.text);
            if (task.completed) {
                taskItem.classList.add('completed');
            }
            taskList.appendChild(taskItem);
        });
    }

    function saveTask(taskText) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push({ text: taskText, completed: false });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function updateTaskStatus(taskText) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const updatedTasks = tasks.map(task => {
            if (task.text === taskText) {
                task.completed = !task.completed;
            }
            return task;
        });
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

    function removeTask(taskText) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const updatedTasks = tasks.filter(task => task.text !== taskText);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }
});
