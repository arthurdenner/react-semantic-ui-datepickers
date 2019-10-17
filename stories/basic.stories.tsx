import React from 'react';
import { action } from '@storybook/addon-actions';
import parse from 'date-fns/parse';
import { Form } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import SemanticDatepicker from '../src';
import { Content } from './common';

const isWeekday = date => {
  const day = date.getDay();

  return day !== 0 && day !== 6;
};

export default {
  title: 'Basic datepicker',
};

export const simple = () => (
  <Content>
    <SemanticDatepicker onDateChange={action('selected date')} />
  </Content>
);

export const withReadOnly = () => (
  <Content>
    <SemanticDatepicker onDateChange={action('selected date')} readOnly />
  </Content>
);

export const withoutClearOnSameDateClick = () => (
  <Content>
    <SemanticDatepicker
      onDateChange={action('selected date')}
      clearOnSameDateClick={false}
    />
  </Content>
);

export const withAllowOnlyNumbers = () => (
  <Content>
    <SemanticDatepicker
      allowOnlyNumbers
      onDateChange={action('selected date')}
    />
  </Content>
);

export const withFirstDayOfWeek = () => (
  <Content>
    <SemanticDatepicker
      firstDayOfWeek={3}
      onDateChange={action('selected date')}
    />
  </Content>
);

export const withOutsideDays = () => (
  <Content>
    <SemanticDatepicker
      showOutsideDays
      onDateChange={action('selected date')}
    />
  </Content>
);

export const withFormatProp = () => (
  <Content>
    <SemanticDatepicker
      format="DD/MM/YYYY"
      onDateChange={action('selected date')}
    />
  </Content>
);

export const withBrazilianPortugueseLocale = () => (
  <Content>
    <SemanticDatepicker
      onDateChange={action('selected date')}
      format="DD/MM/YYYY"
      locale="pt-BR"
      selected={parse('2018-10-01')}
    />
  </Content>
);

export const withKeepOpenOnSelect = () => (
  <Content>
    <SemanticDatepicker
      keepOpenOnSelect
      onDateChange={action('selected date')}
    />
  </Content>
);

export const asFormComponent = () => (
  <Content>
    <Form>
      <Form.Group width="equals">
        <SemanticDatepicker
          label="Birth date"
          id="birthDate"
          onDateChange={action('selected date')}
          required
        />
        <SemanticDatepicker
          label="Start date"
          id="startDate"
          onDateChange={action('selected date')}
        />
      </Form.Group>
    </Form>
  </Content>
);

export const withLeftPointing = () => (
  <Content>
    <SemanticDatepicker
      pointing="left"
      onDateChange={action('selected date')}
    />
  </Content>
);

export const withRightPointing = () => (
  <Content>
    <SemanticDatepicker
      pointing="right"
      onDateChange={action('selected date')}
    />
  </Content>
);

export const withTopLeftPointing = () => (
  <Content
    style={{
      alignItems: 'flex-end',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      top: 0,
    }}
  >
    <SemanticDatepicker
      pointing="top left"
      onDateChange={action('selected date')}
    />
  </Content>
);

export const withTopRightPointing = () => (
  <Content
    style={{
      alignItems: 'flex-end',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      top: 0,
    }}
  >
    <SemanticDatepicker
      pointing="top right"
      onDateChange={action('selected date')}
    />
  </Content>
);

export const withFilterDate = () => (
  <Content>
    <SemanticDatepicker
      filterDate={isWeekday}
      onDateChange={action('selected date')}
      showOutsideDays
    />
  </Content>
);

export const withFilterDateSettingMaxDate = () => (
  <Content>
    <SemanticDatepicker
      filterDate={isWeekday}
      maxDate={new Date('2019-01-01')}
      onDateChange={action('selected date')}
      showOutsideDays
    />
  </Content>
);
