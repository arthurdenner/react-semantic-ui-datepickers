import React from 'react';
import {
  withKnobs,
  boolean,
  number,
  select,
  text,
} from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
// import { Form } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import SemanticDatepicker from '../src';
import { Content, localeMap, onChange, pointingMap, typeMap } from './common';
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
  const keepOpenOnSelect = boolean('Keep open on select', false);
  const locale = select('Locale', localeMap, localeMap['en-US']);
  const pointing = select('Pointing', pointingMap, pointingMap.left);
  const readOnly = boolean('Read-only', false);
  const showOutsideDays = boolean('Show outside days', false);
  const key = type + format;

  return (
    <Content>
      <SemanticDatepicker
        key={key}
        allowOnlyNumbers={allowOnlyNumbers}
        clearOnSameDateClick={clearOnSameDateClick}
        datePickerOnly={datePickerOnly}
        firstDayOfWeek={firstDayOfWeek}
        format={format}
        keepOpenOnSelect={keepOpenOnSelect}
        locale={locale}
        onChange={onChange}
        pointing={pointing}
        readOnly={readOnly}
        showOutsideDays={showOutsideDays}
        type={type}
      />
    </Content>
  );
});
