import styled from "styled-components";
import { colors } from "../../styles";
import { TagSize, TagVariant, TAG_SIZES, TAG_VARIANTS } from "./types";

type StyledTagProps = {
    $size: TagSize;
    $variant: TagVariant;
};

export const Tag = styled.span<StyledTagProps>`
  isolation: isolate;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  width: fit-content;
  padding: ${({ $size }) => TAG_SIZES[$size].padding};
  border: 1px solid ${({ $variant }) => TAG_VARIANTS[$variant].border};
  border-radius: ${({ $size }) => TAG_SIZES[$size].borderRadius};
  font-weight: 400;
  font-size: ${({ $size }) => TAG_SIZES[$size].fontSize};
  line-height: 1.2;
  word-break: break-all;
  color: ${({ $variant }) => TAG_VARIANTS[$variant].text};
  background-color: ${({ $variant }) => TAG_VARIANTS[$variant].background};
`;

export const RemoveButton = styled.button<StyledTagProps>`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ $size }) => TAG_SIZES[$size].iconSize};
  height: ${({ $size }) => TAG_SIZES[$size].iconSize};
  padding: 0;
  border: 0;
  color: ${({ $variant }) => TAG_VARIANTS[$variant].text};
  background-color: transparent;
  cursor: pointer;

  &:hover {
    color: ${({ $variant }) => TAG_VARIANTS[$variant].hoverIcon};
  }

  svg {
    width: 100%;
    height: 100%;
  }
`; 