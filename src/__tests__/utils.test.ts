import parse from 'date-fns/parse';
import startOfDay from 'date-fns/start_of_day';
import localeEn from '../locales/en-US.json';
import {
  formatDate,
  formatSelectedDate,
  getShortDate,
  getToday,
  isSelectable,
  moveElementsByN,
  omit,
  onlyNumbers,
  parseFormatString,
  pick,
} from '../utils';

const objectTest = { a: 'a', b: 'b', c: 'c' };
const dateTestString = '2018-06-21';
const dateTest = parse(dateTestString);
const june14 = parse('2018-06-14');
const june20 = parse('2018-06-20');
const june25 = parse('2018-06-25');
const june28 = parse('2018-06-28');

describe('moveElementsByN', () => {
  it('should return the same array if `n` is zero', () => {
    expect(moveElementsByN(0, localeEn.weekdays)).toEqual(localeEn.weekdays);
  });

  it('should return the correct array if `n` is different than zero', () => {
    expect(moveElementsByN(3, localeEn.weekdays)).toEqual([
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
      'Monday',
      'Tuesday',
    ]);

    expect(moveElementsByN(5, localeEn.weekdays)).toEqual([
      'Friday',
      'Saturday',
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
    ]);
  });
});

describe('omit', () => {
  it('should return the same object if the array of keys is empty', () => {
    expect(omit([], objectTest)).toEqual(objectTest);
  });

  it('should return a new object without the given keys', () => {
    expect(omit(['a', 'b'], objectTest)).toEqual({ c: 'c' });
  });
});

describe('pick', () => {
  it('should return an empty object if the array of keys is empty', () => {
    expect(pick([], objectTest)).toEqual({});
  });

  it('should return a new object with the given keys', () => {
    expect(pick(['a', 'b'], objectTest)).toEqual({ a: 'a', b: 'b' });
  });
});

describe('formatDate', () => {
  it('should return `undefined` if an invalid date is given', () => {
    expect(formatDate(null, 'DD/MM/YYYY')).toBe(undefined);
  });

  it('should format correctly if a valid date is given', () => {
    expect(formatDate(dateTest, 'DD/MM/YYYY')).toBe('21/06/2018');
  });
});

describe('isSelectable', () => {
  it('should return true if the first date is in the informed range', () => {
    expect(isSelectable(dateTest, june14, june28)).toBe(true);
  });

  it('should return false if the first date is not in the informed range', () => {
    expect(isSelectable(dateTest, june14, june20)).toBe(false);
  });

  it('should return true if the first date is after the minDate', () => {
    expect(isSelectable(dateTest, june14, undefined)).toBe(true);
  });

  it('should return false if the first date is after the minDate', () => {
    expect(isSelectable(dateTest, june25, undefined)).toBe(false);
  });

  it('should return true if the first date is before the maxDate', () => {
    expect(isSelectable(dateTest, undefined, june25)).toBe(true);
  });

  it('should return false if the first date is before the maxDate', () => {
    expect(isSelectable(dateTest, undefined, june14)).toBe(false);
  });

  it('should return true if we only provide one date to the function', () => {
    expect(isSelectable(dateTest)).toBe(true);
  });
});

describe('getToday', () => {
  const today = startOfDay(new Date());

  it('should return the correct result if `today` is not selectable', () => {
    expect(getToday(june14, june28)).toEqual({
      date: today,
      selectable: false,
      selected: false,
      today: true,
    });
  });

  it('should return the correct result if `today` is selectable', () => {
    expect(getToday(june14)).toEqual({
      date: today,
      selectable: true,
      selected: false,
      today: true,
    });
  });
});

describe('formatSelectedDate', () => {
  it('should return an empty string if an invalid date is given', () => {
    expect(formatSelectedDate(null, 'DD/MM/YYYY')).toBe('');
  });

  it('should return the correct result if a valid date is given', () => {
    expect(formatSelectedDate(june14, 'DD/MM/YYYY')).toBe('14/06/2018');
  });

  it('should return the correct result if a valid array of dates is given', () => {
    expect(formatSelectedDate([june14, june20], 'DD/MM/YYYY')).toBe(
      '14/06/2018 - 20/06/2018'
    );
  });
});

describe('parseFormatString', () => {
  it('should change the case of letters D and Y', () => {
    expect(parseFormatString('YYYY-MM-DD')).toBe('yyyy-MM-dd');

    expect(parseFormatString('DD/MM/yyyy')).toBe('dd/MM/yyyy');
  });
});

describe('onlyNumbers', () => {
  it('should only return numbers', () => {
    expect(onlyNumbers('ABC-1025.4.8')).toBe('102548');
  });
});

describe('getShortDate', () => {
  it('should return undefined if date is not provided', () => {
    expect(getShortDate(undefined)).toBe(undefined);
  });

  it('should return the date provided in the right format', () => {
    expect(getShortDate(new Date(dateTestString))).toBe(dateTestString);
  });
});
