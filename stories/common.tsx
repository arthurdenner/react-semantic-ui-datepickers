import React from 'react';

type ContentProps = {
  style?: object;
};

export const Content: React.FC<ContentProps> = ({ children, style }) => (
  <div
    style={{
      display: 'flex',
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

export * from './data';
