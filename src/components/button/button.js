import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import './button.css';

const CustomButton = ({ icon, ...otherProps }) => (
  <Button basic compact icon={icon} className="clndr-btn" {...otherProps} />
);

CustomButton.propTypes = {
  icon: PropTypes.string.isRequired,
};

export default CustomButton;
