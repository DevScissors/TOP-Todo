import createSVGNode from "./svg";

export default function taskOptionsSVGs(task = {}) {
  const taskOptionsColWrapper = document.createElement("td");

  // Archive SVG creation
  const taskOptionArchiveLink = document.createElement("a");
  taskOptionArchiveLink.classList.add("archive-task", "task-option");

  const taskOptionArchiveSVG = createSVGNode("svg", {
    viewBox: "0 0 24 24",
  });
  const taskOptionArchiveTitle = createSVGNode("title");
  taskOptionArchiveTitle.textContent = "Archive Task";

  const taskOptionArchivePath = createSVGNode("path", {
    d: "M3,3H21V7H3V3M4,8H20V21H4V8M9.5,11A0.5,0.5 0 0,0 9,11.5V13H15V11.5A0.5,0.5 0 0,0 14.5,11H9.5Z",
  });

  // Restore SVG creation
  const taskOptionRestoreLink = document.createElement("a");
  taskOptionRestoreLink.classList.add("restore-task", "task-option");

  const taskOptionRestoreSVG = createSVGNode("svg", {
    viewBox: "0 0 24 24",
  });
  const taskOptionRestoreTitle = createSVGNode("title");
  taskOptionRestoreTitle.textContent = "Restore Task";

  const taskOptionRestorePath = createSVGNode("path", {
    d: "M13,3A9,9 0 0,0 4,12H1L4.89,15.89L4.96,16.03L9,12H6A7,7 0 0,1 13,5A7,7 0 0,1 20,12A7,7 0 0,1 13,19C11.07,19 9.32,18.21 8.06,16.94L6.64,18.36C8.27,20 10.5,21 13,21A9,9 0 0,0 22,12A9,9 0 0,0 13,3Z",
  });

  // Delete SVG creation
  const taskOptionDeleteLink = document.createElement("a");
  taskOptionDeleteLink.classList.add("delete-task", "task-option");

  const taskOptionDeleteSVG = createSVGNode("svg", {
    viewBox: "0 0 24 24",
  });
  const taskOptionDeleteTitle = createSVGNode("title");
  taskOptionDeleteTitle.textContent = "Delete Task";

  const taskOptionDeletePath = createSVGNode("path", {
    d: "M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z",
  });

  // Edit SVG creation
  const taskOptionEditLink = document.createElement("a");
  taskOptionEditLink.classList.add("edit-task", "task-option");

  const taskOptionEditSVG = createSVGNode("svg", {
    viewBox: "0 0 24 24",
  });
  const taskOptionEditTitle = createSVGNode("title");
  taskOptionEditTitle.textContent = "Edit Task";

  const taskOptionEditPath = createSVGNode("path", {
    d: "M6 2C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H10V20.1L20 10.1V8L14 2H6M13 3.5L18.5 9H13V3.5M20.1 13C20 13 19.8 13.1 19.7 13.2L18.7 14.2L20.8 16.3L21.8 15.3C22 15.1 22 14.7 21.8 14.5L20.5 13.2C20.4 13.1 20.3 13 20.1 13M18.1 14.8L12 20.9V23H14.1L20.2 16.9L18.1 14.8Z",
  });

  // Put title and path inside each SVG, then append SVG to its link
  taskOptionArchiveSVG.append(taskOptionArchiveTitle, taskOptionArchivePath);
  taskOptionRestoreSVG.append(taskOptionRestoreTitle, taskOptionRestorePath);
  taskOptionDeleteSVG.append(taskOptionDeleteTitle, taskOptionDeletePath);
  taskOptionEditSVG.append(taskOptionEditTitle, taskOptionEditPath);

  taskOptionArchiveLink.append(taskOptionArchiveSVG);
  taskOptionRestoreLink.append(taskOptionRestoreSVG);
  taskOptionDeleteLink.append(taskOptionDeleteSVG);
  taskOptionEditLink.append(taskOptionEditSVG);

  taskOptionsColWrapper.classList.add("task-options-wrapper");
  if (task?.archived) {
    taskOptionsColWrapper.append(
      taskOptionRestoreLink,
      taskOptionDeleteLink,
      taskOptionEditLink,
    );
  } else {
    taskOptionsColWrapper.append(
      taskOptionArchiveLink,
      taskOptionDeleteLink,
      taskOptionEditLink,
    );
  }

  return taskOptionsColWrapper;
}
