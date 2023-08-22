import styled from "styled-components";

export const InputContainer = styled.div<{
  disabled: boolean;
  error?: boolean;
}>`
  display: flex;
  align-items: center;
  width: 150px;
  /* MEMO: for calendar icon */
  padding: 0 8px 0 0;
  border: 0;
  font-size: 14px;
  background-color: ${({ theme, error, disabled }) =>
    // eslint-disable-next-line no-nested-ternary
    disabled
      ? theme.palette.gray.light
      : error
      ? theme.palette.danger.highlight
      : theme.palette.background.default};
  border: 1px solid
    ${({ theme, error }) =>
      error ? theme.palette.danger.main : theme.palette.divider};
  border-radius: ${({ theme }) => theme.radius}px;
  overflow: scroll;
  /* MEMO: To take a place that display LastPass icon. */
  background-position: calc(100% - 35px) 50% !important;
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.palette.primary.main};
  }
  &::placeholder {
    color: ${({ theme }) => theme.palette.text.hint};
  }
  /* Edge */
  &::-ms-input-placeholder {
    color: ${({ theme }) => theme.palette.text.hint};
  }
  color: ${({ theme, disabled }) =>
    disabled ? theme.palette.text.disabled : theme.palette.black};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "text")};
`;

export const CalendarIcon = styled.button`
  border: none;
  text-align: right;
  background: none;
  outline: none;
  cursor: pointer;
`;
