import styled from "styled-components";

export const Container = styled.div<{ inline: boolean }>`
  display: ${({ inline }) => (inline ? "inline-block" : "block")};
  padding: 10px 0;
  box-shadow: 0px 0px 16px #959fa967;
  border-radius: 4px;
  background-color: #fff;
`;

export const Div = styled.div`
  cursor: pointer;
  height: 32px;
  padding: 0 16px;
  line-height: 32px;
  &:hover {
    background: #eff1f2 0% 0% no-repeat padding-box;
  }
  &:active {
    background-color: ${({ theme }) => theme.palette.primary.main};
  }
`;
