import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';

const CustomButton = ({ icon, ...otherProps }) => (
  <Button basic compact icon={icon} {...otherProps} />
);

CustomButton.propTypes = {
  icon: PropTypes.string.isRequired,
};

export default CustomButton;
