import React from 'react';

type ContentProps = {
  style?: object;
};

export const Content: React.FC<ContentProps> = ({ children, style }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      position: 'absolute',
      height: '100%',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      ...style,
    }}
  >
    {children}
  </div>
);

export const onChange = (_: any, data: any) =>
  console.log('[react-semantic-ui-datepickers]\n', data);

export const isWeekday = (date: Date) => ![0, 6].includes(date.getDay());

export * from './data';
