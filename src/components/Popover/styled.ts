import styled from "styled-components";

export const Container = styled.div`
  background-color: ${({ theme }) => theme.palette.background.default};
  box-shadow: ${({ theme }) => theme.shadows[5]};
  border-radius: ${({ theme }) => theme.radius}px;
`;
