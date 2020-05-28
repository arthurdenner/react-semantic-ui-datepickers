import React from 'react';
import { action } from '@storybook/addon-actions';
import { Form } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import SemanticDatepicker from '../src';
import { Content } from './common';
import { parseISO } from 'date-fns';

const isWeekday = (date: Date) => {
  const day = date.getDay();

  return day !== 0 && day !== 6;
};

export default {
  title: 'Basic datepicker',
};

export const withBrazilianPortugueseLocale = () => (
  <Content>
    <SemanticDatepicker
      onChange={action('selected date')}
      format="DD/MM/YYYY"
      locale="pt-BR"
      value={parseISO('2018-10-01')}
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
