import styled, { css } from "styled-components";
import { PaletteColor } from "../../../../src/themes";

export const Container = styled.div`
  padding: ${({ theme }) => theme.spacing * 3}px
    ${({ theme }) => theme.spacing * 3}px ${({ theme }) => theme.spacing * 10}px;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 384px);
  grid-auto-flow: dense;
  grid-row-gap: 24px;
`;

export const Cell = styled.div<{ column?: number; row?: number }>`
  width: ${({ column }) => (column || 1) * 384}px;
  height: ${({ row }) => (row || 1) * 192}px;
  grid-row: span ${({ row }) => row || 1};
  grid-column: span ${({ column }) => column || 1};
  padding: 0 ${({ theme }) => theme.spacing * 2}px;
`;

export const Title = styled.h3<{ hasLink?: boolean }>`
  padding-bottom: ${({ theme }) => theme.spacing * 2}px;
  ${({ hasLink }) =>
    hasLink &&
    css`
      cursor: pointer;
      text-decoration: underline;
      color: ${({ theme }) => theme.palette.text.primary};
    `}
`;

export const Component = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100% - 44px);
  padding: ${({ theme }) => theme.spacing * 3}px;
  border-radius: ${({ theme }) => theme.spacing * 2}px;
  background-color: ${({ theme }) => theme.palette.background.active};
`;

export const ColorTile = styled.div<{ palette: PaletteColor }>`
  width: 100%;
  height: calc(100% - 44px);
  border-radius: ${({ theme }) => theme.spacing * 2}px;
  background-color: ${({ palette }) => palette.main};
  background: linear-gradient(
    90deg,
    ${({ palette }) => palette.deepDark} 0%,
    ${({ palette }) => palette.deepDark} 20%,
    ${({ palette }) => palette.dark} 20%,
    ${({ palette }) => palette.dark} 40%,
    ${({ palette }) => palette.main} 40%,
    ${({ palette }) => palette.main} 60%,
    ${({ palette }) => palette.light} 60%,
    ${({ palette }) => palette.light} 80%,
    ${({ palette }) => palette.highlight} 80%,
    ${({ palette }) => palette.highlight} 100%
  );
`;

export const Square = styled.div`
  width: 50px;
  height: 50px;
  background-color: ${({ theme }) => theme.palette.background.default};
`;

export const FullBox = styled.div`
  width: 100%;
`;

export const ScrollAreaContainer = styled.div`
  width: 200px;
  border: solid 1px ${({ theme }) => theme.palette.divider};
`;

export const ScrollAreaContent = styled.div`
  height: 100px;
`;
