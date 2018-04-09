import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import './cell.css';

const CalendarCell = ({
  selectable,
  selected,
  selectedClassName,
  today,
  ...otherProps
}) => (
  <span
    className={cn('clndr-cell', {
      'clndr-cell-today': today,
      'clndr-cell-disabled': !selectable,
      [selectedClassName]: selected,
    })}
    {...otherProps}
  />
);

CalendarCell.propTypes = {
  selectable: PropTypes.bool,
  selectedClassName: PropTypes.string,
  today: PropTypes.bool,
};

CalendarCell.defaultProps = {
  selectable: false,
  selectedClassName: 'clndr-cell-selected',
  today: false,
};

export default CalendarCell;
