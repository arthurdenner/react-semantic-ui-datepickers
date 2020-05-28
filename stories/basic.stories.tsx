import React from 'react';
import { action } from '@storybook/addon-actions';
import { Form } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import SemanticDatepicker from '../src';
import { Content } from './common';

export default {
  title: 'Basic datepicker',
};

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
