import { FormInputProps } from 'semantic-ui-react';

export type Object = { [key: string]: any };

export type DateFns = string | number | Date;

export type Locale = {
  todayButton: string;
  nextMonth: string;
  previousMonth: string;
  nextYear: string;
  previousYear: string;
  weekdays: string[];
  months: string[];
};

export type PickedDayzedProps = Pick<
  DayzedProps,
  'date' | 'maxDate' | 'minDate' | 'firstDayOfWeek' | 'showOutsideDays'
>;

export type PickedFormInputProps = Pick<
  FormInputProps,
  | 'disabled'
  | 'error'
  | 'icon'
  | 'iconPosition'
  | 'id'
  | 'label'
  | 'loading'
  | 'name'
  | 'placeholder'
  | 'size'
  | 'transparent'
  | 'readOnly'
>;

export type SemanticDatepickerProps = PickedDayzedProps &
  PickedFormInputProps & {
    allowOnlyNumbers: boolean;
    clearOnSameDateClick: boolean;
    clearable: boolean;
    date: Date;
    filterDate: (date: Date) => boolean;
    firstDayOfWeek: number;
    format: string;
    keepOpenOnClear: boolean;
    keepOpenOnSelect: boolean;
    locale: Locale;
    onBlur: (event?: React.SyntheticEvent) => void;
    onDateChange: (date: Date | Date[] | null) => void;
    placeholder: string;
    pointing: 'left' | 'right' | 'top left' | 'top right';
    selected: Date | Date[];
    type: 'basic' | 'range';
  };

export type DayzedProps = {
  children: (children: any) => void;
  date?: Date;
  firstDayOfWeek: number;
  maxDate?: Date;
  minDate?: Date;
  monthsToDisplay: number;
  offset: number;
  onDateSelected: (props: any) => void;
  onOffsetChanged: () => void;
  showOutsideDays: boolean;
};

export type BasicDatePickerProps = DayzedProps & {
  onChange: (date: Date | null) => void;
  selected: Date;
};

export type RangeDatePickerProps = DayzedProps & {
  onChange: (dates: Date[] | null) => void;
  selected: Date[];
};
