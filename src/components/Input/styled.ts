import styled from "styled-components";
import { Size, Radius } from "../../styles";
import { colors } from "../../styles/color";

export const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 9px 32px 9px 8px;
  border: ${Size.Border.Small} solid ${colors.basic[300]};
  border-radius: ${Radius.SMALL};
  box-shadow: 0 ${Size.Border.Normal} 0 0
    ${({ theme }) => theme.palette.gray.light} inset;
  background-color: ${({ theme }) => theme.palette.background.default};
  overflow: hidden;
  &.is-focus {
    border-color: ${({ theme }) => theme.palette.primary.main};
  }
  &.is-disabled {
    border-color: ${colors.basic[300]};
    box-shadow: none;
    background-color: ${({ theme }) => theme.palette.gray.light};
  }
  &.is-error {
    border-color: ${({ theme }) => theme.palette.danger.main};
    box-shadow: 0 ${Size.Border.Normal} 0 0
      ${({ theme }) => theme.palette.danger.highlight} inset;
    background-color: ${colors.red[100]};
  }
`;

export const Input = styled.input`
  flex: 1;
  outline: none;
  border: 0;
  line-height: 20px;
  font-size: 14px;
  color: ${({ theme }) => theme.palette.black};
  background-color: transparent;
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
  }

  &.is-error {
    color: ${({ theme }) => theme.palette.danger.main};
  }
`;

export const IconContainer = styled.div`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
`;
