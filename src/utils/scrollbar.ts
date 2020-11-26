import { Property } from "csstype";
import { css } from "styled-components";

export const addScrollbarProperties = (
  maxHeight: Property.MaxHeight,
): ReturnType<typeof css> => css`
  max-height: ${maxHeight};
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 14px;
  }

  &::-webkit-scrollbar-track {
    border: 4px solid transparent;
    background-color: ${({ theme }) => theme.palette.gray.light};
    background-clip: padding-box;
    border-radius: 10rem;
  }

  &::-webkit-scrollbar-thumb {
    border: 6px solid transparent;
    background-color: ${({ theme }) => theme.palette.divider};
    background-clip: padding-box;
    border-radius: 10rem;
    &:hover {
      background-color: ${({ theme }) => theme.palette.gray.dark};
    }
  }
`;
