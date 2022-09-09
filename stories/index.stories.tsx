import React from 'react';
import { Form, SemanticICONS, Table } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import SemanticDatepicker from '../src';
import * as locales from '../src/locales';
import { SemanticDatepickerProps } from '../src/types';
import {
  Content,
  iconMap,
  isWeekday,
  onChange,
  pointing,
  pointingMap,
  typeMap,
  types,
} from './common';

const index = {
  title: 'Datepickers',
  parameters: { options: { panelPosition: 'right' } },
};
export default index;

export const basicUsage = (
  props: SemanticDatepickerProps & {
    iconOnLeft: boolean;
    onlyWeekdays: boolean;
    controlValue: boolean;
    initialValue: Date;
    finalValue: Date;
  }
) => {
  const {
    type,
    inline,
    allowOnlyNumbers,
    clearOnSameDateClick,
    showToday,
    clearable,
    icon,
    clearIcon,
    iconOnLeft,
    datePickerOnly,
    firstDayOfWeek,
    format,
    keepOpenOnClear,
    keepOpenOnSelect,
    locale,
    pointing,
    readOnly,
    showOutsideDays,
    minDate,
    maxDate,
    onlyWeekdays,
    controlValue,
    error,
    initialValue: initialValueProps,
    finalValue,
  } = props;

  const initialValue = controlValue
    ? type === 'basic'
      ? new Date(initialValueProps)
      : [new Date(initialValueProps), new Date(finalValue)]
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
        error={error}
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

basicUsage.args = {
  type: typeMap.basic,
  inline: false,
  allowOnlyNumbers: false,
  clearOnSameDateClick: true,
  showToday: true,
  clearable: true,
  icon: iconMap.calendar,
  clearIcon: iconMap.close,
  iconOnLeft: false,
  datePickerOnly: false,
  firstDayOfWeek: 0,
  format: 'YYYY-MM-DD',
  keepOpenOnClear: false,
  keepOpenOnSelect: false,
  locale: locales.enUS,
  pointing: pointingMap.left,
  readOnly: false,
  showOutsideDays: false,
  minDate: new Date('2018-01-01'),
  maxDate: new Date('2030-01-01'),
  onlyWeekdays: false,
  controlValue: false,
  error: false,
};

basicUsage.argTypes = {
  type: {
    name: 'Type',
    options: types,
    mapping: typeMap,
    control: 'select',
  },
  inline: { name: 'Inline (without input)', control: 'boolean' },
  allowOnlyNumbers: { name: 'Allow only numbers', control: 'boolean' },
  clearOnSameDateClick: {
    name: 'Clear on same date click',
    control: 'boolean',
  },
  showToday: { name: 'Show Today button', control: 'boolean' },
  clearable: { name: 'Clearable', control: 'boolean' },
  icon: {
    name: 'Icon (without value)',
    options: Object.keys(iconMap),
    mapping: iconMap,
    control: 'select',
  },
  clearIcon: {
    name: 'Clear icon (with value)',
    options: Object.keys(iconMap),
    mapping: iconMap,
    control: 'select',
  },
  iconOnLeft: { name: 'Icon on the left', control: 'boolean' },
  datePickerOnly: { name: 'Datepicker only', control: 'boolean' },
  firstDayOfWeek: {
    name: 'First day of week',
    control: { type: 'number', min: 0, max: 6 },
  },
  format: {
    name: 'Format',
    control: 'text',
  },
  keepOpenOnClear: {
    name: 'Keep open on clear',
    control: 'boolean',
  },
  keepOpenOnSelect: {
    name: 'Keep open on select',
    control: 'boolean',
  },
  locale: {
    name: 'Locale',
    options: Object.keys(locales).sort(),
    mapping: locales,
    control: 'select',
  },
  pointing: {
    name: 'Pointing',
    options: pointing,
    mapping: pointingMap,
    control: 'select',
  },
  readOnly: {
    name: 'Read-only',
    control: 'boolean',
  },

  showOutsideDays: {
    name: 'Show outside days',
    control: 'boolean',
  },
  minDate: {
    name: 'Min date',
    control: 'date',
  },
  maxDate: {
    name: 'Max date',
    control: 'date',
  },
  onlyWeekdays: {
    name: 'Only weekdays (filterDate example)',
    control: 'boolean',
  },
  controlValue: {
    name: 'Control value',
    control: 'boolean',
  },
  error: {
    name: 'Error state',
    control: 'boolean',
  },
  initialValue: {
    name: 'Initial value',
    control: 'date',
  },
  finalValue: {
    name: 'Final value',
    control: 'date',
  },
};

export const withCustomIcons = (
  props: Pick<SemanticDatepickerProps, 'icon' | 'clearIcon'> & {
    useCustomIcon: boolean;
    useCustomClearIcon: boolean;
  }
) => {
  const { icon, clearIcon, useCustomIcon, useCustomClearIcon } = props;

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

withCustomIcons.args = {
  icon: iconMap.calendar,
  clearIcon: iconMap.close,
  useCustomIcon: false,
  useCustomClearIcon: false,
};

withCustomIcons.argTypes = {
  icon: {
    name: 'Icon (without value)',
    options: Object.keys(iconMap),
    mapping: iconMap,
    control: 'select',
  },
  clearIcon: {
    name: 'Clear icon (with value)',
    options: Object.keys(iconMap),
    mapping: iconMap,
    control: 'select',
  },
  useCustomIcon: {
    name: 'Custom icon',
    control: 'boolean',
  },
  useCustomClearIcon: {
    name: 'Custom clear icon',
    control: 'boolean',
  },
};

export const usageWithForm = (
  props: Pick<SemanticDatepickerProps, 'error'>
) => {
  const { error } = props;

  return (
    <Content>
      <Form>
        <Form.Group width="equals">
          <SemanticDatepicker
            error={error}
            label="Initial date"
            id="initialDate"
            onChange={onChange}
            required
          />
          <SemanticDatepicker
            error={error}
            label="Final date"
            id="finalDate"
            onChange={onChange}
          />
        </Form.Group>
      </Form>
    </Content>
  );
};

usageWithForm.args = {
  error: false,
};

usageWithForm.argTypes = {
  error: {
    name: 'Error state',
    control: 'boolean',
  },
};

export const inverted = (props: Pick<SemanticDatepickerProps, 'type'>) => {
  const { type } = props;

  return (
    <Content style={{ padding: 20 }}>
      <Table inverted style={{ margin: 20, padding: 20 }}>
        <SemanticDatepicker inverted onChange={onChange} type={type} />
      </Table>
    </Content>
  );
};

inverted.args = {
  type: typeMap.basic,
};

inverted.argTypes = {
  type: {
    name: 'Type',
    options: types,
    mapping: typeMap,
    control: 'select',
  },
};
