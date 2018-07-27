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
    fns.some(fn => {
      fn && fn(event, ...args);
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
  return event => {
    const { keyCode } = event;
    const fn = {
      37: config.left,
      39: config.right,
      38: config.up,
      40: config.down,
    }[keyCode];
    fn && fn(event);
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
