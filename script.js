const form = document.getElementById("todoform")
const todosListEl = document.getElementById("todos-list")
const notificationEl = document.querySelector('.notification');

const todoInput = document.getElementById("newtodo")
let EditTodoId = -1;

let todos = JSON.parse(localStorage.getItem('todos')) || []
rendertodo();
form.addEventListener('submit', function (event) {
    event.preventDefault();
    saveTodo();
    rendertodo();
    localStorage.setItem('todos', JSON.stringify(todos))

})
function saveTodo() {
    const todovalue = todoInput.value
    const isempty = todovalue === '';
    if (isempty) {
        alert("to do is empty")
    } else {
        if (EditTodoId >= 0) {
            todos = todos.map((todo, index) => ({
                ...todo,
                value: index === EditTodoId ? todovalue : todo.value,
            })
            );
            EditTodoId = -1;
        }

        else {
            todos.push({
                value: todovalue,
                checked: false,
                color: '#' + Math.floor(Math.random() * 16777215).toString(16),
            })
        }

    }

    todoInput.value = " "

};
function rendertodo() {
    todosListEl.innerHTML = '';
    todos.forEach((todo, index) => {
        todosListEl.innerHTML += `
<div class="todo" id=${index}>
<i 
 class= " bi ${todo.checked ? 'bi-check-circle-fill' : 'bi-circle'}"
style="color : ${todo.color}"
data-action="check"
></i>

<p class="">${todo.value}</p>
<i class="bi bi-pencil-square" data-action="edit"></i>
<i class="bi bi-trash"  data-action="delete"></i>
</div>
`
    })
}
todosListEl.addEventListener('click', (event) => {
    const target = event.target;
    const parentElement = target.parentNode;
    if (parentElement.className !== 'todo') return
    const todo = parentElement;
    const todoId = Number(todo.id)
    const action = target.dataset.action
    console.log(todoId, action)
    action === "check" && checkTodo(todoId)
    action === "edit" && editTodo(todoId)
    action === "delete" && deleteTodo(todoId)

})

function checkTodo(todoId) {
    todos = todos.map((todo, index) =>
    ({

        ...todo,
        checked: index === todoId ? !todo.checked : todo.checked

    })
    )
    rendertodo();
    localStorage.setItem('todos', JSON.stringify(todos))

}
function editTodo(todoId) {
    todoInput.value = todos[todoId].value //دا الجزء اللي بيحصل فيه الكتابه
    EditTodoId = todoId
}
function deleteTodo(todoId) {
    todos = todos.filter((todo, index) => index !== todoId)
    rendertodo();
    localStorage.setItem('todos', JSON.stringify(todos))

}
