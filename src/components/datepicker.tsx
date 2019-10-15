import isValid from 'date-fns/is_valid';
import formatStringByPattern from 'format-string-by-pattern';
import React from 'react';
import isEqual from 'react-fast-compare';
import {
  formatSelectedDate,
  moveElementsByN,
  omit,
  onlyNumbers,
  parseOnBlur,
  pick,
} from '../utils';
import BasicDatePicker from '../pickers/basic';
import RangeDatePicker from '../pickers/range';
import { Locale, SemanticDatepickerProps } from '../types';
import Calendar from './calendar';
import Input from './input';

const style: React.CSSProperties = {
  display: 'inline-block',
  position: 'relative',
};
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
  'readOnly',
];

type SemanticDatepickerState = {
  isVisible: boolean;
  locale: Locale;
  selectedDate: Date | Date[] | null;
  selectedDateFormatted?: string;
  typedValue: string | null;
};

class SemanticDatepicker extends React.Component<
  SemanticDatepickerProps,
  SemanticDatepickerState
> {
  static defaultProps = {
    allowOnlyNumbers: false,
    clearOnSameDateClick: true,
    clearable: true,
    date: undefined,
    filterDate: () => true,
    firstDayOfWeek: 0,
    format: 'YYYY-MM-DD',
    id: undefined,
    keepOpenOnClear: false,
    keepOpenOnSelect: false,
    label: undefined,
    locale: 'en-US',
    name: undefined,
    onBlur: () => {},
    placeholder: null,
    pointing: 'left',
    required: false,
    selected: null,
    showOutsideDays: false,
    type: 'basic',
    readOnly: false,
  };

  el = React.createRef<HTMLDivElement>();

  componentDidUpdate(prevProps: SemanticDatepickerProps) {
    const { locale, selected } = this.props;

    if (!isEqual(selected, prevProps.selected)) {
      this.onDateSelected(selected);
    }

    if (locale !== prevProps.locale) {
      this.setState({ locale: this.locale });
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
      locale: this.locale,
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

  get locale() {
    const { locale } = this.props;

    let localeJson: Locale;

    try {
      localeJson = require(`../locales/${locale}.json`);
    } catch (e) {
      console.warn(`"${locale}" is not a valid locale`);
      localeJson = require('../locales/en-US.json');
    }

    return localeJson;
  }

  get weekdays() {
    const { firstDayOfWeek } = this.dayzedProps;
    const { weekdays } = this.state.locale;

    return moveElementsByN(firstDayOfWeek, weekdays);
  }

  state = this.initialState;

  Component: React.ElementType = this.isRangeInput
    ? RangeDatePicker
    : BasicDatePicker;

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
      if (this.el.current && !this.el.current.contains(mousedownEvent.target)) {
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
    const {
      format,
      keepOpenOnSelect,
      onDateChange,
      clearOnSameDateClick,
    } = this.props;

    if (!newDate) {
      // if clearOnSameDateClick is true (this is the default case)
      // then reset the state. This is what was previously the default
      // behavior, without a specific prop.
      if (clearOnSameDateClick) {
        this.resetState();
      } else {
        // Don't reset the state. Instead, close or keep open the
        // datepicker according to the value of keepOpenOnSelect.
        // Essentially, follow the default behavior of clicking a date
        // but without changing the value in state.
        this.setState({
          isVisible: keepOpenOnSelect,
        });
      }
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

  handleBlur = (event?: React.SyntheticEvent) => {
    const { format, onBlur } = this.props;
    const { typedValue } = this.state;

    onBlur(event);

    if (!typedValue) {
      return;
    }

    const parsedValue = parseOnBlur(
      String(typedValue),
      format,
      this.isRangeInput
    );

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

  handleChange = (_evt, { value }) => {
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

  onDateSelected = dateOrDates => {
    if (this.isRangeInput) {
      this.handleRangeInput(dateOrDates);
    } else {
      this.handleBasicInput(dateOrDates);
    }
  };

  render() {
    const {
      isVisible,
      locale,
      selectedDate,
      selectedDateFormatted,
      typedValue,
    } = this.state;
    const { clearable, pointing, filterDate, readOnly } = this.props;

    return (
      <div className="field" style={style} ref={this.el}>
        <Input
          {...this.inputProps}
          isClearIconVisible={Boolean(clearable && selectedDateFormatted)}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          onClear={this.resetState}
          onClick={readOnly ? null : this.showCalendar}
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
