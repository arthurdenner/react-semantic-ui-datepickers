import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import './button.css';

const CustomButton = ({ content, icon, iconPosition, ...otherProps }) => (
  <Button basic compact icon className="clndr-btn" {...otherProps}>
    {iconPosition === 'left' && <Icon name={icon} />}
    {content && <span className="clndr-btn-content">{content}</span>}
    {iconPosition === 'right' && <Icon name={icon} />}
  </Button>
);

export default CustomButton;
