import styled from "styled-components";

export const Input = styled.input<{
  isError: boolean;
  width?: string | number;
  resize?: string;
}>`
  ${({ width }) =>
    width ? `width: ${isNaN(+width) ? width : width + "px"}` : "auto"};
  padding: 10px 8px;
  border: 0;
  font-size: 14px;
  color: ${({ theme, isError }) =>
    isError ? theme.palette.danger.main : theme.palette.black};
  background-color: ${({ theme, isError }) =>
    isError
      ? theme.palette.danger.highlight
      : theme.palette.background.default};
  border: 1px solid ${({ theme }) => theme.palette.divider};
  border-radius: ${({ theme }) => theme.radius}px;
  border-color: ${({ theme, isError }) =>
    isError ? theme.palette.danger.main : theme.palette.divider};
  overflow: scroll;
  resize: ${({ resize }) => resize};
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
    box-shadow: none;
    background-color: ${({ theme }) => theme.palette.gray.light};
    cursor: not-allowed;
  }
`;
