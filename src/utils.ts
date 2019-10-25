import format from 'date-fns/format';
import isBefore from 'date-fns/is_before';
import startOfDay from 'date-fns/start_of_day';
import { DateFns, Object } from './types';
import dateFnsV2 from '../date-fns-v2';

export const isSelectable = (
  date: DateFns,
  minDate?: DateFns,
  maxDate?: DateFns
) => {
  if (
    (minDate && isBefore(date, minDate)) ||
    (maxDate && isBefore(maxDate, date))
  ) {
    return false;
  }

  return true;
};

export const getToday = (minDate?: DateFns, maxDate?: DateFns) => {
  const today = new Date();

  return {
    date: startOfDay(today),
    selectable: isSelectable(today, minDate, maxDate),
    selected: false,
    today: true,
  };
};

export const formatDate = (date: DateFns | null, dateFormat: string) =>
  date ? format(startOfDay(date), dateFormat) : undefined;

export const omit = (keysToOmit: string[], obj: Object) => {
  const newObj = { ...obj };

  keysToOmit.forEach(key => delete newObj[key]);

  return newObj;
};

export const pick = (keysToPick: string[], obj: Object) => {
  const newObj: Object = {};

  keysToPick.forEach(key => {
    newObj[key] = obj[key];
  });

  return newObj;
};

export const moveElementsByN = (n: number, arr: any[]) =>
  arr.slice(n).concat(arr.slice(0, n));

export const formatSelectedDate = (
  selectedDate: Date | Date[] | null,
  dateFormat: string
) => {
  if (!selectedDate) {
    return '';
  }

  return Array.isArray(selectedDate)
    ? selectedDate.map(date => formatDate(date, dateFormat)).join(' - ')
    : formatDate(selectedDate, dateFormat);
};

export const parseFormatString = (formatString: string) =>
  formatString.replace(/[D, Y]/gi, a => a.toLowerCase());

export const parseOnBlur = (
  typedValue: string,
  formatString: string,
  isRangeInput: boolean
) => {
  const parsedFormatString = parseFormatString(formatString);

  if (isRangeInput) {
    const rangeValues = typedValue.split(' - ');

    return (
      rangeValues
        // @ts-ignore
        .map(value => dateFnsV2.parse(value, parsedFormatString, new Date()))
        .sort((a, b) => (a > b ? 1 : -1))
    );
  }

  // @ts-ignore
  return dateFnsV2.parse(typedValue, parsedFormatString, new Date());
};

export const onlyNumbers = (value = '') => value.replace(/[^\d]/g, '');

export function getShortDate(date?: Date) {
  if (!date) {
    return undefined;
  }

  return date.toISOString().slice(0, 10);
}
