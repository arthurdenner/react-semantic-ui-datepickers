import React from 'react';
import { storiesOf } from '@storybook/react';
import { Form } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import SemanticDatepicker from '../src';
import localePtBr from '../src/locales/pt-BR';

storiesOf('Examples', module)
  .add('Basic', () => <SemanticDatepicker onDateChange={console.log} />)
  .add('Basic with firstDayOfWeek', () => (
    <SemanticDatepicker firstDayOfWeek={3} onDateChange={console.log} />
  ))
  .add('Basic with outside days', () => (
    <SemanticDatepicker showOutsideDays onDateChange={console.log} />
  ))
  .add('Basic with format prop', () => (
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
  .add('Basic with brazilian portuguese locale', () => (
    <SemanticDatepicker
      onDateChange={console.log}
      format="DD/MM/YYYY"
      locale={localePtBr}
    />
  ))
  .add('Basic as form component', () => (
    <Form>
      <Form.Group width="equals">
        <SemanticDatepicker
          label="Birth date"
          id="birthDate"
          onDateChange={console.log}
        />
        <SemanticDatepicker
          label="Start date"
          id="startDate"
          onDateChange={console.log}
        />
      </Form.Group>
    </Form>
  ));
