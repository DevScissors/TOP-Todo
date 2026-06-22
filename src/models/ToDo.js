export default class ToDo {
  constructor(name, category, priority, dueDate, status, createdDate, id) {
    this.name = name;
    this.category = category;
    this.priority = priority;
    this.dueDate = dueDate ? new Date(dueDate) : null;
    this.status = status;
    this.createdDate = createdDate;
    this.id = crypto.randomUUID();
  }
}
