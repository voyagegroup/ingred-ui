import styled from "styled-components";

export const Container = styled.div`
  background-color: ${({ theme }) => theme.palette.background.default};
  overflow-x: scroll;
  th {
    white-space: nowrap;
  }
`;
