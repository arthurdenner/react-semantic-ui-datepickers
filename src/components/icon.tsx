import React from 'react';
import { Icon as SUIIcon } from 'semantic-ui-react';
import { SemanticDatepickerProps } from '../types';

type CustomIconProps = {
  clearIcon: SemanticDatepickerProps['clearIcon'];
  icon: SemanticDatepickerProps['icon'];
  isClearIconVisible: boolean;
  onClear: () => void;
  onClick: () => void;
};

const CustomIcon = ({
  clearIcon,
  icon,
  isClearIconVisible,
  onClear,
  onClick,
}: CustomIconProps) => {
  if (isClearIconVisible && clearIcon && typeof clearIcon !== 'string') {
    return React.cloneElement(clearIcon, {
      'data-testid': 'datepicker-icon',
      onClick: onClear,
    });
  }

  if (isClearIconVisible && clearIcon && typeof clearIcon === 'string') {
    return (
      <SUIIcon
        data-testid="datepicker-icon"
        link
        name={clearIcon}
        onClick={onClear}
      />
    );
  }

  if (icon && typeof icon !== 'string') {
    return React.cloneElement(icon, {
      'data-testid': 'datepicker-icon',
      onClick,
    });
  }

  return (
    <SUIIcon data-testid="datepicker-icon" link name={icon} onClick={onClick} />
  );
};

CustomIcon.defaultProps = {
  clearIcon: 'close',
  icon: 'calendar',
};

export default CustomIcon;
