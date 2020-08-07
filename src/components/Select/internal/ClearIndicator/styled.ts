import styled from "styled-components";

export const Container = styled.div`
  background-color: ${({ theme }) => theme.palette.gray.light};
  border-radius: ${({ theme }) => theme.radius}px;
  &:hover {
    background-color: ${({ theme }) => theme.palette.gray.main};
  }
  & > div {
    /* css-tlfecz-indicatorContainer */
    padding: 4px;
  }
`;
