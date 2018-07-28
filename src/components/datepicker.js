import React from 'react';
import PropTypes from 'prop-types';
import { formatSelectedDate, moveElementsByN, omit, pick } from '../utils';
import localeEn from '../locales/en-US';
import RangeDatePicker from '../pickers/range';
import SimpleDatePicker from '../pickers/simple';
import Calendar from './calendar';
import Input from './input';

const style = { display: 'inline-block' };
const semanticInputProps = [
  'disabled',
  'error',
  'icon',
  'iconPosition',
  'label',
  'labelPosition',
  'loading',
  'placeholder',
  'size',
  'transparent',
];

class SemanticDatepicker extends React.Component {
  static propTypes = {
    clearable: PropTypes.bool,
    date: PropTypes.instanceOf(Date),
    format: PropTypes.string,
    locale: PropTypes.object,
    onDateChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    selected: PropTypes.oneOfType([
      PropTypes.arrayOf(Date),
      PropTypes.instanceOf(Date),
    ]),
    type: PropTypes.oneOf(['simple', 'range']),
  };

  static defaultProps = {
    clearable: true,
    date: undefined,
    format: 'YYYY-MM-DD',
    locale: localeEn,
    placeholder: null,
    selected: null,
    type: 'simple',
  };

  get isRangeInput() {
    return this.props.type === 'range';
  }

  get initialState() {
    const { format, selected } = this.props;
    const initialSelectedDate = this.isRangeInput ? [] : null;

    return {
      isVisible: false,
      selectedDate: selected || initialSelectedDate,
      selectedDateFormatted: formatSelectedDate(selected, format),
    };
  }

  get dayzedProps() {
    return omit(semanticInputProps, this.props);
  }

  get inputProps() {
    const props = pick(semanticInputProps, this.props);
    const placeholder = props.placeholder || this.props.format;

    return {
      ...props,
      placeholder,
    };
  }

  get date() {
    const { selectedDate } = this.state;
    const { date } = this.props;

    return this.isRangeInput ? selectedDate[0] : selectedDate || date;
  }

  get weekdays() {
    const { firstDayOfWeek } = this.dayzedProps;
    const { weekdays } = this.props.locale;

    return moveElementsByN(firstDayOfWeek, weekdays);
  }

  state = this.initialState;

  Component = this.isRangeInput ? RangeDatePicker : SimpleDatePicker;

  resetState = () => {
    const { onDateChange } = this.props;
    const initialSelectedDate = this.isRangeInput ? [] : null;

    this.setState(
      {
        isVisible: false,
        selectedDate: initialSelectedDate,
        selectedDateFormatted: '',
      },
      () => {
        onDateChange(null);
      }
    );
  };

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

  handleRangeInput = newDates => {
    const { format, onDateChange } = this.props;

    if (!newDates.length) {
      this.resetState();

      return;
    }

    const newState = {
      selectedDate: newDates,
      selectedDateFormatted: formatSelectedDate(newDates, format),
    };

    this.setState(newState, () => {
      onDateChange(newDates);

      if (newDates.length === 2) {
        this.setState({ isVisible: false });
      }
    });
  };

  handleSimpleInput = newDate => {
    const { format, onDateChange } = this.props;

    if (!newDate) {
      this.resetState();

      return;
    }

    const newState = {
      isVisible: false,
      selectedDate: newDate,
      selectedDateFormatted: formatSelectedDate(newDate, format),
    };

    this.setState(newState, () => {
      onDateChange(newDate);
    });
  };

  onDateSelected = (...args) => {
    if (this.isRangeInput) {
      this.handleRangeInput(...args);
    } else {
      this.handleSimpleInput(...args);
    }
  };

  render() {
    const { isVisible, selectedDate, selectedDateFormatted } = this.state;
    const { clearable, locale } = this.props;

    return (
      <div
        style={style}
        ref={el => {
          this.el = el;
        }}
      >
        <Input
          {...this.inputProps}
          isIconClickable={Boolean(clearable && selectedDateFormatted)}
          onClear={this.resetState}
          onClick={this.showCalendar}
          value={selectedDateFormatted}
        />
        {isVisible && (
          <this.Component
            {...this.dayzedProps}
            monthsToDisplay={this.isRangeInput ? 2 : 1}
            onChange={this.onDateSelected}
            selected={selectedDate}
            date={this.date}
          >
            {props => (
              <Calendar
                {...this.dayzedProps}
                {...props}
                {...locale}
                weekdays={this.weekdays}
              />
            )}
          </this.Component>
        )}
      </div>
    );
  }
}

export default SemanticDatepicker;
