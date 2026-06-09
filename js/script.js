let tasks = [];

const addBtn =
document.getElementById("addBtn");

addBtn.addEventListener(
"click",
addTask
);

function addTask(){

    const taskInput =
    document.getElementById(
    "taskInput"
    );

    const hourInput =
    document.getElementById(
    "hourInput"
    );

    if(taskInput.value===""){
        return;
    }

    const task = {

        name: taskInput.value,

        hour: hourInput.value,

        completed:false

    };

    tasks.push(task);

    saveTasks();

    renderTasks();

    taskInput.value="";
    hourInput.value="";
}

function renderTasks(){

    const list =
    document.getElementById(
    "taskList"
    );

    list.innerHTML="";

    tasks.forEach((task,index)=>{

        const li =
        document.createElement(
        "li"
        );

        li.innerHTML = `

        <div>

        <input
        type="checkbox"

        ${task.completed ?
        "checked" : ""}

        onchange="toggleTask(${index})">

        <span class="${
        task.completed ?
        'completed' : ''
        }">

        ${task.name}
        (${task.hour}시간)

        </span>

        </div>

        <button
        onclick="deleteTask(${index})">

        삭제

        </button>

        `;

        list.appendChild(li);

    });

    updateStats();
}

function toggleTask(index){

    tasks[index].completed =
    !tasks[index].completed;

    saveTasks();

    renderTasks();
}

function deleteTask(index){

    tasks.splice(index,1);

    saveTasks();

    renderTasks();
}

function updateStats(){

    const total =
    tasks.length;

    const completed =
    tasks.filter(task =>
    task.completed).length;

    const percent =
    total===0 ? 0 :
    Math.round(
    completed/total*100
    );

    const totalHours =
    tasks.reduce(

        (sum, task) =>

        sum +
        Number(task.hour),

        0

    );

    document.getElementById(
    "totalCount"
    ).innerText = total;

    document.getElementById(
    "completedCount"
    ).innerText = completed;

    document.getElementById(
    "progressPercent"
    ).innerText = percent;

    document.getElementById(
    "totalHours"
    ).innerText = totalHours;

    document.getElementById(
    "progressFill"
    ).style.width =
    percent + "%";

    const successMessage =
    document.getElementById(
    "successMessage"
    );

    if(
    total > 0 &&
    percent === 100
    ){

        successMessage.style.display =
        "block";

    }
    else{

        successMessage.style.display =
        "none";

    }

}

function saveTasks(){

    localStorage.setItem(

    "tasks",

    JSON.stringify(tasks)

    );

}

function loadTasks(){

    const saved =
    localStorage.getItem(
    "tasks"
    );

    if(saved){

        tasks =
        JSON.parse(saved);

        renderTasks();

    }

}

const today =
new Date();

document.getElementById(
"todayDate"
).innerText =
today.toLocaleDateString(
"ko-KR"
);

const darkBtn =
document.getElementById(
"darkModeBtn"
);

darkBtn.addEventListener(

"click",

() => {

document.body.classList.toggle(
"dark-mode"
);

}

);

loadTasks();
