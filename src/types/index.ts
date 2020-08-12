import { FormInputProps, SemanticICONS } from 'semantic-ui-react';

export type Object = { [key: string]: any };

export type Locale = {
  todayButton: string;
  nextMonth: string;
  previousMonth: string;
  nextYear: string;
  previousYear: string;
  weekdays: string[];
  months: string[];
};

export type LocaleOptions =
  | 'bg-BG'
  | 'ca-ES'
  | 'cs-CZ'
  | 'de-DE'
  | 'en-US'
  | 'es-ES'
  | 'et-EE'
  | 'fi-FL'
  | 'fr-FR'
  | 'he-IL'
  | 'it-IT'
  | 'ja-JP'
  | 'nb-NO'
  | 'pl-PL'
  | 'pt-BR'
  | 'ru-RU'
  | 'sv-SE'
  | 'tr-TR'
  | 'zh-CN';

export type PickedDayzedProps = Pick<
  DayzedProps,
  'date' | 'maxDate' | 'minDate' | 'firstDayOfWeek' | 'showOutsideDays'
>;

export type PickedFormInputProps = Pick<
  FormInputProps,
  | 'className'
  | 'disabled'
  | 'error'
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
    autoComplete?: string;
    clearOnSameDateClick: boolean;
    clearable: boolean;
    clearIcon?: SemanticICONS | React.ReactElement;
    filterDate: (date: Date) => boolean;
    format: string;
    keepOpenOnClear: boolean;
    keepOpenOnSelect: boolean;
    icon?: SemanticICONS | React.ReactElement;
    inline: boolean;
    locale: LocaleOptions;
    onBlur: (event?: React.SyntheticEvent) => void;
    onChange: (
      event: React.SyntheticEvent | undefined,
      data: SemanticDatepickerProps
    ) => void;
    pointing: 'left' | 'right' | 'top left' | 'top right';
    showToday: boolean;
    type: 'basic' | 'range';
    datePickerOnly: boolean;
    value: DayzedProps['selected'];
  };

export type DayzedProps = {
  children: (children: any) => React.ReactNode;
  date?: Date;
  firstDayOfWeek: number;
  maxDate?: Date;
  minDate?: Date;
  monthsToDisplay: number;
  offset: number;
  onDateSelected: (dateObj: any, event: React.SyntheticEvent) => void;
  onOffsetChanged: () => void;
  selected: Date | Date[] | null;
  showOutsideDays: boolean;
};

export type BasicDatePickerProps = DayzedProps & {
  onChange: (event: React.SyntheticEvent, date: Date | null) => void;
  selected: Date;
};

export type RangeDatePickerProps = DayzedProps & {
  onChange: (event: React.SyntheticEvent, dates: Date[] | null) => void;
  selected: Date[];
};
