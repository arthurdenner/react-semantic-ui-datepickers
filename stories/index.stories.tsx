import React from 'react';
import {
  withKnobs,
  boolean,
  date,
  number,
  select,
  text,
} from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
// import { Form } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import SemanticDatepicker from '../src';
import {
  Content,
  isWeekday,
  localeMap,
  onChange,
  pointingMap,
  typeMap,
} from './common';
// import { parseISO } from 'date-fns';

const stories = storiesOf('Datepickers', module);

stories.addDecorator(withKnobs);
stories.addParameters({
  info: {
    disable: true,
  },
  options: {
    panelPosition: 'right',
  },
});

stories.add('Basic usage', () => {
  const type = select('Type', typeMap, typeMap.basic);
  const allowOnlyNumbers = boolean('Allow only numbers', false);
  const clearOnSameDateClick = boolean('Clear on same date click', true);
  const datePickerOnly = boolean('Datepicker only', false);
  const firstDayOfWeek = number('First day of week', 0, { max: 6, min: 0 });
  const format = text('Format', 'YYYY-MM-DD');
  const keepOpenOnClear = boolean('Keep open on clear', false);
  const keepOpenOnSelect = boolean('Keep open on select', false);
  const locale = select('Locale', localeMap, localeMap['en-US']);
  const pointing = select('Pointing', pointingMap, pointingMap.left);
  const clearable = boolean('Clearable', true);
  const readOnly = boolean('Read-only', false);
  const showOutsideDays = boolean('Show outside days', false);
  const minDate = new Date(date('Min date', new Date('2018-01-01')));
  const maxDate = new Date(date('Max date', new Date('2030-01-01')));
  const onlyWeekdays = boolean('Only weekdays (filterDate example)', false);
  const controlValue = boolean('Control value', false);
  const initialValue = controlValue
    ? type === 'basic'
      ? new Date(date('Initial value'))
      : [new Date(date('Initial value')), new Date(date('Final value'))]
    : undefined;
  const filterDate = onlyWeekdays ? isWeekday : undefined;
  const key = type + format + readOnly;

  return (
    <Content>
      <SemanticDatepicker
        key={key}
        allowOnlyNumbers={allowOnlyNumbers}
        clearOnSameDateClick={clearOnSameDateClick}
        clearable={clearable}
        datePickerOnly={datePickerOnly}
        filterDate={filterDate}
        firstDayOfWeek={firstDayOfWeek}
        format={format}
        keepOpenOnClear={keepOpenOnClear}
        keepOpenOnSelect={keepOpenOnSelect}
        locale={locale}
        maxDate={maxDate}
        minDate={minDate}
        onChange={onChange}
        pointing={pointing}
        readOnly={readOnly}
        showOutsideDays={showOutsideDays}
        type={type}
        value={initialValue}
      />
    </Content>
  );
});
