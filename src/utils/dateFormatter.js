export function formatDateTime(date, dateOrder = "MM/DD/YYYY") {
  if (!(date instanceof Date)) {
    return "";
  }

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12 || 12;

  const formattedDate =
    dateOrder === "YYYY/MM/DD"
      ? `${year}/${month}/${day}`
      : `${month}/${day}/${year}`;

  return `${formattedDate} ${hours}:${minutes} ${ampm}`;
}

export function formatDate(date, dateOrder = "MM/DD/YYYY") {
  if (!(date instanceof Date)) {
    return "";
  }

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return dateOrder === "YYYY/MM/DD"
    ? `${year}/${month}/${day}`
    : `${month}/${day}/${year}`;
}

export function todaysDate() {
  const dueDateInput = document.querySelector(".task-due-by-date-input");

  const now = new Date();

  // Format to YYYY-MM-DDTHH:mm manually to avoid UTC offset shifts
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");

  const minDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;
  return minDateTime;
}
