import { Property } from "csstype";
import { css } from "styled-components";

type ScrollbarConfig = {
  height?: Property.Height;
  maxHeight?: Property.MaxHeight;
  minHeight?: Property.MinHeight;
};

/**
 * Add CSS Properties to add scrollbar.
 * Only for Mac OS x Chromium Engine.
 * Plan to enable to add horizontal scrollbar.
 */
export const addScrollbarProperties = ({
  height = "auto",
  maxHeight = "none",
  minHeight = "none",
}: ScrollbarConfig): ReturnType<typeof css> => css`
  height: ${height};
  max-height: ${maxHeight};
  min-height: ${minHeight};
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 16px;
  }

  &::-webkit-scrollbar-corner {
    display: none;
  }

  &::-webkit-scrollbar-thumb {
    border: 5px solid transparent;
    background-color: ${({ theme }) => theme.palette.gray.main};
    background-clip: padding-box;
    border-radius: 10rem;
    &:hover {
      background-color: ${({ theme }) => theme.palette.gray.dark};
    }
  }
`;
