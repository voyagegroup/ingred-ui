import styled from "styled-components";
import { Size, Radius } from "../../styles";
import { colors } from "../../styles/color";

export const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;

export const Input = styled.input<{
  hasLeftIcon: boolean;
  hasRightIcon: boolean;
}>`
  display: inline-flex;
  padding: 10px ${({ hasRightIcon }) => (hasRightIcon ? "32px" : "8px")} 10px
    ${({ hasLeftIcon }) => (hasLeftIcon ? "35px" : "8px")};
  flex: 1;
  border: 0;
  line-height: 20px;
  font-size: 14px;
  color: ${({ theme }) => theme.palette.black};
  background-color: transparent;
  border: ${Size.Border.Small} solid ${colors.basic[300]};
  border-radius: ${Radius.SMALL};
  box-shadow: 0 ${Size.Border.Normal} 0 0
    ${({ theme }) => theme.palette.gray.light} inset;
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
    border-color: ${colors.basic[300]};
    box-shadow: none;
    background-color: ${({ theme }) => theme.palette.gray.light};
  }
  &.is-error {
    color: ${({ theme }) => theme.palette.danger.main};
    border-color: ${({ theme }) => theme.palette.danger.main};
    box-shadow: 0 ${Size.Border.Normal} 0 0
      ${({ theme }) => theme.palette.danger.highlight} inset;
    background-color: ${colors.red[100]};
  }
`;

const IconContainer = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
`;

export const LeftIconContainer = styled(IconContainer)`
  left: 10px;
`;

export const RightIconContainer = styled(IconContainer)`
  right: 10px;
`;
