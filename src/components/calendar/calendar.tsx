import cn from 'classnames';
import React, { Fragment } from 'react';
import { Segment } from 'semantic-ui-react';
import { Locale, RenderProps, SemanticDatepickerProps } from 'types';
import { getShortDate, getToday } from '../../utils';
import Button from '../button';
import CalendarCell from '../cell';
import TodayButton from '../today-button';
import './calendar.css';

interface CalendarProps extends RenderProps {
  filterDate: (date: Date) => boolean;
  inline: SemanticDatepickerProps['inline'];
  inverted: SemanticDatepickerProps['inverted'];
  maxDate?: Date;
  minDate?: Date;
  months: Locale['months'];
  nextMonth: string;
  nextYear: string;
  pointing: SemanticDatepickerProps['pointing'];
  previousMonth: string;
  previousYear: string;
  showToday: SemanticDatepickerProps['showToday'];
  todayButton: string;
  weekdays: Locale['weekdays'];
}

const styles: { [key: string]: React.CSSProperties } = {
  leftBtn: { textAlign: 'start' },
  rightBtn: { textAlign: 'end' },
};

const pointings = {
  'top left': 'clndr-top clndr-left',
  'top right': 'clndr-top clndr-right',
  left: 'clndr-left',
  right: 'clndr-right',
};

const Calendar: React.FC<CalendarProps> = ({
  calendars,
  filterDate,
  getBackProps,
  getDateProps,
  getForwardProps,
  inline,
  inverted,
  maxDate,
  minDate,
  months,
  nextMonth,
  nextYear,
  previousMonth,
  previousYear,
  showToday,
  todayButton,
  weekdays,
  pointing,
}) => (
  <Segment
    inverted={inverted}
    className={cn('clndr-calendars-segment', {
      'clndr-floating': !inline,
      [pointings[pointing]]: !inline,
    })}
  >
    <div
      className="clndr-calendars-wrapper"
      style={{ '--n': calendars.length } as React.CSSProperties}
    >
      {calendars.map((calendar, calendarIdx) => (
        <div key={`${calendar.year}-${calendar.month}`}>
          <div className="clndr-control">
            <div style={styles.leftBtn}>
              {calendarIdx === 0 && (
                <Fragment>
                  <Button
                    icon="angle double left"
                    inverted={inverted}
                    title={previousYear}
                    {...getBackProps({
                      calendars,
                      'aria-label': previousYear,
                      offset: 12,
                    })}
                  />
                  <Button
                    icon="angle left"
                    inverted={inverted}
                    style={{ marginRight: 0 }}
                    title={previousMonth}
                    {...getBackProps({
                      calendars,
                      'aria-label': previousMonth,
                    })}
                  />
                </Fragment>
              )}
            </div>

            <span title={`${months[calendar.month]} ${calendar.year}`}>
              {months[calendar.month].slice(0, 3)} {calendar.year}
            </span>

            <div style={styles.rightBtn}>
              {calendarIdx === calendars.length - 1 && (
                <Fragment>
                  <Button
                    icon="angle right"
                    inverted={inverted}
                    title={nextMonth}
                    {...getForwardProps({
                      calendars,
                      'aria-label': nextMonth,
                    })}
                  />
                  <Button
                    icon="angle double right"
                    inverted={inverted}
                    style={{ marginRight: 0 }}
                    title={nextYear}
                    {...getForwardProps({
                      calendars,
                      'aria-label': nextYear,
                      offset: 12,
                    })}
                  />
                </Fragment>
              )}
            </div>
          </div>
          <div className="clndr-days">
            {weekdays.map((weekday) => (
              <CalendarCell
                key={`${calendar.year}-${calendar.month}-${weekday}`}
                inverted={inverted}
                aria-label={weekday}
                title={weekday}
              >
                {weekday.slice(0, 2)}
              </CalendarCell>
            ))}
            {calendar.weeks.map((week) =>
              week.map((dateObj, weekIdx) => {
                const key = `${calendar.year}-${calendar.month}-${weekIdx}`;

                if (!dateObj) {
                  return <CalendarCell key={key} inverted={inverted} />;
                }

                const selectable =
                  dateObj.selectable && filterDate(dateObj.date);
                const shortDate = getShortDate(dateObj.date);

                return (
                  <CalendarCell
                    key={key}
                    {...dateObj}
                    {...getDateProps({ dateObj: { ...dateObj, selectable } })}
                    data-testid={`datepicker-cell-${shortDate}`}
                    inverted={inverted}
                    selectable={selectable}
                  >
                    {dateObj.date.getDate()}
                  </CalendarCell>
                );
              })
            )}
          </div>
        </div>
      ))}
    </div>
    {showToday && (
      <TodayButton
        inverted={inverted}
        {...getToday(minDate, maxDate)}
        {...getDateProps({
          dateObj: getToday(minDate, maxDate),
        })}
      >
        {todayButton}
      </TodayButton>
    )}
  </Segment>
);

export default Calendar;
