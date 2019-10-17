import React from 'react';
import { action } from '@storybook/addon-actions';
import 'semantic-ui-css/semantic.min.css';
import SemanticDatepicker from '../src';
import { Content } from './common';

export default {
  title: 'Range datepicker',
};

export const simple = () => (
  <Content>
    <SemanticDatepicker type="range" onDateChange={action('selected date')} />
  </Content>
);

export const withRightPointing = () => (
  <Content>
    <SemanticDatepicker
      type="range"
      pointing="right"
      onDateChange={action('selected date')}
    />
  </Content>
);

export const withFirstDayOfWeek = () => (
  <Content>
    <SemanticDatepicker
      type="range"
      firstDayOfWeek={6}
      onDateChange={action('selected date')}
    />
  </Content>
);

export const withOutsideDays = () => (
  <Content>
    <SemanticDatepicker
      type="range"
      showOutsideDays
      onDateChange={action('selected date')}
    />
  </Content>
);

export const withFormatProp = () => (
  <Content>
    <SemanticDatepicker
      type="range"
      format="DD/MM/YYYY"
      onDateChange={action('selected date')}
    />
  </Content>
);

export const withPolishLocale = () => (
  <Content>
    <SemanticDatepicker
      type="range"
      onDateChange={action('selected date')}
      locale="pl-PL"
    />
  </Content>
);
