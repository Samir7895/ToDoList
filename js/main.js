
const addTaskBtn    = document.getElementById('add-task-btn');
const deskTaskInput = document.getElementById('description-task');
const todosWrapper  = document.querySelector('.todos-wrapper');
let tasks;
!localStorage.tasks ? tasks = [] : tasks = JSON.parse(localStorage.getItem('tasks'))


let todoItemElems = [];

function Task(description) {
    this.description = description;
    this.completed   = false;
}

const createTempate = (task, index) => {
    return `
        <div class="todo-item ${task.completed ? 'checked' : ''}">
            <div class="description">${task.description}</div>
            <div class="buttons">
                <input onclick="completeTask(${index})" autocomplete="off" class="input btn-complete" type="checkbox" ${task.completed ? 'checked' : ''}>
                 <button onclick="deleteTask(${index})" class="btn-delete">Delete</button>
            </div>
        </div>
    `
}

const fillHtmlList = () => {
    todosWrapper.innerHTML = "";
    if(tasks.length > 0){
        tasks.forEach((item , index) => {
            todosWrapper.innerHTML += createTempate(item ,index)
        });
        todoItemElems = document.querySelectorAll('.todo-item')
    }
}

fillHtmlList();

const updateLocal = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

const completeTask = index => {
 tasks[index].completed = !tasks[index].completed;
 if (tasks[index].completed) {
     todoItemElems[index].classList.add('checked');
 }else{
    todoItemElems[index].classList.remove('checked');
 }
 updateLocal();
 fillHtmlList();
}


addTaskBtn.addEventListener('click', () => {
    tasks.push(new Task(deskTaskInput.value));
    updateLocal();
    fillHtmlList();
    deskTaskInput.value = '';
})

const deleteTask = index =>{
    todoItemElems[index].classList.add('delition')
   setTimeout(() => {
    tasks.splice(index, 1);
    updateLocal();
    fillHtmlList();
   }, 500);
}
