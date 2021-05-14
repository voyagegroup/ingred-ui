import styled from "styled-components";
import { components, MenuListComponentProps } from "react-select";
import { addScrollbarProperties } from "../../utils/scrollbar";
import { SelectComponents } from "react-select/src/components";
import { OptionType } from "./Select";

export const Container = styled.div<{
  minWidth?: string;
  isDisabled?: boolean;
}>`
  min-width: ${({ minWidth }) => minWidth || "auto"};
  cursor: ${({ isDisabled }) => (isDisabled ? "not-allowed" : "auto")};
`;

export const ReactSelectMenuList: SelectComponents<
  OptionType<any>,
  boolean
>["MenuList"] = styled(components.MenuList)<
  MenuListComponentProps<OptionType<any>, boolean>
>`
  ${({ maxHeight }) => addScrollbarProperties({ maxHeight: `${maxHeight}px` })}
`;
