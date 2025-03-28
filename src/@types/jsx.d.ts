import React from 'react';

declare global {
  namespace JSX {
    type Element = React.ReactElement<any, any>;
    type ElementClass = React.Component<any> & {
      render(): React.ReactNode;
    };
    type ElementAttributesProperty = {
      props: {};
    };
    type ElementChildrenAttribute = {
      children: {};
    };
    type IntrinsicElements = {
      [elemName: string]: any;
    };
  }
}
