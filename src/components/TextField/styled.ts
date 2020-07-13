import styled from "styled-components";

export const Container = styled.div``;

export const InputContainer = styled.div<{
  hasLeftIcon: boolean;
  hasRightIcon: boolean;
}>`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  & > input {
    display: inline-flex;
    flex: 1;
    ${({ hasRightIcon }) => (hasRightIcon ? "padding-right: 32px" : "")};
    ${({ hasLeftIcon }) => (hasLeftIcon ? "padding-left: 35px" : "")};
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
