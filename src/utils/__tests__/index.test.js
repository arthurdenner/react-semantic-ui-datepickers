import { weekdayNamesEng } from '../../data';
import { moveElementsByN } from '../index';

describe('moveElementsByN', () => {
  it('should return the same array if `n` is zero', () => {
    expect(moveElementsByN(0, weekdayNamesEng)).toEqual(weekdayNamesEng);
  });

  it('should return the correct array if `n` is different than zero', () => {
    expect(moveElementsByN(3, weekdayNamesEng)).toEqual([
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
      'Monday',
      'Tuesday',
    ]);

    expect(moveElementsByN(5, weekdayNamesEng)).toEqual([
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
