import styled from "styled-components";

type Props = {
  width?: string;
  height?: string;
  active: boolean;
};

export const Container = styled.div<Props>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ width }) => (width ? width : "564px")};
  height: ${({ height }) => (height ? height : "144px")};
  border: 2px
    ${({ theme, active }) =>
      active
        ? `solid ${theme.palette.primary.main}`
        : `dashed ${theme.palette.gray.deepDark}`};
  background-color: ${({ theme, active }) =>
    active ? theme.palette.background.hint : theme.palette.gray.highlight};
  transition: all 0.3s ease-in-out;
  &:hover {
    cursor: pointer;
    border: 2px solid ${({ theme }) => theme.palette.primary.main};
    background-color: ${({ theme }) => theme.palette.background.hint};
  }
`;

export const TextContainer = styled.div``;
