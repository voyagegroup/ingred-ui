import Flex from "../Flex";
import styled from "styled-components";
import { StyledComponentProps } from "../../utils/styledTypes";
import React from "react";

export const Container = styled.div<StyledComponentProps>`
  border-top: ${({ theme }) => `1px solid ${theme.palette.divider}`};
`;

export const AccordionTitle = styled(Flex)<{
  expanded: boolean;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  role?: string;
  tabIndex?: number;
  "aria-expanded"?: boolean;
  "aria-controls"?: string;
} & StyledComponentProps>`
  background-color: ${({ disabled, theme }) =>
    disabled ? theme.palette.gray.light : theme.palette.gray.light};
  color: ${({ disabled, theme }) =>
    disabled ? theme.palette.text.disabled : "auto"};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
  justify-content: space-between;
  transition:
    background-color 0.3s,
    border-top 0.3s;
`;

export const AccordionTitleChildren = styled.div<StyledComponentProps>`
  padding: ${({ theme }) => theme.spacing * 1.25}px;
  width: 100%;
`;

export const IconContainer = styled.div<StyledComponentProps>`
  display: flex;
  box-sizing: border-box;
`;

export const IconButton = styled.div<{ expanded: boolean } & StyledComponentProps>`
  padding: ${({ theme }) => `${theme.spacing * 1.25}px ${theme.spacing * 2}px`};
  transition: transform 150ms;
  transform-origin: center center;
  transform: ${({ expanded }) => (expanded ? "rotate(180deg)" : "rotate(0)")};
`;

export const DropdownIndicator = styled.div<StyledComponentProps>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 0 0 auto;
  width: ${({ theme }) => theme.spacing * 5}px;
`;

export const AccordionContent = styled.div<{
  height: `${number}px` | "auto";
  overflow: "hidden" | "visible";
  onTransitionEnd?: () => void;
  ref?: React.Ref<HTMLDivElement>;
} & StyledComponentProps>`
  height: ${({ height }) => height};
  overflow: ${({ overflow }) => overflow};
  transition: 0.3s all;
  background-color: ${({ theme }) => theme.palette.white};
`;
