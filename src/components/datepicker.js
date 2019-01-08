import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'react-fast-compare';
import isValid from 'date-fns/is_valid';
import formatStringByPattern from 'format-string-by-pattern';
import {
  formatSelectedDate,
  moveElementsByN,
  omit,
  onlyNumbers,
  parseOnBlur,
  pick,
} from '../utils';
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
  'onBlur',
  'onChange',
  'onClick',
  'onContextMenu',
  'onDoubleClick',
  'onFocus',
  'onInput',
  'onKeyDown',
  'onKeyPress',
  'onKeyUp',
  'onMouseDown',
  'onMouseEnter',
  'onMouseLeave',
  'onMouseMove',
  'onMouseOut',
  'onMouseOver',
  'onMouseUp',
  'placeholder',
  'required',
  'size',
  'transparent',
];

class SemanticDatepicker extends React.Component {
  static propTypes = {
    allowOnlyNumbers: PropTypes.bool,
    clearable: PropTypes.bool,
    date: PropTypes.instanceOf(Date),
    firstDayOfWeek: PropTypes.number,
    format: PropTypes.string,
    keepOpenOnClear: PropTypes.bool,
    keepOpenOnSelect: PropTypes.bool,
    locale: PropTypes.object,
    onBlur: PropTypes.func,
    onDateChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    selected: PropTypes.oneOfType([
      PropTypes.arrayOf(Date),
      PropTypes.instanceOf(Date),
    ]),
    type: PropTypes.oneOf(['basic', 'range']),
    pointing: PropTypes.oneOf(['left', 'right', 'top left', 'top right']),
    filterDate: PropTypes.func,
  };

  static defaultProps = {
    allowOnlyNumbers: false,
    clearable: true,
    date: undefined,
    filterDate: () => true,
    firstDayOfWeek: 0,
    format: 'YYYY-MM-DD',
    keepOpenOnClear: false,
    keepOpenOnSelect: false,
    locale: localeEn,
    onBlur: () => {},
    placeholder: null,
    pointing: 'left',
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
      typedValue: null,
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
      typedValue: null,
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
      typedValue: null,
    };

    this.setState(newState, () => {
      onDateChange(newDate);
    });
  };

  handleBlur = event => {
    const { format, onBlur } = this.props;
    const { typedValue } = this.state;

    onBlur(event);

    if (!typedValue) {
      return;
    }

    const parsedValue = parseOnBlur(typedValue, format, this.isRangeInput);

    if (this.isRangeInput) {
      const areDatesValid = parsedValue.every(isValid);

      if (areDatesValid) {
        this.handleRangeInput(parsedValue);
        return;
      }
    } else {
      const isDateValid = isValid(parsedValue);

      if (isDateValid) {
        this.handleBasicInput(parsedValue);
        return;
      }
    }

    this.setState({ typedValue: null });
  };

  handleChange = (evt, { value }) => {
    const { allowOnlyNumbers, format, onDateChange } = this.props;
    const formatString = this.isRangeInput ? `${format} - ${format}` : format;
    const typedValue = allowOnlyNumbers ? onlyNumbers(value) : value;

    if (!typedValue) {
      const newState = {
        selectedDate: this.isRangeInput ? [] : null,
        selectedDateFormatted: '',
        typedValue: null,
      };

      this.setState(newState, () => {
        onDateChange(null);
      });

      return;
    }

    this.setState({
      selectedDate: this.isRangeInput ? [] : null,
      selectedDateFormatted: '',
      typedValue: formatStringByPattern(formatString, typedValue),
    });
  };

  handleKeyDown = evt => {
    // If the Enter key was pressed...
    if (evt.keyCode === 13) {
      this.handleBlur();
    }
  };

  onDateSelected = (...args) => {
    if (this.isRangeInput) {
      this.handleRangeInput(...args);
    } else {
      this.handleBasicInput(...args);
    }
  };

  render() {
    const {
      isVisible,
      selectedDate,
      selectedDateFormatted,
      typedValue,
    } = this.state;
    const { clearable, locale, pointing, filterDate } = this.props;

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
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          onClear={this.resetState}
          onClick={this.showCalendar}
          onKeyDown={this.handleKeyDown}
          value={typedValue || selectedDateFormatted}
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
                filterDate={filterDate}
                pointing={pointing}
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
