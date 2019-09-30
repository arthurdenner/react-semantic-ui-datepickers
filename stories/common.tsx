import React, { PropsWithChildren } from 'react';

type ContentProps = PropsWithChildren<{
  style?: object;
}>;

export const Content: React.FC<ContentProps> = ({ children, style }) => (
  <div style={{ display: 'flex', flex: 1, justifyContent: 'center', ...style }}>
    {children}
  </div>
);
