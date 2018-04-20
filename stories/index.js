import React from 'react';
import { storiesOf } from '@storybook/react';
import Simple from '../src/inputs/simple';

storiesOf('Examples', module)
  .add('Simple', () => <Simple onDateSelected={alert} />)
  .add('Simple with custom props', () => (
    <Simple format="DD/MM/YYYY" onDateSelected={alert} />
  ));
