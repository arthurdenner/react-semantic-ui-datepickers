import cn from 'classnames';
import React, { Fragment } from 'react';
import { Segment } from 'semantic-ui-react';
import { DateFns, Locale, SemanticDatepickerProps } from 'types';
import { getShortDate, getToday } from '../../utils';
import Button from '../button';
import CalendarCell from '../cell';
import TodayButton from '../today-button';
import './calendar.css';

type CalendarProps = {
  calendars: any[];
  filterDate: (date: Date) => boolean;
  getBackProps: (props: any) => void;
  getDateProps: (props: any) => void;
  getForwardProps: (props: any) => void;
  maxDate?: DateFns;
  minDate?: DateFns;
  months: Locale['months'];
  nextMonth: string;
  nextYear: string;
  pointing: SemanticDatepickerProps['pointing'];
  previousMonth: string;
  previousYear: string;
  showToday: boolean;
  todayButton: string;
  weekdays: Locale['weekdays'];
};

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
  <Segment className={cn('clndr-calendars-segment', pointings[pointing])}>
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
                    title={previousYear}
                    {...getBackProps({ calendars, offset: 12 })}
                  />
                  <Button
                    icon="angle left"
                    style={{ marginRight: 0 }}
                    title={previousMonth}
                    {...getBackProps({ calendars })}
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
                    title={nextMonth}
                    {...getForwardProps({ calendars })}
                  />
                  <Button
                    icon="angle double right"
                    style={{ marginRight: 0 }}
                    title={nextYear}
                    {...getForwardProps({ calendars, offset: 12 })}
                  />
                </Fragment>
              )}
            </div>
          </div>
          <div className="clndr-days">
            {weekdays.map(weekday => (
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

                if (!dateObj) {
                  return <CalendarCell key={key} />;
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

Calendar.defaultProps = {
  pointing: 'left',
  showToday: true,
};

export default Calendar;
