import styled from "styled-components";

export const Divider = styled.hr<{ variant: "fullWidth" | "middle" }>`
  border: none;
  margin: 0
    ${({ theme, variant }) => (variant === "middle" ? theme.spacing * 2 : 0)}px;
  height: 1px;
  background-color: ${({ theme }) => theme.palette.divider};
`;
