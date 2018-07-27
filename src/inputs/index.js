import { Component } from 'react';

class BaseInput extends Component {
  mousedownCb = mousedownEvent => {
    const { isVisible } = this.state;

    if (isVisible && this.el) {
      if (!this.el.contains(mousedownEvent.target)) {
        this.close();
      }
    }
  };

  keydownCb = keydownEvent => {
    const { isVisible } = this.state;
    if (keydownEvent.keyCode === 27 && isVisible) {
      // Escape
      this.close();
    }
  };

  close = () => {
    window.removeEventListener('keydown', this.keydownCb);
    window.removeEventListener('mousedown', this.mousedownCb);

    this.setState({
      isVisible: false,
    });
  };

  showCalendar = event => {
    event.preventDefault();
    window.addEventListener('mousedown', this.mousedownCb);
    window.addEventListener('keydown', this.keydownCb);

    this.setState({
      isVisible: true,
    });
  };
}

export default BaseInput;
