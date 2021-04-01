import styled from "styled-components";

export const IconContainer = styled.div`
  width: 14px;
  height: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.palette.black};
  &:hover {
    cursor: pointer;
  }
`;
