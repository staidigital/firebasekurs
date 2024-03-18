let todoList = fetch('/todos').then(response => response.json()).then(data => {
    printTodo(data[0])
    return data;
});

function printTodo(todoList){
    todoDiv = document.getElementById("todo-container");
    for (let key in todoList) {
        item = document.createElement("p");
        item.innerHTML = todoList[key];
        todoDiv.appendChild(item);
        console.log(key, todoList[key]);
    }
}



fetch("/newTodo", {
    method: "POST",
    body: JSON.stringify({
        newTask: "foo"
    }),
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
});



/* todoList.map(item => {
    itemDiv = docuemnt.createElement("p")
    itemDiv.innerHtml = item.
    todoDiv.appendChild()
}) */