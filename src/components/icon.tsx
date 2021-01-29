import React from 'react';
import { Icon as SUIIcon } from 'semantic-ui-react';
import { SemanticDatepickerProps } from '../types';
import { keys } from '../utils';

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
  const onKeydown = (evt: KeyboardEvent) => {
    if (evt.keyCode === keys.enter || evt.keyCode === keys.space) {
      onClear();
    }
  };

  if (isClearIconVisible && clearIcon && React.isValidElement(clearIcon)) {
    return React.cloneElement(clearIcon, {
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
        role="button"
        tabIndex="0"
        onClick={onClear}
        onKeyDown={onKeydown}
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
