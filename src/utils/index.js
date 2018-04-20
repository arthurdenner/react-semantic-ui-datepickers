import format from 'date-fns/format';
import isEqual from 'date-fns/is_equal';
import startOfTheDay from 'date-fns/start_of_day';

export const getToday = selected => {
  return {
    date: startOfTheDay(new Date()),
    selectable: true,
    selected: isEqual(new Date(), selected),
    today: true,
  };
};

export const formatDate = (date, dateFormat) =>
  date ? format(startOfTheDay(date), dateFormat) : undefined;
