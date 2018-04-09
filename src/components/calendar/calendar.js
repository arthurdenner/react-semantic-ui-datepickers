import React from 'react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';
import Dayzed from 'dayzed';
import Button from '../button';
import CalendarCell from '../cell';
import { getToday } from '../../utils';
import { monthNamesShort, weekdayNamesShort } from '../../data';
import 'semantic-ui-css/semantic.min.css';
import './calendar.css';

const Calendar = ({
  fluid,
  onDateSelected,
  selected,
  selectedClassName,
  showToday,
  ...otherProps
}) => (
  <Dayzed
    {...otherProps}
    onDateSelected={onDateSelected}
    selected={selected}
    render={({ calendars, getBackProps, getForwardProps, getDateProps }) =>
      calendars.map(calendar => (
        <Segment compact={!fluid} key={`${calendar.year}-${calendar.month}`}>
          <div className="clndr-control">
            <Button
              icon="angle double left"
              title="Last year"
              {...getBackProps({ calendars, offset: 12 })}
            />
            <Button
              icon="angle left"
              style={{ marginRight: 0 }}
              title="Last month"
              {...getBackProps({ calendars })}
            />

            <span className="clndr-control-month">
              {monthNamesShort[calendar.month]} {calendar.year}
            </span>

            <Button
              icon="angle right"
              title="Next month"
              {...getForwardProps({ calendars })}
            />
            <Button
              icon="angle double right"
              style={{ marginRight: 0 }}
              title="Next year"
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

                return dateObj ? (
                  <CalendarCell
                    key={key}
                    selectedClassName={selectedClassName}
                    {...dateObj}
                    {...getDateProps({ dateObj })}
                  >
                    {dateObj.date.getDate()}
                  </CalendarCell>
                ) : (
                  <CalendarCell key={key} />
                );
              })
            )}
            {showToday && (
              <CalendarCell
                fluid
                {...getToday(selected)}
                {...getDateProps({ dateObj: getToday(selected) })}
              >
                Today
              </CalendarCell>
            )}
          </div>
        </Segment>
      ))
    }
  />
);

Calendar.propTypes = {
  fluid: PropTypes.bool,
  onDateSelected: PropTypes.func,
  selected: PropTypes.instanceOf(Date),
  selectedClassName: PropTypes.string,
  showToday: PropTypes.bool,
};

Calendar.defaultProps = {
  onDateSelected: () => {},
  showToday: true,
};

export default Calendar;
