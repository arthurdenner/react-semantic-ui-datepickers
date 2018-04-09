export const normalizeDate = date => {
  const newDate = new Date(date.getTime());
  newDate.setHours(0, 0, 0, 0);

  return newDate;
};

const isEqual = (date, dateToCompare) => {
  if (!date || !dateToCompare) {
    return false;
  }

  return (
    normalizeDate(date).getTime() === normalizeDate(dateToCompare).getTime()
  );
};

export const getToday = selected => {
  return {
    date: normalizeDate(new Date()),
    selectable: true,
    selected: isEqual(new Date(), selected),
    today: true,
  };
};
