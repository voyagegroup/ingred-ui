import styled from "styled-components";
import { Size, Radius } from "../../styles";

export const Container = styled.label`
  cursor: pointer;
`;

export const Checkbox = styled.input<{
  indeterminate: boolean;
  error: boolean;
}>`
  opacity: 0;
  -webkit-appearance: none;
  appearance: none;
  position: absolute;

  &:checked + span::before {
    /* flex: 1 0 auto; */
    /* background */
    background-color: ${({ theme }) => theme.palette.primary.main};
    box-shadow: none;
    border: 0;

    /* check icon */
    background-image: ${({ indeterminate }) =>
      indeterminate
        ? `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 18 18'%3E%3Crect width='12' height='3' fill='%23ffffff' transform='translate(3 8)'/%3E%3C/svg%3E")`
        : `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12.271' height='9.439' viewBox='0 0 12.271 9.439'%3E%3Crect width='2.67' height='6.674' fill='%23ffffff' transform='translate(0 4.72) rotate(-45)'/%3E%3Crect width='2.67' height='9.344' fill='%23ffffff' transform='translate(10.383 0) rotate(45)'/%3E%3C/svg%3E")`};
    background-repeat: no-repeat;
    background-position: center;
  }
`;

export const Span = styled.span<{
  hasChild: boolean;
  indeterminate: boolean;
  error: boolean;
}>`
  display: inline-flex;
  align-items: center;
  color: ${({ error }) =>
    error
      ? ({ theme }) => theme.palette.danger.main
      : ({ theme }) => theme.palette.black};
  &::before {
    display: block;
    content: "";
    width: 18px;
    height: 18px;
    border: ${Size.Border.Small} solid
      ${({ error, theme }) =>
        error ? theme.palette.danger.main : theme.palette.divider};
    border-radius: ${Radius.SMALL};
    box-shadow: 0 -${Size.Border.Normal} 0 0 ${({ theme }) =>
        theme.palette.gray.light} inset;
    background-color: ${({ theme }) => theme.palette.background.default};
    margin-right: ${({ hasChild, theme }) =>
      hasChild ? `${theme.spacing}px` : "auto"};
  }
  ${Checkbox}:disabled + & {
    color: ${({ theme }) => theme.palette.text.disabled};
  }
  ${Checkbox}:disabled + &::before {
    border: ${Size.Border.Small} solid ${({ theme }) => theme.palette.divider};
    background-color: ${({ theme }) => theme.palette.gray.light};
  }
  ${Checkbox}:disabled:checked + &::before {
    background-image: ${({ indeterminate }) =>
      indeterminate
        ? `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 18 18'%3E%3Crect width='12' height='3' fill='%23D1D5DA' transform='translate(3 8)'/%3E%3C/svg%3E")`
        : `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12.271' height='9.439' viewBox='0 0 12.271 9.439'%3E%3Crect width='2.67' height='6.674' fill='%23D1D5DA' transform='translate(0 4.72) rotate(-45)'/%3E%3Crect width='2.67' height='9.344' fill='%23D1D5DA' transform='translate(10.383 0) rotate(45)'/%3E%3C/svg%3E")`};
    background-repeat: no-repeat;
    background-position: center;
  }
`;
