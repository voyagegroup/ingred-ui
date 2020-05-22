import styled from "styled-components";

export const Divider = styled.hr`
  border: none;
  margin: 4px 0;
  height: 2px;
  background-color: ${({ theme }) => theme.palette.gray.light};
`;
