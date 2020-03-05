import styled from "styled-components";
import { Size, Radius } from "../../styles";
import { colors } from "../../styles/color";

export const Container = styled.label`
  cursor: pointer;
`;

export const Checkbox = styled.input<{ indeterminate: boolean }>`
  opacity: 0;
  -webkit-appearance: none;
  appearance: none;
  position: absolute;

  &:checked + span::before {
    /* background */
    background-color: ${({ theme }) => theme.palette.primary.main};
    box-shadow: none;
    border: 0;

    /* check icon */
    background-image: ${({ indeterminate }) =>
      indeterminate
        ? `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 18 18'%3E%3Crect width='12' height='3' fill='%23fff' transform='translate(3 8)'/%3E%3C/svg%3E")`
        : `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12.271' height='9.439' viewBox='0 0 12.271 9.439'%3E%3Crect width='2.67' height='6.674' fill='%23ffffff' transform='translate(0 4.72) rotate(-45)'/%3E%3Crect width='2.67' height='9.344' fill='%23ffffff' transform='translate(10.383 0) rotate(45)'/%3E%3C/svg%3E")`};
    background-repeat: no-repeat;
    background-position: center;
  }
`;

export const Span = styled.span<{ hasChild: boolean }>`
  display: inline-flex;
  align-items: center;
  &::before {
    display: block;
    content: "";
    width: 18px;
    height: 18px;
    border: ${Size.Border.Small} solid ${colors.basic[300]};
    border-radius: ${Radius.SMALL};
    box-shadow: 0 -${Size.Border.Normal} 0 0 ${({ theme }) =>
        theme.palette.gray.light} inset;
    background-color: ${({ theme }) => theme.palette.background.default};
    margin-right: ${({ hasChild, theme }) =>
      hasChild ? `${theme.spacing}px` : "auto"};
  }
`;
