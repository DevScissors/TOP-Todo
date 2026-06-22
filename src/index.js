import "./styles/style.css";
import taskOptionsSVGs from "./taskOptionsSVGs";

let taskList = [];

const taskTableBody = document.querySelector("tbody");
const submitTaskBtn = document.querySelector(".submit-task-btn");

// form related DOM elements
const modal = document.querySelector("#addNewTask");
const addTaskBtn = document.querySelector(".new-task-btn");
const taskNameInput = document.querySelector(".task-name-input");
const taskCategoryInput = document.querySelector(".task-category-input");
const taskPrioritySelection = document.querySelector(".task-priority-select");
const taskDueDateInput = document.querySelector(".task-due-by-date-input");

class ToDo {
  constructor(name, category, priority, dueDate, status, createdDate, id) {
    this.name = name;
    this.category = category;
    this.priority = priority;
    this.dueDate = new Date();
    this.status = status;
    this.createdDate = createdDate;
    this.id = crypto.randomUUID();
  }
}

function addTaskToList() {
  const taskNameValue = taskNameInput.value;
  const taskCategoryValue = taskCategoryInput.value;
  const taskPriorityValue = taskPrioritySelection.value;
  const taskDueDateValue = taskDueDateInput.value;
  const taskDefaultStatusValue = "Not Completed";
  const taskCreatedDate = new Date();

  const toDoTask = new ToDo(
    taskNameValue,
    taskCategoryValue,
    taskPriorityValue,
    taskDueDateValue,
    taskDefaultStatusValue,
    taskCreatedDate,
  );
  taskList.push(toDoTask);
}

function displayTaskList() {
  taskTableBody.innerHTML = "";
  taskList.forEach((task) => {
    const taskRow = document.createElement("tr");
    taskRow.setAttribute("data-index", task.id);

    const taskColCompletionCheckbox = document.createElement("td");
    taskColCompletionCheckbox.classList.add("completion-toggle", "table-item");

    const taskCheckboxInput = document.createElement("input");
    taskCheckboxInput.type = "checkbox";

    const taskNameCol = document.createElement("td");
    taskNameCol.classList.add("task-name", "table-item");
    taskNameCol.textContent = task.name;

    const taskCategoryCol = document.createElement("td");
    taskCategoryCol.classList.add("task-category", "table-item");
    taskCategoryCol.textContent = task.category;

    const taskPriorityCol = document.createElement("td");
    taskPriorityCol.classList.add("task-priority-select", "table-item");
    taskPriorityCol.textContent = task.priority.value;

    const taskDueDateCol = document.createElement("td");
    taskDueDateCol.classList.add("task-due-date", "table-item");
    taskDueDateCol.textContent = new Intl.DateTimeFormat("en-us").format(
      task.dueDate,
    );

    const taskStatusCol = document.createElement("td");
    taskStatusCol.classList.add("task-status", "table-item");
    taskStatusCol.textContent = task.status;

    const taskCreatedDateCol = document.createElement("td");
    taskCreatedDateCol.classList.add("task-created-date", "table-item");
    taskCreatedDateCol.textContent = new Intl.DateTimeFormat("en-us").format(
      task.createdDate,
    );

    taskColCompletionCheckbox.appendChild(taskCheckboxInput);

    taskRow.append(
      taskColCompletionCheckbox,
      taskNameCol,
      taskCategoryCol,
      taskPriorityCol,
      taskDueDateCol,
      taskStatusCol,
      taskCreatedDateCol,
      taskOptionsSVGs(),
    );

    taskTableBody.appendChild(taskRow);
  });
}

const navItems = document.querySelectorAll(".menu");

navItems.forEach((menuItem) => {
  menuItem.addEventListener("click", (e) => {
    navItems.forEach((nav) => nav.classList.remove("active"));
    e.currentTarget.classList.toggle("active");
  });
});

addTaskBtn.addEventListener("click", () => {
  modal.showModal();
});

submitTaskBtn.addEventListener("click", () => {
  addTaskToList();
  displayTaskList();
});
