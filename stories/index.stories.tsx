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
import { Form, SemanticICONS } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import SemanticDatepicker from '../src';
import {
  Content,
  iconMap,
  isWeekday,
  localeMap,
  onChange,
  pointingMap,
  typeMap,
} from './common';

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

export default { title: 'Datepickers' };

export const basicUsage = () => {
  const type = select('Type', typeMap, typeMap.basic);
  const inline = boolean('Inline (without input)', false);
  const allowOnlyNumbers = boolean('Allow only numbers', false);
  const clearOnSameDateClick = boolean('Clear on same date click', true);
  const showToday = boolean('Show Today button', true);
  const clearable = boolean('Clearable', true);
  const icon = select('Icon (without value)', iconMap, iconMap.calendar);
  const clearIcon = select('Clear icon (with value)', iconMap, iconMap.close);
  const iconOnLeft = boolean('Icon on the left', false);
  const datePickerOnly = boolean('Datepicker only', false);
  const firstDayOfWeek = number('First day of week', 0, { max: 6, min: 0 });
  const format = text('Format', 'YYYY-MM-DD');
  const keepOpenOnClear = boolean('Keep open on clear', false);
  const keepOpenOnSelect = boolean('Keep open on select', false);
  const locale = select('Locale', localeMap, localeMap['en-US']);
  const pointing = select('Pointing', pointingMap, pointingMap.left);
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
        clearIcon={clearIcon}
        clearOnSameDateClick={clearOnSameDateClick}
        clearable={clearable}
        datePickerOnly={datePickerOnly}
        filterDate={filterDate}
        firstDayOfWeek={firstDayOfWeek}
        format={format}
        icon={icon}
        iconPosition={iconOnLeft ? 'left' : undefined}
        inline={inline}
        keepOpenOnClear={keepOpenOnClear}
        keepOpenOnSelect={keepOpenOnSelect}
        locale={locale}
        maxDate={maxDate}
        minDate={minDate}
        onChange={onChange}
        pointing={pointing}
        readOnly={readOnly}
        showToday={showToday}
        showOutsideDays={showOutsideDays}
        type={type}
        value={initialValue}
      />
    </Content>
  );
};

export const withCustomIcons = () => {
  const icon = select('Icon (without value)', iconMap, iconMap.calendar);
  const clearIcon = select('Clear icon (with value)', iconMap, iconMap.close);
  const useCustomIcon = boolean('Custom icon', false);
  const useCustomClearIcon = boolean('Custom clear icon', false);
  const CustomIcon = (props: any) => <button {...props}>Select</button>;
  const CustomClearIcon = (props: any) => <button {...props}>Reset</button>;
  const x = useCustomIcon ? ((<CustomIcon />) as unknown) : icon;
  const y = useCustomClearIcon ? ((<CustomClearIcon />) as unknown) : clearIcon;

  return (
    <Content>
      <SemanticDatepicker
        clearIcon={y as SemanticICONS | React.ReactElement}
        icon={x as SemanticICONS | React.ReactElement}
      />
    </Content>
  );
};

export const usageWithForm = () => {
  return (
    <Content>
      <Form>
        <Form.Group width="equals">
          <SemanticDatepicker
            label="Initial date"
            id="initialDate"
            onChange={onChange}
            required
          />
          <SemanticDatepicker
            label="Final date"
            id="finalDate"
            onChange={onChange}
          />
        </Form.Group>
      </Form>
    </Content>
  );
};
