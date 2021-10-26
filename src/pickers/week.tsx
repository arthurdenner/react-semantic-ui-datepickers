import compareAsc from 'date-fns/compareAsc';
import isSameDay from 'date-fns/isSameDay';
import React from 'react';
import { WeekDataPickerProps } from '../types';
import BaseDatePicker from './base';
import { composeEventHandlers, isInRange, findWeekDatesForDate } from './utils';

type WeekDatePickerState = {
  hoveredDates: Date[] | null;
};

class WeekDatePicker extends React.Component<
  WeekDataPickerProps,
  WeekDatePickerState
> {
  static defaultProps = {
    selected: [],
  };

  state: WeekDatePickerState = { hoveredDates: null };

  setHoveredDates = (dates: Date[] | null) => {
    this.setState((state) =>
      state.hoveredDates === dates ? null : { hoveredDates: dates }
    );
  };

  // Calendar level
  onMouseLeave = () => {
    this.setHoveredDates(null);
  };

  // Date level
  onHoverFocusDate(date: Date | null) {
    const { firstDayOfWeek } = this.props;

    if (date === null) return;
    this.setHoveredDates(findWeekDatesForDate(date, firstDayOfWeek));
  }

  _handleOnDateSelected = (
    { selectable, date },
    event: React.SyntheticEvent
  ) => {
    const { onChange, firstDayOfWeek } = this.props;

    if (!selectable) {
      return;
    }

    let newDates = findWeekDatesForDate(
      date,
      firstDayOfWeek ? firstDayOfWeek : 0
    );

    if (onChange) {
      onChange(event, newDates);
    }

    if (newDates.length === 2) {
      this.setHoveredDates(null);
    }
  };

  getEnhancedDateProps = (
    getDateProps,
    dateBounds,
    { onMouseEnter, onFocus, ...restProps }
  ) => {
    const { hoveredDates } = this.state;
    const { date } = restProps.dateObj;
    return getDateProps({
      ...restProps,
      inRange: isInRange(dateBounds, date),
      start: dateBounds[0] && isSameDay(dateBounds[0], date),
      end: dateBounds[1] && isSameDay(dateBounds[1], date),
      // @ts-ignore
      hovered: hoveredDates && isSameDay(hoveredDates, date),
      onMouseEnter: composeEventHandlers(onMouseEnter, () => {
        this.onHoverFocusDate(date);
      }),
      onFocus: composeEventHandlers(onFocus, () => {
        this.onHoverFocusDate(date);
      }),
    });
  };

  getEnhancedRootProps = (getRootProps, props) =>
    getRootProps({
      ...props,
      onMouseLeave: this.onMouseLeave,
    });

  render() {
    const { children, ...rest } = this.props;
    const { hoveredDates } = this.state;

    const dateBounds = hoveredDates
      ? [hoveredDates[0], hoveredDates[hoveredDates.length - 1]].sort(
          compareAsc
        )
      : [];

    return (
      <BaseDatePicker {...rest} onDateSelected={this._handleOnDateSelected}>
        {({ getRootProps, getDateProps, ...renderProps }) =>
          children({
            ...renderProps,
            getRootProps: this.getEnhancedRootProps.bind(this, getRootProps),
            getDateProps: this.getEnhancedDateProps.bind(
              this,
              getDateProps,
              dateBounds
            ),
          })
        }
      </BaseDatePicker>
    );
  }
}

export default WeekDatePicker;
