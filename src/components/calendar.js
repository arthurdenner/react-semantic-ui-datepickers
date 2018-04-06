import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import Dayzed from 'dayzed';
import Button from './button';
import CalendarCell from './cell';
import { monthNamesShort, weekdayNamesShort } from '../data';
import 'semantic-ui-css/semantic.min.css';

class Calendar extends Component {
  render() {
    return (
      <Dayzed
        onDateSelected={this.props.onDateSelected}
        selected={this.props.selected || new Date()}
        render={({ calendars, getBackProps, getForwardProps, getDateProps }) =>
          calendars.length && (
            <div style={{ maxWidth: 800, margin: '2em', textAlign: 'center' }}>
              {calendars.map(calendar => (
                <Segment key={`${calendar.month}${calendar.year}`}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      paddingBottom: 10,
                      alignItems: 'center',
                    }}
                  >
                    <Button
                      content="Back"
                      icon="left chevron"
                      iconPosition="left"
                      {...getBackProps({ calendars })}
                    />
                    <span>
                      {monthNamesShort[calendar.month]} {calendar.year}
                    </span>
                    <Button
                      content="Next"
                      icon="right chevron"
                      iconPosition="right"
                      {...getForwardProps({ calendars })}
                    />
                  </div>
                  <div
                    style={{
                      display: 'grid',
                      'grid-template-columns': 'repeat(7, minmax(40px, 1fr))',
                      backgroundColor: 'rgba(0, 0, 0, .1)',
                      gridGap: 1,
                      border: '1px solid rgba(0, 0, 0, .1)',
                    }}
                  >
                    {weekdayNamesShort.map(weekday => (
                      <CalendarCell
                        key={`${calendar.month}-${calendar.year}-${weekday}`}
                      >
                        {weekday}
                      </CalendarCell>
                    ))}
                    {calendar.weeks.map(week =>
                      week.map((dateObj, index) => {
                        if (!dateObj) {
                          return (
                            <CalendarCell
                              key={`${calendar.year}-${
                                calendar.month
                              }-${index}`}
                            />
                          );
                        }

                        let { date, selected, selectable, today } = dateObj;
                        let background = today ? 'cornflowerblue' : '';
                        background = selected ? 'purple' : background;
                        background = !selectable ? 'teal' : background;

                        return (
                          <CalendarCell
                            key={`${calendar.year}${calendar.month}${index}`}
                            {...getDateProps({ dateObj })}
                          >
                            {selectable ? date.getDate() : 'X'}
                            {selected && '!!'}
                          </CalendarCell>
                        );
                      })
                    )}
                  </div>
                </Segment>
              ))}
            </div>
          )
        }
      />
    );
  }
}

export default Calendar;
