/**
 * Format a Date object as DD/MM/YYYY hh:mm
 * @param {Date} date - The date to format
 * @returns {string} Formatted date string
 */
export function formatDateTime(date) {
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

  return `${month}/${day}/${year} ${hours}:${minutes} ${ampm}`;
}

/**
 * Format a Date object as DD/MM/YYYY (date only)
 * @param {Date} date - The date to format
 * @returns {string} Formatted date string
 */
export function formatDate(date) {
  if (!(date instanceof Date)) {
    return "";
  }

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
}
