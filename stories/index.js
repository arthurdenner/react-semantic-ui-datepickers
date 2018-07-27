import React from 'react';
import { storiesOf } from '@storybook/react';
import Range from '../src/inputs/range';
import Simple from '../src/inputs/simple';

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
  .add('Simple', () => <Simple onDateChange={console.log} />)
  .add('Simple with firstDayOfWeek', () => (
    <Simple firstDayOfWeek={3} onDateChange={console.log} />
  ))
  .add('Simple with outside days', () => (
    <Simple showOutsideDays onDateChange={console.log} />
  ))
  .add('Simple with format prop', () => (
    <Simple format="DD/MM/YYYY" onDateChange={console.log} />
  ))
  .add('Range', () => <Range onDateChange={console.log} />)
  .add('Range with firstDayOfWeek', () => (
    <Range firstDayOfWeek={6} onDateChange={console.log} />
  ))
  .add('Range with outside days', () => (
    <Range showOutsideDays onDateChange={console.log} />
  ))
  .add('Range with format prop', () => (
    <Range format="DD/MM/YYYY" onDateChange={console.log} />
  ))
  .add('Simple with brazilian labels', () => (
    <Simple
      onDateChange={console.log}
      monthNames={brazilianMonths}
      weekdayNames={brazilianWeek}
    />
  ));
