function parseDate(dateString) {
  const date = new Date(dateString);
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() ; // Months are zero-based
  const day = date.getUTCDate();
  return new Date(year, month, day)
}

export default parseDate;
