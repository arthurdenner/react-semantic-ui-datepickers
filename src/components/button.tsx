import { Button, ButtonProps } from 'semantic-ui-react';

const CustomButton = ({ icon, ...otherProps }: ButtonProps) => (
  <Button basic compact icon={icon} {...otherProps} />
);

export default CustomButton;
