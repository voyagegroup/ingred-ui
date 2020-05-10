import styled from "styled-components";

export const Container = styled.div`
  display: inline-block;
  position: relative;
`;

export const ContentsWrapper = styled.div`
  padding: 10px 0;
  box-shadow: 0px 0px 16px #959fa967;
  border-radius: 4px;
  background-color: #fff;
`;

export const UL = styled.ul`
  list-style: none;
`;

export const LI = styled.li`
  cursor: pointer;
  height: 32px;
  padding: 0 16px;
  line-height: 32px;
  white-space: nowrap;
  &:hover {
    background: #eff1f2 0% 0% no-repeat padding-box;
  }
  &:active {
    background-color: #0B82F4;
  }
`;
