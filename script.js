$(document).ready(function () {
    $(".datepicker").datepicker();

    $("#add").click(function () {
        const taskText = $("#task").val();
        const dueDate = $("#date").val();

        if (taskText.trim() !== "") {
            const taskItem = $("<li>");
            taskItem.html(`<span>${taskText}</span> <span class="due-date">${dueDate}</span> <button class="delete">Delete</button> <button class="complete">Complete</button>`);

            $("#task-list").append(taskItem);

            $("#task").val("");
            $("#date").val("");
        }
    });

    $("#task-list").on("click", ".delete", function () {
        $(this).parent().remove();
    });

    $("#task-list").on("click", ".complete", function () {
        $(this).parent().toggleClass("completed");
    });

    // Save tasks to local storage
    function saveTasksToLocalStorage() {
        const tasks = [];
        $("#task-list li").each(function () {
            tasks.push({
                text: $(this).find("span").eq(0).text(),
                dueDate: $(this).find(".due-date").text(),
                completed: $(this).hasClass("completed"),
            });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Load tasks from local storage
    function loadTasksFromLocalStorage() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(function (task) {
            const taskItem = $("<li>");
            if (task.completed) {
                taskItem.addClass("completed");
            }
            taskItem.html(`<span>${task.text}</span> <span class="due-date">${task.dueDate}</span> <button class="delete">Delete</button> <button class="complete">Complete</button>`);
            $("#task-list").append(taskItem);
        });
    }

    loadTasksFromLocalStorage();

    // Save tasks when the page unloads
    $(window).on("beforeunload", function () {
        saveTasksToLocalStorage();
    });
});
