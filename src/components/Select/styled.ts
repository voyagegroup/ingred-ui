import * as React from "react";
import styled, { DefaultTheme, StyledComponent } from "styled-components";
import { components, MenuListComponentProps } from "react-select";
import { addScrollbarProperties } from "../../utils/scrollbar";

export const Container = styled.div<{ minWidth?: string }>`
  min-width: ${({ minWidth }) => minWidth || "auto"};
`;

// MEMO: Add type annotations cause of Error↓
//       The inferred type of 'ReactSelectMenuList' cannot be named without a reference to 'styled-components/node_modules/@types/react'.
//       This is likely not portable. A type annotation is necessary.
export const ReactSelectMenuList: StyledComponent<
  React.FunctionComponent<MenuListComponentProps<any>>,
  DefaultTheme,
  {},
  never
> = styled(components.MenuList)<MenuListComponentProps<any>>`
  ${({ maxHeight }) => addScrollbarProperties({ maxHeight: `${maxHeight}px` })}
`;
