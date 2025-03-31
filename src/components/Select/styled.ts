import styled from "styled-components";
import { components, MenuListProps } from "react-select";
import { addScrollbarProperties } from "../../utils/scrollbar";
import { OptionType } from "./Select";

export const Container = styled.div<{
  minWidth?: string;
  isDisabled?: boolean;
}>`
  min-width: ${({ minWidth }) => minWidth || "auto"};
  cursor: ${({ isDisabled }) => (isDisabled ? "not-allowed" : "auto")};
`;

export const ReactSelectMenuList = styled(
  components.MenuList as React.ComponentType<
    MenuListProps<OptionType<any>, boolean>
  >,
)<MenuListProps<OptionType<any>, boolean> & { children?: React.ReactNode }>`
  ${({ maxHeight }) => addScrollbarProperties({ maxHeight: `${maxHeight}px` })}
`;
