/**
 * This is intended to be used to compose event handlers
 * They are executed in order until one of them calls
 * `event.preventDefault()`. Not sure this is the best
 * way to do this, but it seems legit...
 * @param {Function} fns the event hanlder functions
 * @return {Function} the event handler to add to an element
 */
export function composeEventHandlers(...fns) {
  return (event, ...args) =>
    fns.some((fn) => {
      if (fn) {
        fn(event, ...args);
      }

      return event.defaultPrevented;
    });
}

/**
 * Create an event handler for keyboard key given a config map
 * of event handlers
 * @param {Object} config consists of left, right, up, and down
 * @return {Function} the event handler to handle keyboard key
 */
export function getArrowKeyHandlers(config) {
  return (event) => {
    const { keyCode } = event;
    const fn = {
      37: config.left,
      39: config.right,
      38: config.up,
      40: config.down,
    }[keyCode];
    if (fn) {
      fn(event);
    }
  };
}

/**
 * Checks if a given date is with date range
 * @param {Array} range the range array with upper and lower bound
 * @param {Date} date a given date
 * @return {Boolean} true if date is in the range, false otherwise
 */
export function isInRange(range, date) {
  return range.length === 2 && range[0] <= date && range[1] >= date;
}

/**
 * Generates an array of all week dates in the same week for a given date
 * @param {Date} date a given date
 * @param {number} firstDayOfWeek first day of the week (e.g. 1 for Monday)
 */
export function findWeekDatesForDate(
  date: Date,
  firstDayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6 | undefined
) {
  firstDayOfWeek = firstDayOfWeek !== undefined ? firstDayOfWeek : 0;
  let weekStartDay = new Date(date.getTime());
  let dayOfWeek = date.getDay() - firstDayOfWeek;

  if (dayOfWeek < 0) {
    dayOfWeek = dayOfWeek + 7;
  }
  weekStartDay.setDate(date.getDate() - dayOfWeek);

  let dates = [weekStartDay];
  while (dates.length !== 7) {
    let nextDay = new Date(dates[dates.length - 1]);
    nextDay.setDate(nextDay.getDate() + 1);
    dates.push(nextDay);
  }
  return dates;
}
