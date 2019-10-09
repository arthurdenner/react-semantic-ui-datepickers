import React from 'react';
import { Button } from 'semantic-ui-react';
import { ButtonProps } from 'types';

const CustomButton = ({ icon, ...otherProps }: ButtonProps) => (
  <Button basic compact icon={icon} {...otherProps} />
);

export default CustomButton;
