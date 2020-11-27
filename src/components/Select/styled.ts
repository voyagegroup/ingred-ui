import styled from "styled-components";
import { components, MenuListComponentProps } from "react-select";
import { addScrollbarProperties } from "../../utils/scrollbar";

export const Container = styled.div<{ minWidth?: string }>`
  min-width: ${({ minWidth }) => minWidth || "auto"};
`;

export const ReactSelectMenuList = styled(components.MenuList)<
  MenuListComponentProps<any>
>`
  ${({ maxHeight }) => addScrollbarProperties(`${maxHeight}px`)}
`;
