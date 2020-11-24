import styled from "styled-components";

type Props = {
  width?: string;
  height?: string;
};

export const Container = styled.div<Props>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ width }) => (width ? width : "564px")};
  height: ${({ height }) => (height ? height : "144px")};
  border: 2px dashed ${({ theme }) => theme.palette.gray.deepDark};
  border-radius: ${({ theme }) => theme.spacing}px;
  background-color: ${({ theme }) => theme.palette.gray.highlight};
  &:hover {
    border: 2px solid ${({ theme }) => theme.palette.primary.main};
    background-color: ${({ theme }) => theme.palette.background.hint};
  }
`;
