import styled from "styled-components";
import { palette } from "ingred-ui";

export const Container = styled.div``;

export const TextAreaContainer = styled.textarea`
  display: inline-flex;
  padding: 10px 8px 10px 8px;
  flex: 1;
  border: 0;
  line-height: 20px;
  font-size: 14px;
  color: ${({ theme }) => theme.palette.black};
  background-color: transparent;
  border: 1px solid ${palette.text.disabled};
  border-radius: 4px;
  box-shadow: 0 2 0 0 ${({ theme }) => theme.palette.gray.light} inset;
  background-color: ${({ theme }) => theme.palette.background.default};
  overflow: hidden;
  /* lastpassのicon用 */
  background-position: calc(100% - 35px) 50% !important;
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.palette.primary.main};
  }
  &::placeholder {
    color: ${({ theme }) => theme.palette.text.hint};
  }
  /* IE */
  input:-ms-input-placeholder {
    color: ${({ theme }) => theme.palette.text.hint};
  }
  /* Edge */
  &::-ms-input-placeholder {
    color: ${({ theme }) => theme.palette.text.hint};
  }
  &.is-disabled {
    color: ${({ theme }) => theme.palette.text.disabled};
    border-color: ${palette.danger.light};
    box-shadow: none;
    background-color: ${({ theme }) => theme.palette.gray.light};
  }
`;
