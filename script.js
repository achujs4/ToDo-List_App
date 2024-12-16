document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
      loginForm.addEventListener("submit", (e) => {
          e.preventDefault();
          const username = document.getElementById("username").value;
          const password = document.getElementById("password").value;

          login(username, password, (isValid) => {
              if (isValid) {
                  window.location.href = "main.html";
              } else {
                  alert("Invalid username or password!");
              }
          });
      });
  }
  const todoListContainer = document.getElementById("todoList");
  if (todoListContainer) {
      fetch("https://jsonplaceholder.typicode.com/todos")
          .then((response) => response.json())
          .then((todos) => {
              let completedCount = 0;
              const checkCompletion = () => {
                  return new Promise((resolve) => {
                      if (completedCount === 5) {
                          resolve("Congrats. 5 Tasks have been Successfully Completed!");
                      }
                  });
              };

              todos.slice(0, 30).forEach((todo) => {
                  const todoItem = document.createElement("div");
                  todoItem.classList.add("col-md-4", "todo-item");
                  todoItem.innerHTML = `
                      <div class="p-3 border rounded">
                          <input type="checkbox" id="todo-${todo.id}" ${todo.completed ? "checked disabled" : ""}>
                          <label for="todo-${todo.id}" class="${todo.completed ? "completed" : ""}">${todo.title}</label>
                      </div>
                  `;
                  todoListContainer.appendChild(todoItem);

                  const checkbox = todoItem.querySelector("input[type='checkbox']");
                  if (!todo.completed) {
                      checkbox.addEventListener("change", () => {
                          if (checkbox.checked) {
                              completedCount++;
                          } else {
                              completedCount--;
                          }
                          checkCompletion().then((message) => {
                              alert(message);
                          });
                      });
                  }
              });
          })
          .catch((error) => console.error("Error fetching todos:", error));
  }


  const logoutMenu = document.getElementById("logoutMenu");
  if (logoutMenu) {
      logoutMenu.addEventListener("click", () => {
          window.location.href = "index.html";
      });
  }
});

function login(username, password, callback) {
  if (username === "admin" && password === "12345") {
      callback(true);
  } else {
      callback(false);
  }
}
