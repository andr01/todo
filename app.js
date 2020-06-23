

function onPageLoaded() {
    const input = document.querySelector("input[type='text']");  // input используется для создания интерактивных элементов управления в веб-формах для получения данных от пользователя, querySelector ищет первый элемент, соответствующий данному CSS ()
    const ul = document.querySelector("ul.todos");     // ui неупорядоченный список
    const saveButton = document.querySelector("button.save");
    const clearButton = document.querySelector("button.clear");
    const showTipsButton = document.querySelector("button.showTips");
    const closeTipsButton = document.querySelector("a.closeTips");
    const overlay = document.querySelector("#overlay");



    function createTodo() {                      // создаем новую запись
        const li = document.createElement("li");      // создаем список
        const textSpan = document.createElement("span");  // создаем контейнер span
        textSpan.classList.add("todo-text");            // добавляем классы
        const newTodo = input.value;
        textSpan.append(newTodo);

        const deleteBtn = document.createElement("span");  // создаем кнопку корзины
        deleteBtn.classList.add("todo-trash");
        const icon = document.createElement("i");
        icon.classList.add("fas", "fa-trash-alt");
        deleteBtn.appendChild(icon);

        ul.appendChild(li).append(textSpan, deleteBtn);
        input.value = "";
        listenDeleteTodo(deleteBtn);
    }

    function onClickTodo(event) {                           // обработчик на зачеркивание записи
        if (event.target.tagName === "LI") {
            event.target.classList.toggle("checked");
        }
    }

    function listenDeleteTodo(element) {                    // обработчик на кнопку корзины вновой записи
        element.addEventListener("click", (event) => {
            element.parentElement.remove();
            event.stopPropagation();
        });
    }

    function loadTodos() {                                  // загрузка сохраненных записей
        const data = localStorage.getItem("todos");
        if (data) {
            ul.innerHTML = data;
        }
        const deleteButtons = document.querySelectorAll("span.todo-trash");
        for (const button of deleteButtons) {
            listenDeleteTodo(button);
        }
    }



    input.addEventListener("keypress", (keyPressed) => { // обработчик событий на кнопку "13" (Enter)
        const keyEnter = 13;
        if (keyPressed.which == keyEnter) {
            createTodo();
        }
    });

    ul.addEventListener("click", onClickTodo);


    saveButton.addEventListener("click", () => {
        localStorage.setItem("todos", ul.innerHTML);
    });
    clearButton.addEventListener("click", () => {
        ul.innerHTML = "";
        localStorage.removeItem('todos', ul.innerHTML);
    });
    showTipsButton.addEventListener("click", () => {
        overlay.style.height = "100%";
    });
    closeTipsButton.addEventListener("click", () => {
        overlay.style.height = "0";
    });

    loadTodos();

}

document.addEventListener("DOMContentLoaded", onPageLoaded);
