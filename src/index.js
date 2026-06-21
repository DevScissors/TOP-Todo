import "./styles/style.css";

let taskList = [];
const modal = document.querySelector("#addNewTask");
const addTaskBtn = document.querySelector(".new-task-btn");

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
    this.createdDate = new Date();
    this.id = crypto.randomUUID();
  }
}

const toDoItem = new ToDo(
  "Wash car",
  "Personal",
  "Normal",
  "12/01/2026",
  false,
  "06/21/2026",
);

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
