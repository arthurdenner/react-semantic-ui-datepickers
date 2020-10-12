import React from 'react';
import { boolean, date, number, select, text } from '@storybook/addon-knobs';
import { Form, SemanticICONS, Table } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import SemanticDatepicker from '../src';
import { SemanticDatepickerProps } from '../src/types';
import {
  Content,
  iconMap,
  isWeekday,
  localeMap,
  onChange,
  pointingMap,
  typeMap,
} from './common';

export default {
  title: 'Datepickers',
  parameters: {
    options: { panelPosition: 'right' },
  },
};

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
  const firstDayOfWeek = number('First day of week', 0, {
    max: 6,
    min: 0,
  }) as SemanticDatepickerProps['firstDayOfWeek'];
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

export const usageWithForm = () => (
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

export const inverted = () => {
  const type = select('Type', typeMap, typeMap.basic);

  return (
    <Content style={{ padding: 20 }}>
      <Table inverted style={{ margin: 20, padding: 20 }}>
        <SemanticDatepicker inverted onChange={onChange} type={type} />
      </Table>
    </Content>
  );
};
