let tasks = [];

const addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", addTask);

function addTask() {

    const taskInput =
        document.getElementById("taskInput");

    const hourInput =
        document.getElementById("hourInput");

    if (taskInput.value === "") {
        alert("공부 목표를 입력하세요!");
        return;
    }

    const task = {
        name: taskInput.value,
        hour: Number(hourInput.value) || 0,
        completed: false
    };

    tasks.push(task);

    saveTasks();
    renderTasks();

    taskInput.value = "";
    hourInput.value = "";
}

function renderTasks() {

    const list =
        document.getElementById("taskList");

    list.innerHTML = "";

    tasks.forEach((task, index) => {

        const li =
            document.createElement("li");

        li.className =
            task.completed ? "completed" : "";

        li.innerHTML = `
        <div>
            <input type="checkbox"
            ${task.completed ? "checked" : ""}
            onchange="toggleTask(${index})">

            ${task.name}
            (${task.hour}시간)
        </div>

        <button onclick="deleteTask(${index})">
        삭제
        </button>
        `;

        list.appendChild(li);
    });

    updateStats();
}

function toggleTask(index) {

    tasks[index].completed =
        !tasks[index].completed;

    saveTasks();
    renderTasks();
}

function deleteTask(index) {

    tasks.splice(index, 1);

    saveTasks();
    renderTasks();
}

function updateStats() {

    const total = tasks.length;

    const completed =
        tasks.filter(task =>
            task.completed).length;

    const percent =
        total === 0 ? 0 :
        Math.round(completed / total * 100);

    const totalHours =
        tasks.reduce((sum, task) =>
            sum + Number(task.hour || 0), 0);

    document.getElementById(
        "totalCount").innerText = total;

    document.getElementById(
        "completedCount").innerText = completed;

    document.getElementById(
        "progressPercent").innerText = percent;

    document.getElementById(
        "totalHours").innerText = totalHours;

    document.getElementById(
        "progressFill").style.width =
        percent + "%";

    /* 축하 메시지 */

    const successMessage =
        document.getElementById(
            "successMessage");

    if (total > 0 &&
        completed === total) {

        successMessage.style.display =
            "block";

    } else {

        successMessage.style.display =
            "none";
    }
}

function saveTasks() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}

function loadTasks() {

    const saved =
        localStorage.getItem("tasks");

    if (saved) {

        tasks =
            JSON.parse(saved);

        renderTasks();
    }
}

loadTasks();

/* 오늘 날짜 */

const today = new Date();

document.getElementById("todayDate").innerText =
    today.toLocaleDateString("ko-KR");

/* 다크모드 */

const darkModeBtn =
    document.getElementById("darkModeBtn");

darkModeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {

        localStorage.setItem(
            "darkMode",
            "enabled"
        );

        darkModeBtn.innerText =
            "☀️ 라이트모드";

    } else {

        localStorage.setItem(
            "darkMode",
            "disabled"
        );

        darkModeBtn.innerText =
            "🌙 다크모드";
    }
});

if (localStorage.getItem("darkMode") === "enabled") {

    document.body.classList.add("dark-mode");

    darkModeBtn.innerText =
        "☀️ 라이트모드";
}

/* 엔터키 추가 */

document.getElementById("taskInput")
    .addEventListener("keypress", function (e) {

        if (e.key === "Enter") {
            addTask();
        }
    });
