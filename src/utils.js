import format from 'date-fns/format';
import isBefore from 'date-fns/is_before';
import startOfDay from 'date-fns/start_of_day';
import dateFnsV2 from '../date-fns-v2';

export const isSelectable = (date, minDate, maxDate) => {
  if (
    (minDate && isBefore(date, minDate)) ||
    (maxDate && isBefore(maxDate, date))
  ) {
    return false;
  }

  return true;
};

export const getToday = (minDate, maxDate) => {
  const today = new Date();

  return {
    date: startOfDay(today),
    selectable: isSelectable(today, minDate, maxDate),
    selected: false,
    today: true,
  };
};

export const formatDate = (date, dateFormat) =>
  date ? format(startOfDay(date), dateFormat) : undefined;

export const omit = (keysToOmit, obj) => {
  const newObj = { ...obj };

  keysToOmit.forEach(key => delete newObj[key]);

  return newObj;
};

export const pick = (keysToPick, obj) => {
  const newObj = {};

  keysToPick.forEach(key => {
    newObj[key] = obj[key];
  });

  return newObj;
};

export const moveElementsByN = (n, arr) => arr.slice(n).concat(arr.slice(0, n));

export const formatSelectedDate = (selectedDate, dateFormat) => {
  if (!selectedDate) {
    return '';
  }

  return Array.isArray(selectedDate)
    ? selectedDate.map(date => formatDate(date, dateFormat)).join(' - ')
    : formatDate(selectedDate, dateFormat);
};

export const parseFormatString = formatString =>
  formatString.replace(/[D, Y]/gi, a => a.toLowerCase());

export const parseOnBlur = (typedValue, formatString, isRangeInput) => {
  if (isRangeInput) {
    const rangeValues = typedValue.split(' - ');

    return rangeValues.map(value =>
      dateFnsV2.parse(value, parseFormatString(formatString, true), new Date())
    );
  }

  return dateFnsV2.parse(
    typedValue,
    parseFormatString(formatString),
    new Date()
  );
};
