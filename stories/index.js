import React from 'react';
import { storiesOf } from '@storybook/react';
import 'semantic-ui-css/semantic.min.css';
import SemanticDatepicker from '../src';
import localePtBr from '../src/locales/pt-BR';

storiesOf('Examples', module)
  .add('Simple', () => <SemanticDatepicker onDateChange={console.log} />)
  .add('Simple with firstDayOfWeek', () => (
    <SemanticDatepicker firstDayOfWeek={3} onDateChange={console.log} />
  ))
  .add('Simple with outside days', () => (
    <SemanticDatepicker showOutsideDays onDateChange={console.log} />
  ))
  .add('Simple with format prop', () => (
    <SemanticDatepicker format="DD/MM/YYYY" onDateChange={console.log} />
  ))
  .add('Range', () => (
    <SemanticDatepicker type="range" onDateChange={console.log} />
  ))
  .add('Range with firstDayOfWeek', () => (
    <SemanticDatepicker
      type="range"
      firstDayOfWeek={6}
      onDateChange={console.log}
    />
  ))
  .add('Range with outside days', () => (
    <SemanticDatepicker
      type="range"
      showOutsideDays
      onDateChange={console.log}
    />
  ))
  .add('Range with format prop', () => (
    <SemanticDatepicker
      type="range"
      format="DD/MM/YYYY"
      onDateChange={console.log}
    />
  ))
  .add('Simple with brazilian portuguese locale', () => (
    <SemanticDatepicker
      onDateChange={console.log}
      format="DD/MM/YYYY"
      locale={localePtBr}
    />
  ));
