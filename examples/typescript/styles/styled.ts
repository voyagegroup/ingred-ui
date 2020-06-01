import styled from "styled-components";
import { PaletteColorOptions } from "../../../dist/themes/palette";

export const Container = styled.div`
  padding: ${({ theme }) => theme.spacing * 3}px
    ${({ theme }) => theme.spacing * 3}px ${({ theme }) => theme.spacing * 10}px;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(192px, 384px));
  grid-auto-rows: 192px;
  grid-row-gap: 24px;
`;

export const Column = styled.div`
  width: 384px;
  height: 192px;
  padding: 0 ${({ theme }) => theme.spacing * 2}px;
`;

export const Title = styled.h3`
  padding-bottom: ${({ theme }) => theme.spacing * 2}px;
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

export const InputContainer = styled.div`
  width: 100%;
`;

export const ColorTile = styled.div<{ palette: PaletteColorOptions }>`
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
