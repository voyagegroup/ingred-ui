import styled from "styled-components";

export const Container = styled.div`
  background-color: ${({ theme }) => theme.palette.background.default};
  th {
    white-space: nowrap;
  }
`;
