import styled from "styled-components";
import { Size, Color, Radius } from "../../../styles/variables";
import { colors } from "../../../styles/variables/color";

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
  padding: 9px ${({ hasRightIcon }) => (hasRightIcon ? "32px" : "8px")} 9px
    ${({ hasLeftIcon }) => (hasLeftIcon ? "35px" : "8px")};
  flex: 1;
  border: 0;
  line-height: 20px;
  font-size: 14px;
  color: ${Color.black};
  background-color: transparent;
  border: ${Size.Border.Small} solid ${colors.basic[300]};
  border-radius: ${Radius.SMALL};
  box-shadow: 0 ${Size.Border.Normal} 0 0 ${Color.gray.light} inset;
  background-color: ${Color.background.default};
  overflow: hidden;

  /* lastpassのicon用 */
  background-position: calc(100% - 35px) 50% !important;

  &:focus {
    outline: none;
    border-color: ${Color.primary.main};
  }
  &::placeholder {
    color: ${Color.text.hint};
  }

  /* IE */
  input:-ms-input-placeholder {
    color: ${Color.text.hint};
  }

  /* Edge */
  &::-ms-input-placeholder {
    color: ${Color.text.hint};
  }

  &.is-disabled {
    color: ${Color.text.disabled};
    border-color: ${colors.basic[300]};
    box-shadow: none;
    background-color: ${Color.gray.light};
  }

  &.is-error {
    color: ${Color.danger.main};
    border-color: ${Color.danger.main};
    box-shadow: 0 ${Size.Border.Normal} 0 0 ${Color.danger.highlight} inset;
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
