import styled from "styled-components";
import Typography from "../Typography";

type ButtonProps = {
  selected: boolean;
};

export const Button = styled.button<ButtonProps>`
  flex-irection: column;
  flex-shrink: 0;
  line-height: 1.25;
  max-width: 360;
  min-height: 48;
  min-width: 90;
  overflow: hidden;
  margin: 0;
  padding: 12px 16px;
  position: relative;
  text-align: center;
  white-space: normal;
  border: none;
  outline: none;
  background-color: transparent;
  border-bottom: ${({ selected }) =>
    selected
      ? ({ theme }) => `solid ${theme.palette.primary.main} 2px`
      : "none"};
  cursor: pointer;
  &:hover {
    background-color: rgb(0, 0, 0, 0.1);
    transition: 0.5s;
  }
`;

export const Text = styled(Typography)<ButtonProps>`
  padding-right: 2px;
  font-weight: 600;
  color: ${({ selected }) =>
    selected ? ({ theme }) => theme.palette.primary.main : "gray"};
`;
