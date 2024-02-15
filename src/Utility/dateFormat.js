export function convertToStandardDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString(); // Convert to standard date format
}

export const getFormattedDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(today.getDate()).padStart(2, '0');
    return `${month}/${day}/${year}`;
  };
