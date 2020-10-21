// Selectors

const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');
const clearButton = document.querySelector('.clear');

// Event Listeners

document.addEventListener('DOMContentLoaded', getTodos)
document.addEventListener('DOMContentLoaded', getDones) // load dones array fron local storage
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);
clearButton.addEventListener('click', clearAllTasks);

// Functions

function addTodo(event) {
  // Prevent from from submitting
  event.preventDefault()
  if(todoInput.value!==''){
    // todo Div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    // Create li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    // add todo to local storage
    saveLocalTodos(todoInput.value);
    // Check-mark Button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-button");
    todoDiv.appendChild(completedButton);
    // Trash Button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-button");
    todoDiv.appendChild(trashButton);
    // Append to List
    todoList.appendChild(todoDiv)
    // clear todo-input value
    todoInput.value="";
  }
  else{
    alert('Cannot submit empty field')
  }
}

function deleteCheck(event) {
  const item = event.target;
  // Delete todo
  if (item.classList[0]==="trash-button") {
    const todo = item.parentElement;
    // animation
    todo.classList.add("fall");
    if(todo.classList.contains("completed")){
      removeLocalDones(todo)
    }
    else{
      removeLocalTodos(todo)
    }
    todo.addEventListener('transitionend', function () {
      todo.remove();
    })
  }
  
  // check mark
  if (item.classList[0]==="complete-button") {
    const todo = item.parentElement;
    if(todo.classList.contains("completed")){
      removeLocalDones(todo)
      saveLocalTodos(todo.childNodes[0].innerText)
    }
    else{
      removeLocalTodos(todo)
      saveLocalDones(todo.childNodes[0].innerText) //save the todo to dones array in local storage           
    }
    todo.classList.toggle("completed")
  }
}

function filterTodo(event) {
  const todos = todoList.childNodes;
  todos.forEach(function(todo) {
    switch(event.target.value){
      case 'all':
        todo.style.display = "flex";
      break;
      case 'completed':
        if(todo.classList.contains('completed')){
          todo.style.display = "flex";
        }
        else{
          todo.style.display = "none";
        }
      break;
      case 'uncompleted':
        if (!todo.classList.contains('completed')) {
          todo.style.display = "flex";
        }
        else{
          todo.style.display = "none";
        }
      break;
    }
  });    
}

function retrieveLocalTodos() {
  // check if empty
  let todos;
  if(localStorage.getItem('todos')===null){
    todos =[];
  }
  else{
    todos =JSON.parse(localStorage.getItem('todos'));
  }
  return todos 
}

// retrieve dones array from local storage to a array form
function retrieveLocalDones() {
  // check if empty
  let dones;
  if(localStorage.getItem('dones')===null){
    dones =[];
  }
  else{
    dones =JSON.parse(localStorage.getItem('dones'));
  }
  return dones 
} 

function saveLocalTodos(todo){
  // get local storage
  const localStore = retrieveLocalTodos()
  localStore.push(todo);
  localStorage.setItem("todos", JSON.stringify(localStore));
}

// saves a new item in dones array in local storage
function saveLocalDones(done){
  // get local storage
  const localStore = retrieveLocalDones()
  localStore.push(done);
  localStorage.setItem("dones", JSON.stringify(localStore));
}

function getTodos(){
  // get local storage
  const localStore = retrieveLocalTodos()
  localStore.forEach(function(todo){
  // todo Div
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');
  // Create li
  const newTodo = document.createElement('li');
  newTodo.innerText = todo;
  newTodo.classList.add('todo-item');
  todoDiv.appendChild(newTodo);
  // Check-mark Button
  const completedButton = document.createElement('button');
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete-button");
  todoDiv.appendChild(completedButton);
  // Trash Button
  const trashButton = document.createElement('button');
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-button");
  todoDiv.appendChild(trashButton);
  // Append to List
  todoList.appendChild(todoDiv)
  })
}

// transformes the dones local storage to actual elements
function getDones(){
  // get local storage
  const localStore = retrieveLocalDones()
  localStore.forEach(function(done){
  // todo Div
  const todoCompletedDiv = document.createElement('div');
  todoCompletedDiv.classList.add('todo','completed');
  // Create li
  const newCompletedTodo = document.createElement('li');
  newCompletedTodo.innerText = done;
  newCompletedTodo.classList.add('todo-item');
  todoCompletedDiv.appendChild(newCompletedTodo);
  // Check-mark Button
  const completedButton = document.createElement('button');
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete-button");
  todoCompletedDiv.appendChild(completedButton);
  // Trash Button
  const trashButton = document.createElement('button');
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-button");
  todoCompletedDiv.appendChild(trashButton);
  // Append to List
  todoList.appendChild(todoCompletedDiv)
  })
}

function removeLocalTodos(todo) {
  // get local storage
  const localStore = retrieveLocalTodos()
  const todoIndex = todo.childNodes[0].innerText;
  localStore.splice(localStore.indexOf(todoIndex),1);
  localStorage.setItem('todos', JSON.stringify(localStore));
}

function removeLocalDones(todo) {
  // get local storage
  const localStore = retrieveLocalDones()
  const todoIndex = todo.childNodes[0].innerText;
  localStore.splice(localStore.indexOf(todoIndex),1);
  localStorage.setItem('dones', JSON.stringify(localStore));
}

function clearAllTasks(){
  localStorage.clear()
  location.reload()
}
