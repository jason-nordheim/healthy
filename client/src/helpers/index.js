const convertDateToString = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDay();
  const MM = month < 10 ? `0${month}` : `${month}`;
  const DD = day < 10 ? `0${day}` : `${day}`;
  return `${year}-${MM}-${DD}`;
};

export { convertDateToString };
