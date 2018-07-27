import React from 'react';
import { storiesOf } from '@storybook/react';
import SemanticDatepicker from '../src';

const brazilianMonths = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

const brazilianWeek = [
  'Domingo',
  'Segunda',
  'Terça',
  'Quarta',
  'Quinta',
  'Sexta',
  'Sábado',
];

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
  .add('Simple with brazilian labels', () => (
    <SemanticDatepicker
      onDateChange={console.log}
      format="DD/MM/YYYY"
      monthNames={brazilianMonths}
      todayButtonText="Hoje"
      weekdayNames={brazilianWeek}
    />
  ));
