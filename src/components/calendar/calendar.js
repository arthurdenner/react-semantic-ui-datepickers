import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Segment } from 'semantic-ui-react';
import Button, { TodayButton } from '../button';
import CalendarCell from '../cell';
import { getToday } from '../../utils';
import 'semantic-ui-css/semantic.min.css';
import './calendar.css';

const Calendar = ({
  calendars,
  getBackProps,
  getDateProps,
  getForwardProps,
  maxDate,
  minDate,
  monthNames,
  selected,
  selectedClassName,
  showToday,
  todayButtonText,
  weekdayNames,
}) => (
  <Segment className="clndr-calendars-segment">
    <div
      className="clndr-calendars-wrapper"
      style={{ '--n': calendars.length }}
    >
      {calendars.map((calendar, calendarIdx) => (
        <div
          className="clndr-calendar"
          key={`${calendar.year}-${calendar.month}`}
        >
          <div className="clndr-control">
            <div className="clndr-control-buttons">
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

            <span
              className="clndr-control-month"
              title={`${monthNames[calendar.month]} ${calendar.year}`}
            >
              {monthNames[calendar.month].slice(0, 3)} {calendar.year}
            </span>

            <div
              className="clndr-control-buttons"
              style={{ '--justify': 'flex-end' }}
            >
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
            {weekdayNames.map(weekday => (
              <CalendarCell
                key={`${calendar.year}-${calendar.month}-${weekday}`}
                title={weekday}
              >
                {weekday.slice(0, 2)}
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
        </div>
      ))}
    </div>
    {showToday && (
      <TodayButton
        {...getToday(selected, minDate, maxDate)}
        {...getDateProps({
          dateObj: getToday(selected, minDate, maxDate),
        })}
      >
        {todayButtonText}
      </TodayButton>
    )}
  </Segment>
);

Calendar.propTypes = {
  calendars: PropTypes.array.isRequired,
  getBackProps: PropTypes.func.isRequired,
  getDateProps: PropTypes.func.isRequired,
  getForwardProps: PropTypes.func.isRequired,
  maxDate: PropTypes.instanceOf(Date),
  minDate: PropTypes.instanceOf(Date),
  monthNames: PropTypes.array.isRequired,
  onDateSelected: PropTypes.func,
  selected: PropTypes.instanceOf(Date),
  selectedClassName: PropTypes.string,
  showToday: PropTypes.bool,
  todayButtonText: PropTypes.string.isRequired,
  weekdayNames: PropTypes.array.isRequired,
};

Calendar.defaultProps = {
  maxDate: null,
  minDate: null,
  onDateSelected: () => {},
  showToday: true,
};

export default Calendar;
