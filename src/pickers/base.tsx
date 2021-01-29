import Dayzed from 'dayzed';
import React from 'react';
import { BaseDatePickerProps } from '../types';
import { getArrowKeyHandlers } from './utils';

class BaseDatePicker extends React.Component<BaseDatePickerProps> {
  state = {
    offset: 0,
  };

  rootNode = React.createRef<HTMLDivElement>();

  handleArrowKeys = getArrowKeyHandlers({
    left: () => this.getKeyOffset(-1),
    right: () => this.getKeyOffset(1),
    up: () => this.getKeyOffset(-7),
    down: () => this.getKeyOffset(7),
  });

  getKeyOffset(number: number) {
    if (!this.rootNode.current) {
      return;
    }

    const activeEl = document.activeElement;
    const buttons = Array.from(
      this.rootNode.current.querySelectorAll<HTMLButtonElement>(
        'button:not(:disabled)'
      )
    );

    buttons.some((btn, i) => {
      const newNodeKey = i + number;

      if (btn !== activeEl) {
        return false;
      }

      if (newNodeKey <= buttons.length - 1 && newNodeKey >= 0) {
        buttons[newNodeKey].focus();
        return true;
      }

      buttons[0].focus();
      return true;
    });
  }

  getRootProps = ({ refKey = 'ref', ...rest } = {}) => {
    return {
      [refKey]: this.rootNode,
      onKeyDown: this.handleArrowKeys,
      ...rest,
    };
  };

  _handleOffsetChanged = (offset: number) => {
    this.setState({
      offset,
    });
  };

  componentDidUpdate(prevProps: BaseDatePickerProps) {
    if (this.props.date !== prevProps.date) {
      this._handleOffsetChanged(0);
    }
  }

  render() {
    const { children, ...rest } = this.props;

    return (
      <Dayzed
        {...rest}
        offset={this.state.offset}
        onOffsetChanged={this._handleOffsetChanged}
        render={(renderProps) =>
          children({
            ...renderProps,
            getRootProps: this.getRootProps,
          })
        }
      />
    );
  }
}

export default BaseDatePicker;
