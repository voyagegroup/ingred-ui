import styled from "styled-components";

export const Divider = styled.hr`
  border: none;
  margin: ${({ theme }) => `${theme.spacing}px ${theme.spacing * 2}px`};
  height: 1px;
  background-color: ${({ theme }) => theme.palette.divider};
`;
