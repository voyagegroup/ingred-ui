import styled from "styled-components";

export const Container = styled.div<{ minWidth?: string }>`
  min-width: ${({ minWidth }) => minWidth || "auto"};
`;
