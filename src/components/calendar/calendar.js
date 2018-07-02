import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';
import Button, { TodayButton } from '../button';
import CalendarCell from '../cell';
import { getToday } from '../../utils';
import { monthNamesShort, weekdayNamesShort } from '../../data';
import 'semantic-ui-css/semantic.min.css';
import './calendar.css';

const Calendar = ({
  fluid,
  minDate,
  maxDate,
  selected,
  selectedClassName,
  showToday,
  calendars,
  getBackProps,
  getForwardProps,
  getDateProps,
}) =>
  calendars.map((calendar, calendarIdx) => (
    <Segment
      className="clndr-calendar"
      compact={!fluid}
      key={`${calendar.year}-${calendar.month}`}
    >
      <div className="clndr-control">
        <div>
          {calendarIdx === 0 && (
            <Fragment>
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
            </Fragment>
          )}
        </div>

        <span className="clndr-control-month">
          {monthNamesShort[calendar.month]} {calendar.year}
        </span>

        <div style={{ '--justify': 'flex-end' }}>
          {calendarIdx === calendars.length - 1 && (
            <Fragment>
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
            </Fragment>
          )}
        </div>
      </div>
      <div className="clndr-days">
        {weekdayNamesShort.map(weekday => (
          <CalendarCell key={`${calendar.year}-${calendar.month}-${weekday}`}>
            {weekday}
          </CalendarCell>
        ))}
        {calendar.weeks.map(week =>
          week.map((dateObj, weekIdx) => {
            const key = `${calendar.year}-${calendar.month}-${weekIdx}`;

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
      </div>
      {showToday && (
        <TodayButton
          {...getToday(selected, minDate, maxDate)}
          {...getDateProps({
            dateObj: getToday(selected, minDate, maxDate),
          })}
        >
          Today
        </TodayButton>
      )}
    </Segment>
  ));

Calendar.propTypes = {
  fluid: PropTypes.bool,
  maxDate: PropTypes.instanceOf(Date),
  minDate: PropTypes.instanceOf(Date),
  onDateSelected: PropTypes.func,
  selected: PropTypes.instanceOf(Date),
  selectedClassName: PropTypes.string,
  showToday: PropTypes.bool,
};

Calendar.defaultProps = {
  onDateSelected: () => {},
  maxDate: null,
  minDate: null,
  showToday: true,
};

export default Calendar;
