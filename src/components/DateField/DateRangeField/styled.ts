import styled from "styled-components";

export const InputContainer = styled.div<{ error?: boolean }>`
  display: flex;
  align-items: center;
  width: fit-content;
  /* MEMO: for calendar icon */
  padding: ${({ theme }) => `0 ${theme.spacing * 2}px 0 0`};
  border: 0;
  font-size: 14px;
  background-color: ${({ theme, error }) =>
    error ? theme.palette.danger.highlight : theme.palette.background.default};
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
  &:disabled {
    color: ${({ theme }) => theme.palette.text.disabled};
    border-color: ${({ theme }) => theme.palette.divider};
    box-shadow: "none";
    background-color: ${({ theme }) => theme.palette.gray.light};
    cursor: not-allowed;
  }
`;

export const CalendarIcon = styled.button`
  border: none;
  text-align: right;
  background: none;
  outline: none;
  cursor: pointer;
`;
