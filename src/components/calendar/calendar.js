import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import cn from 'classnames';
import Dayzed from 'dayzed';
import Button from '../button';
import CalendarCell from '../cell';
import { monthNamesShort, weekdayNamesShort } from '../../data';
import 'semantic-ui-css/semantic.min.css';
import './calendar.css';

class Calendar extends Component {
  render() {
    const {
      fluid,
      onDateSelected,
      selected,
      selectedClassName,
      ...otherProps
    } = this.props;

    return (
      <Dayzed
        {...otherProps}
        onDateSelected={onDateSelected}
        selected={selected}
        render={({ calendars, getBackProps, getForwardProps, getDateProps }) =>
          calendars.map(calendar => (
            <Segment
              compact={!fluid}
              key={`${calendar.year}-${calendar.month}`}
            >
              <div className="clndr-control">
                <Button
                  icon="angle double left"
                  iconPosition="left"
                  {...getBackProps({ calendars, offset: 12 })}
                />
                <Button
                  content="Back"
                  icon="angle left"
                  iconPosition="left"
                  {...getBackProps({ calendars })}
                  style={{ marginRight: 0 }}
                />

                <span className="clndr-control-month">
                  {monthNamesShort[calendar.month]} {calendar.year}
                </span>
                <Button
                  content="Next"
                  icon="angle right"
                  iconPosition="right"
                  {...getForwardProps({ calendars })}
                />
                <Button
                  icon="angle double right"
                  iconPosition="right"
                  style={{ marginRight: 0 }}
                  {...getForwardProps({ calendars, offset: 12 })}
                />
              </div>
              <div className="clndr-days">
                {weekdayNamesShort.map(weekday => (
                  <CalendarCell
                    key={`${calendar.year}-${calendar.month}-${weekday}`}
                  >
                    {weekday}
                  </CalendarCell>
                ))}
                {calendar.weeks.map(week =>
                  week.map((dateObj, index) => {
                    const key = `${calendar.year}-${calendar.month}-${index}`;

                    return !dateObj ? (
                      <CalendarCell key={key} />
                    ) : (
                      <CalendarCell
                        key={key}
                        selectedClassName={selectedClassName}
                        {...dateObj}
                        {...getDateProps({ dateObj })}
                      >
                        {dateObj.date.getDate()}
                      </CalendarCell>
                    );
                  })
                )}
              </div>
            </Segment>
          ))
        }
      />
    );
  }
}

export default Calendar;
