import Dayzed from 'dayzed';
import React from 'react';
import { DayzedProps } from '../types';
import { getArrowKeyHandlers } from './utils';

class BaseDatePicker extends React.Component<DayzedProps> {
  state = {
    offset: 0,
  };

  rootNode = React.createRef<HTMLElement>();

  handleArrowKeys = getArrowKeyHandlers({
    left: () => {
      this.getKeyOffset(-1);
    },
    right: () => {
      this.getKeyOffset(1);
    },
    up: () => {
      this.getKeyOffset(-7);
    },
    down: () => {
      this.getKeyOffset(7);
    },
  });

  getKeyOffset(number) {
    if (!this.rootNode.current) {
      return;
    }

    const e = document.activeElement;
    const buttons = this.rootNode.current.querySelectorAll('button');
    buttons.forEach((el, i) => {
      const newNodeKey = i + number;
      if (el === e) {
        if (newNodeKey <= buttons.length - 1 && newNodeKey >= 0) {
          buttons[newNodeKey].focus();
        } else {
          buttons[0].focus();
        }
      }
    });
  }

  setRootNode = ref => {
    this.rootNode = ref;
  };

  getRootProps = ({ refKey = 'ref', ...rest } = {}) => {
    return {
      [refKey]: this.setRootNode,
      onKeyDown: this.handleArrowKeys,
      ...rest,
    };
  };

  _handleOffsetChanged = offset => {
    this.setState({
      offset,
    });
  };

  componentDidUpdate(prevProps) {
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
        render={renderProps =>
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
