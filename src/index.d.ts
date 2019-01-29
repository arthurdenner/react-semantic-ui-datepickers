import * as React from 'react';
import { SemanticICONS, SemanticSIZES } from 'semantic-ui-react';

interface Locale {
  todayButton: string;
  nextMonth: string;
  previousMonth: string;
  nextYear: string;
  previousYear: string;
  weekdays: string[];
  months: string[];
}

export interface SemanticDatepickerProps {
  clearable?: boolean;
  date?: Date;
  disabled?: boolean;
  error?: boolean;
  firstDayOfWeek?: number;
  format?: string;
  icon?: SemanticICONS;
  iconPosition?: 'left';
  id?: string;
  keepOpenOnClear?: boolean;
  keepOpenOnSelect?: boolean;
  label?: string;
  loading?: boolean;
  locale?: Locale;
  maxDate?: Date;
  minDate?: Date;
  name?: string;
  onDateChange: (newDate: Date | Date[] | null) => void;
  placeholder?: string;
  selected?: Date | Date[];
  showOutsideDays?: boolean;
  size?: SemanticSIZES;
  transparent?: boolean;
  type: 'basic' | 'range';
}

declare class SemanticDatepicker extends React.Component<
  SemanticDatepickerProps,
  any
> {}

export default SemanticDatepicker;
