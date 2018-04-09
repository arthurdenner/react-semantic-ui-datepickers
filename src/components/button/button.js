import React from 'react';
import { Button } from 'semantic-ui-react';
import './button.css';

const CustomButton = ({ content, icon, iconPosition, ...otherProps }) => (
  <Button basic compact icon={icon} className="clndr-btn" {...otherProps} />
);

export default CustomButton;
