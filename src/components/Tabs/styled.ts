import styled from "styled-components";
import Typography from "../Typography";

type ButtonProps = {
  selected: boolean;
};

export const ChildContainer = styled.div`
  position: relative;
`;

export const ChildrenContainer = styled.div``;

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
  cursor: ${({ selected }) => (selected ? "" : "pointer")};
  &:hover {
    background-color: ${({ selected }) =>
      !selected ? ({ theme }) => theme.palette.gray.highlight : ""};
    transition: 0.5s;
  }
`;

export const Text = styled(Typography)<ButtonProps>`
  padding-right: 2px;
  font-weight: 600;
  color: ${({ selected }) =>
    selected ? ({ theme }) => theme.palette.primary.main : "gray"};
`;

export const Indicator = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.3s ease-in-out;
  border-bottom: ${({ theme }) => `solid ${theme.palette.primary.main} 2px`};
`;

export const Border = styled.div`
  height: 1px;
  width: 100%;
  background: ${({ theme }) => theme.palette.gray.main};
`;
