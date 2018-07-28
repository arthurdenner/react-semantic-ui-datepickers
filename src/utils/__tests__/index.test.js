import localeEn from '../../locales/en-US';
import { moveElementsByN } from '../index';

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
