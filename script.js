document.addEventListener('DOMContentLoaded', () => {
    let tasks = [];
  
    const taskList = document.getElementById('task-list');
    const newTaskInput = document.getElementById('new-task');
    const addTaskBtn = document.getElementById('add-task-btn');
    const filterAllBtn = document.getElementById('filter-all');
    const filterCompletedBtn = document.getElementById('filter-completed');
    const filterPendingBtn = document.getElementById('filter-pending');
  
    addTaskBtn.addEventListener('click', () => {
      const taskText = newTaskInput.value.trim();
      if (taskText) {
        const task = { text: taskText, completed: false };
        tasks.push(task);
        newTaskInput.value = '';
        renderTasks();
      }
    });
  
    
    function toggleTaskStatus(index) {
      tasks[index].completed = !tasks[index].completed;
      renderTasks();
    }
  
   
    function deleteTask(index) {
      tasks.splice(index, 1);
      renderTasks();
    }
  
  
    function editTask(index) {
      const newText = prompt('Edit task:', tasks[index].text);
      if (newText !== null && newText.trim() !== '') {
        tasks[index].text = newText.trim();
        renderTasks();
      }
    }
  
    
    filterAllBtn.addEventListener('click', () => renderTasks());
    filterCompletedBtn.addEventListener('click', () => renderTasks('completed'));
    filterPendingBtn.addEventListener('click', () => renderTasks('pending'));
  
    
    function renderTasks(filter = 'all') {
      taskList.innerHTML = '';
      tasks.forEach((task, index) => {
        if (filter === 'completed' && !task.completed) return;
        if (filter === 'pending' && task.completed) return;
  
        const taskItem = document.createElement('li');
        taskItem.classList.toggle('completed', task.completed);
  
        taskItem.innerHTML = `
          <span>${task.text}</span>
          <div>
            <button onclick="toggleTaskStatus(${index})">${task.completed ? 'Undo' : 'Complete'}</button>
            <button onclick="editTask(${index})">Edit</button>
            <button onclick="deleteTask(${index})">Delete</button>
          </div>
        `;
  
        taskList.appendChild(taskItem);
      });
    }
  
    
    window.toggleTaskStatus = toggleTaskStatus;
    window.editTask = editTask;
    window.deleteTask = deleteTask;
  });
  