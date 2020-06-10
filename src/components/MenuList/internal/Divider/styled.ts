import styled from "styled-components";

export const Divider = styled.hr`
  border: none;
  margin: 4px 0;
  height: 1px;
  background-color: ${({ theme }) => theme.palette.divider};
`;
