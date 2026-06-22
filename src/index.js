import "./styles/style.css";

let taskList = [];
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
    this.priority = {
      low: "low",
      normal: "normal",
      high: "high",
    };
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
  const taskCreatedDate = new Date().getFullYear();

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
