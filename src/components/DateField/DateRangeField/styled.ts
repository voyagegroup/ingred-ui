import styled from "styled-components";

export const InputContainer = styled.div<{ disabled: boolean }>`
  display: flex;
  align-items: center;
  width: fit-content;
  /* MEMO: for calendar icon */
  padding: ${({ theme }) => `0 ${theme.spacing * 2}px 0 0`};
  border: 0;
  font-size: 14px;
  border: 1px solid ${({ theme }) => theme.palette.divider};
  border-radius: ${({ theme }) => theme.radius}px;
  border-color: ${({ theme }) => theme.palette.divider};
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
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.palette.gray.light : "transparent"};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "text")};
`;

export const CalendarIcon = styled.button`
  border: none;
  text-align: right;
  background: none;
  outline: none;
  cursor: pointer;
`;
