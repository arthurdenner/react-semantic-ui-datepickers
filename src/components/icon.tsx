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
  if (isClearIconVisible && clearIcon && React.isValidElement(clearIcon)) {
    return React.cloneElement<any>(clearIcon, {
      'data-testid': 'datepicker-clear-icon',
      onClick: onClear,
    });
  }

  if (isClearIconVisible && clearIcon && !React.isValidElement(clearIcon)) {
    return (
      <SUIIcon
        aria-pressed="false"
        data-testid="datepicker-clear-icon"
        link
        name={clearIcon}
        onClick={onClear}
      />
    );
  }

  if (icon && React.isValidElement(icon)) {
    return React.cloneElement<any>(icon, {
      'data-testid': 'datepicker-icon',
      onClick,
    });
  }

  return <SUIIcon data-testid="datepicker-icon" name={icon} />;
};

export default CustomIcon;
