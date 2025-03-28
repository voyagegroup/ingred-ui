import 'styled-components';
import React from 'react';

declare module 'styled-components' {
  export type StyledComponentBase<
    _C extends React.ComponentType<any> | keyof JSX.IntrinsicElements,
    _T extends object,
    _O extends object = {},
    _A extends keyof any = never
  > = {
    children?: React.ReactNode;
  }
}
