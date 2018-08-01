import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'react-fast-compare';
import { formatSelectedDate, moveElementsByN, omit, pick } from '../utils';
import localeEn from '../locales/en-US';
import BasicDatePicker from '../pickers/basic';
import RangeDatePicker from '../pickers/range';
import Calendar from './calendar';
import Input from './input';

const style = { display: 'inline-block', position: 'relative' };
const semanticInputProps = [
  'disabled',
  'error',
  'icon',
  'iconPosition',
  'id',
  'label',
  'loading',
  'name',
  'placeholder',
  'size',
  'transparent',
];

class SemanticDatepicker extends React.Component {
  static propTypes = {
    clearable: PropTypes.bool,
    date: PropTypes.instanceOf(Date),
    firstDayOfWeek: PropTypes.number,
    format: PropTypes.string,
    keepOpenOnClear: PropTypes.bool,
    keepOpenOnSelect: PropTypes.bool,
    locale: PropTypes.object,
    onDateChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    selected: PropTypes.oneOfType([
      PropTypes.arrayOf(Date),
      PropTypes.instanceOf(Date),
    ]),
    type: PropTypes.oneOf(['basic', 'range']),
    pointing: PropTypes.oneOf(['left', 'right']),
  };

  static defaultProps = {
    pointing: 'left',
    clearable: true,
    keepOpenOnClear: false,
    keepOpenOnSelect: false,
    date: undefined,
    firstDayOfWeek: 0,
    format: 'YYYY-MM-DD',
    locale: localeEn,
    placeholder: null,
    selected: null,
    type: 'basic',
  };

  componentDidUpdate(prevProps) {
    const { selected } = this.props;

    if (!isEqual(selected, prevProps.selected)) {
      this.onDateSelected(selected);
    }
  }

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

  Component = this.isRangeInput ? RangeDatePicker : BasicDatePicker;

  resetState = () => {
    const { keepOpenOnClear, onDateChange } = this.props;
    const newState = {
      isVisible: keepOpenOnClear,
      selectedDate: this.isRangeInput ? [] : null,
      selectedDateFormatted: '',
    };

    this.setState(newState, () => {
      onDateChange(null);
    });
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
    const { format, keepOpenOnSelect, onDateChange } = this.props;

    if (!newDates || !newDates.length) {
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
        this.setState({ isVisible: keepOpenOnSelect });
      }
    });
  };

  handleBasicInput = newDate => {
    const { format, keepOpenOnSelect, onDateChange } = this.props;

    if (!newDate) {
      this.resetState();

      return;
    }

    const newState = {
      isVisible: keepOpenOnSelect,
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
      this.handleBasicInput(...args);
    }
  };

  render() {
    const { isVisible, selectedDate, selectedDateFormatted } = this.state;
    const { clearable, locale, pointing } = this.props;

    return (
      <div
        className="field"
        style={style}
        ref={el => {
          this.el = el;
        }}
      >
        <Input
          {...this.inputProps}
          isClearIconVisible={Boolean(clearable && selectedDateFormatted)}
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
            {props => {
              console.log(props);

              return (
                <Calendar
                  {...this.dayzedProps}
                  {...props}
                  {...locale}
                  pointing={pointing}
                  weekdays={this.weekdays}
                />
              );
            }}
          </this.Component>
        )}
      </div>
    );
  }
}

export default SemanticDatepicker;
