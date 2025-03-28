import 'styled-components';
import React from 'react';

declare module 'styled-components' {
  export interface StyledComponentBase<
    C extends React.ComponentType<any> | keyof JSX.IntrinsicElements,
    T extends object,
    O extends object = {},
    A extends keyof any = never
  > {
    children?: React.ReactNode;
  }
}
