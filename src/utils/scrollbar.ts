import { Property } from "csstype";
import { css } from "styled-components";

export const addScrollbarProperties = (
  maxHeight: Property.MaxHeight,
): ReturnType<typeof css> => css`
  max-height: ${maxHeight};
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 2em;
  }

  &::-webkit-scrollbar-track {
    border: 0.5em solid transparent;
    background-color: ${({ theme }) => theme.palette.gray.light};
    background-clip: content-box;
    border-radius: 10rem;
  }

  &::-webkit-scrollbar-thumb {
    width: 2px;
    border: 0.5em solid transparent;
    background-clip: padding-box;
    /* border-radius: 10em; */
    background-color: red;
    box-shadow: inset 0 0 0 6px ${({ theme }) => theme.palette.gray.light};
    border-radius: 1.5em;
  }
`;
