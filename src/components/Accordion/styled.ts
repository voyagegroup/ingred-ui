import Flex from "../Flex";
import styled from "styled-components";

export const AccordionTitle = styled(Flex)<{
  expanded: boolean;
  disabled?: boolean;
}>`
  background-color: ${({ expanded, disabled, theme }) =>
    // eslint-disable-next-line no-nested-ternary
    disabled
      ? theme.palette.text.disabled
      : expanded
      ? theme.palette.primary.highlight
      : theme.palette.gray.highlight};
  color: ${({ disabled, theme }) =>
    disabled ? theme.palette.text.disabled : "auto"};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
  justify-content: space-between;
  border-top: ${({ expanded, theme }) =>
    !expanded ? `1px solid ${theme.palette.divider}` : "none"};
  transition: background-color 0.3s, border-top 0.3s;
`;

export const AccordionTitleChildren = styled.div`
  padding: ${({ theme }) => theme.spacing * 1.25}px;
`;

export const IconContainer = styled.div`
  display: flex;
  box-sizing: border-box;
`;

export const IconButton = styled.div<{ expanded: boolean }>`
  padding: ${({ theme }) => `${theme.spacing * 1.25}px ${theme.spacing * 2}px`};
  transition: transform 150ms;
  transform-origin: center center;
  transform: ${({ expanded }) => (expanded ? "rotate(180deg)" : "rotate(0)")};
`;

export const DropdownIndicator = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 0 0 auto;
  width: ${({ theme }) => theme.spacing * 5}px;
`;

export const AccordionContent = styled.div<{
  expanded: boolean;
  height: number;
}>`
  height: ${({ height }) => height}px;
  overflow: hidden;
  transition: 0.3s all;
`;
