import compareAsc from 'date-fns/compareAsc';
import isSameDay from 'date-fns/isSameDay';
import React from 'react';
import { RangeDatePickerProps } from '../types';
import BaseDatePicker from './base';
import { composeEventHandlers, isInRange } from './utils';

type RangeDatePickerState = {
  hoveredDate: Date | null;
};

class RangeDatePicker extends React.Component<
  RangeDatePickerProps,
  RangeDatePickerState
> {
  static defaultProps = {
    selected: [],
  };

  state = { hoveredDate: null };

  setHoveredDate = (date: Date | null) => {
    this.setState((state) =>
      state.hoveredDate === date ? null : { hoveredDate: date }
    );
  };

  // Calendar level
  onMouseLeave = () => {
    this.setHoveredDate(null);
  };

  // Date level
  onHoverFocusDate(date: Date | null) {
    if (this.props.selected.length !== 1) {
      return;
    }

    this.setHoveredDate(date);
  }

  _handleOnDateSelected = (
    { selectable, date },
    event: React.SyntheticEvent
  ) => {
    const { selected: selectedDates, onChange } = this.props;

    if (!selectable) {
      return;
    }

    const dateTime = date.getTime();
    let newDates = [...selectedDates];
    if (selectedDates.length) {
      if (selectedDates.length === 1) {
        const firstTime = selectedDates[0].getTime();
        if (firstTime < dateTime) {
          newDates.push(date);
        } else {
          newDates.unshift(date);
        }
      } else if (newDates.length === 2) {
        newDates = [date];
      }
    } else {
      newDates.push(date);
    }

    if (onChange) {
      onChange(event, newDates);
    }

    if (newDates.length === 2) {
      this.setHoveredDate(null);
    }
  };

  getEnhancedDateProps = (
    getDateProps,
    dateBounds,
    { onMouseEnter, onFocus, ...restProps }
  ) => {
    const { hoveredDate } = this.state;
    const { date } = restProps.dateObj;
    return getDateProps({
      ...restProps,
      inRange: isInRange(dateBounds, date),
      start: dateBounds[0] && isSameDay(dateBounds[0], date),
      end: dateBounds[1] && isSameDay(dateBounds[1], date),
      // @ts-ignore
      hovered: hoveredDate && isSameDay(hoveredDate, date),
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
    const { hoveredDate } = this.state;
    const { selected } = this.props;

    const dateBounds =
      selected.length === 2 || !selected.length || !hoveredDate
        ? selected
        : // prettier-ignore
          // @ts-ignore
          [selected[0], hoveredDate].sort(compareAsc);

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

export default RangeDatePicker;
