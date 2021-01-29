import React from 'react';
import { Icon as SUIIcon } from 'semantic-ui-react';
import { SemanticDatepickerProps } from '../types';

type CustomIconProps = {
  clearIcon: SemanticDatepickerProps['clearIcon'];
  icon: SemanticDatepickerProps['icon'];
  isClearIconVisible: boolean;
  onClear: () => void;
};

const CustomIcon = ({
  clearIcon,
  icon,
  isClearIconVisible,
  onClear,
}: CustomIconProps) => {
  if (isClearIconVisible && clearIcon && React.isValidElement(clearIcon)) {
    return React.cloneElement(clearIcon, {
      'data-testid': 'datepicker-icon',
      onClick: onClear,
    });
  }

  if (isClearIconVisible && clearIcon && !React.isValidElement(clearIcon)) {
    return (
      <SUIIcon
        data-testid="datepicker-icon"
        link
        name={clearIcon}
        onClick={onClear}
      />
    );
  }

  if (icon && React.isValidElement(icon)) {
    return React.cloneElement(icon, {
      'data-testid': 'datepicker-icon',
    });
  }

  return <SUIIcon data-testid="datepicker-icon" name={icon} />;
};

export default CustomIcon;
