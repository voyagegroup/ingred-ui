import styled from "styled-components";

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
        : `url('data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="11.527" height="8.699" viewBox="0 0 11.527 8.699"%3E%3Cpath fill="%23fff" transform="translate(-393.861 -341.066)" d="M405.214,343.361l-4.95,4.95-1.279,1.279a.594.594,0,0,1-.842,0l-1.28-1.279h0l-2.827-2.827a.6.6,0,0,1,0-.842l1.279-1.28a.6.6,0,0,1,.842,0l2.407,2.407,4.528-4.529a.6.6,0,0,1,.842,0l1.28,1.279A.6.6,0,0,1,405.214,343.361Z"/%3E%3C/svg%3E')`};
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
    flex-shrink: 0;
    display: block;
    content: "";
    width: 18px;
    height: 18px;
    border: 1px solid
      ${({ error, theme }) =>
        error ? theme.palette.danger.main : theme.palette.divider};
    border-radius: ${({ theme }) => theme.radius * 0.5}px;
    box-shadow: 0 -2px 0 0 ${({ theme }) => theme.palette.gray.light} inset;
    background-color: ${({ theme }) => theme.palette.background.default};
    margin-right: ${({ hasChild, theme }) =>
      hasChild ? `${theme.spacing}px` : "auto"};
  }
  ${Checkbox}:disabled + & {
    color: ${({ theme }) => theme.palette.text.disabled};
  }
  ${Checkbox}:disabled + &::before {
    border: 1px solid ${({ theme }) => theme.palette.divider};
    background-color: ${({ theme }) => theme.palette.gray.light};
  }
  ${Checkbox}:disabled:checked + &::before {
    background-image: ${({ indeterminate }) =>
      indeterminate
        ? `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 18 18'%3E%3Crect width='12' height='3' fill='%23D1D5DA' transform='translate(3 8)'/%3E%3C/svg%3E")`
        : `url('data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="11.527" height="8.699" viewBox="0 0 11.527 8.699"%3E%3Cpath fill="%23d1d5da" transform="translate(-393.861 -341.066)" d="M405.214,343.361l-4.95,4.95-1.279,1.279a.594.594,0,0,1-.842,0l-1.28-1.279h0l-2.827-2.827a.6.6,0,0,1,0-.842l1.279-1.28a.6.6,0,0,1,.842,0l2.407,2.407,4.528-4.529a.6.6,0,0,1,.842,0l1.28,1.279A.6.6,0,0,1,405.214,343.361Z"/%3E%3C/svg%3E')`};
    background-repeat: no-repeat;
    background-position: center;
  }
`;
