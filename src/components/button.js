import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

const CustomButton = ({ content, icon, iconPosition, ...rest }) => (
  <Button basic compact icon style={{ margin: 0 }} {...rest}>
    {iconPosition === 'left' && <Icon name={icon} />}
    <span style={{ margin: '0 5px' }}>{content}</span>
    {iconPosition === 'right' && <Icon name={icon} />}
  </Button>
);

export default CustomButton;
