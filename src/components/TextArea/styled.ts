import styled from "styled-components";
import { Size, Radius } from "../../styles";

export const Container = styled.div`
  /* MEMO: heightが合わないのでネガティヴマージンで調整 */
  margin-bottom: -6px;
`;

export const Textarea = styled.textarea<{ resize: string; isError: boolean }>`
  width: 100%;
  resize: ${({ resize }) => resize};
  /* MEMO: 下記はingred-uiから移植 */
  display: inline-flex;
  padding: 10px 8px;
  border: 0;
  line-height: 20px;
  font-size: 14px;
  color: ${({ theme, isError }) =>
    isError ? theme.palette.danger.main : theme.palette.black};
  background-color: transparent;
  border: ${Size.Border.Small} solid;
  border-color: ${({ theme, isError }) =>
    isError ? theme.palette.danger.main : theme.palette.divider};
  border-radius: ${Radius.SMALL};
  box-shadow: 0 ${Size.Border.Normal} 0 0
    ${({ theme, isError }) =>
      isError ? theme.palette.danger.highlight : theme.palette.gray.light}
    inset;
  background-color: ${({ theme, isError }) =>
    isError
      ? theme.palette.danger.highlight
      : theme.palette.background.default};
  overflow: hidden;
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
  }
`;
