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
    <SemanticDatepicker onChange={action('selected date')} />
  </Content>
);

export const withReadOnly = () => (
  <Content>
    <SemanticDatepicker onChange={action('selected date')} readOnly />
  </Content>
);

export const withDatePickerOnly = () => (
  <Content>
    <SemanticDatepicker onChange={action('selected date')} datePickerOnly />
  </Content>
);

export const withoutClearOnSameDateClick = () => (
  <Content>
    <SemanticDatepicker
      onChange={action('selected date')}
      clearOnSameDateClick={false}
    />
  </Content>
);

export const withAllowOnlyNumbers = () => (
  <Content>
    <SemanticDatepicker allowOnlyNumbers onChange={action('selected date')} />
  </Content>
);

export const withFirstDayOfWeek = () => (
  <Content>
    <SemanticDatepicker firstDayOfWeek={3} onChange={action('selected date')} />
  </Content>
);

export const withOutsideDays = () => (
  <Content>
    <SemanticDatepicker showOutsideDays onChange={action('selected date')} />
  </Content>
);

export const withFormatProp = () => (
  <Content>
    <SemanticDatepicker
      format="DD/MM/YYYY"
      onChange={action('selected date')}
    />
  </Content>
);

export const withBrazilianPortugueseLocale = () => (
  <Content>
    <SemanticDatepicker
      onChange={action('selected date')}
      format="DD/MM/YYYY"
      locale="pt-BR"
      value={parse('2018-10-01')}
    />
  </Content>
);

export const withKeepOpenOnSelect = () => (
  <Content>
    <SemanticDatepicker keepOpenOnSelect onChange={action('selected date')} />
  </Content>
);

export const asFormComponent = () => (
  <Content>
    <Form>
      <Form.Group width="equals">
        <SemanticDatepicker
          label="Birth date"
          id="birthDate"
          onChange={action('selected date')}
          required
        />
        <SemanticDatepicker
          label="Start date"
          id="startDate"
          onChange={action('selected date')}
        />
      </Form.Group>
    </Form>
  </Content>
);

export const withLeftPointing = () => (
  <Content>
    <SemanticDatepicker pointing="left" onChange={action('selected date')} />
  </Content>
);

export const withRightPointing = () => (
  <Content>
    <SemanticDatepicker pointing="right" onChange={action('selected date')} />
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
      onChange={action('selected date')}
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
      onChange={action('selected date')}
    />
  </Content>
);

export const withFilterDate = () => (
  <Content>
    <SemanticDatepicker
      filterDate={isWeekday}
      onChange={action('selected date')}
      showOutsideDays
    />
  </Content>
);

export const withFilterDateSettingMaxDate = () => (
  <Content>
    <SemanticDatepicker
      filterDate={isWeekday}
      maxDate={new Date('2019-01-01')}
      onChange={action('selected date')}
      showOutsideDays
    />
  </Content>
);
