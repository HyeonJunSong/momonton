let todoList = [];
function saveTodo() {
  window.localStorage.setItem("todoList", JSON.stringify(todoList));
}
function loadTodo() {
  todoList = JSON.parse(window.localStorage.getItem("todoList"));

  if (todoList === null) todoList = [];
  todoList.forEach((todo) => {
    addTodoContainer(todo);
  });
}
loadTodo();

function addTodoContainer(todo) {
  const todoContainer = document.querySelector("#todoContainer");

  const contentBox = document.createElement("div");
  contentBox.className = "contentBox";
  contentBox.innerHTML = `
    <div class="contentBox">
      <div class="divider_hide"></div>
      <div class="todoBox">
        <img class="check" src="assets/icons/${
          todo.check ? "check_true" : "check_false"
        }.svg" />
        <div class="todo" key=${todo.id}>${todo.text}</div>
        <img class="cancel" src="assets/icons/cancel.svg" />
      </div>
      <div class="divider"></div>
    </div>
  `;

  todoContainer.insertBefore(
    contentBox,
    todoContainer.childNodes[todoContainer.childNodes.length - 2]
  );

  //add Action
  contentBox.querySelector(".check").addEventListener("click", () => {
    if (contentBox.querySelector(".check").src.includes("check_true")) {
      contentBox.querySelector(".check").src = "assets/icons/check_false.svg";
      todoList = todoList.map((item) => {
        if (item.id === todo.id) {
          item.check = false;
        }
        return item;
      });
      saveTodo();
    } else {
      contentBox.querySelector(".check").src = "assets/icons/check_true.svg";
      todoList = todoList.map((item) => {
        if (item.id === todo.id) {
          item.check = true;
        }
        return item;
      });
      saveTodo();
    }
  });

  contentBox.querySelector(".cancel").addEventListener("click", () => {
    if (confirm(`Are you going to remove your "${todo.text}"?`)) {
      todoList = todoList.filter((item) => item.id !== todo.id);
      saveTodo();
      contentBox.remove();
    }
  });
}

function setTodoInput() {
  const todoInput = document.querySelector("#todoContainer form");
  todoInput.addEventListener("submit", (event) => {
    event.preventDefault();

    const newId = Date.now();
    const todo = todoInput.querySelector("input").value;
    addTodoContainer({ id: newId, text: todo, check: false });
    todoInput.querySelector("input").value = "";

    todoList.push({ id: newId, text: todo, check: false });
    saveTodo();
  });
}
setTodoInput();
