import styled from "styled-components";
import { colors } from "../../styles";
import { TagSize, TagVariant, TAG_SIZES, TAG_VARIANTS } from "./types";

type StyledTagProps = {
  $size: TagSize;
  $variant: TagVariant;
  $disabled?: boolean;
};

export const Tag = styled.div<StyledTagProps>`
  isolation: isolate;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  width: fit-content;
  min-height: ${({ $size }) => TAG_SIZES[$size].height};
  padding: ${({ $size }) => TAG_SIZES[$size].padding};
  border: 1px solid ${({ $variant, $disabled }) => $disabled ? colors.basic[400] : TAG_VARIANTS[$variant].border};
  border-radius: ${({ $size }) => TAG_SIZES[$size].borderRadius};
  font-weight: 400;
  font-size: ${({ $size }) => TAG_SIZES[$size].fontSize};
  line-height: 1.2;
  word-break: break-all;
  color: ${({ $variant, $disabled }) => $disabled ? colors.basic[400] : TAG_VARIANTS[$variant].text};
  background-color: ${({ $variant, $disabled }) => $disabled ? colors.basic[200] : TAG_VARIANTS[$variant].background};
  cursor: ${({ $disabled }) => $disabled ? "not-allowed" : "default"};
`;

export const Text = styled.div<StyledTagProps>`

`;

export const RemoveButton = styled.button<StyledTagProps>`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ $size }) => TAG_SIZES[$size].iconSize};
  height: ${({ $size }) => TAG_SIZES[$size].iconSize};
  padding: 0;
  margin-right: -2px;
  border: 0;
  color: ${({ $variant, $disabled }) => $disabled ? colors.basic[400] : TAG_VARIANTS[$variant].text};
  background-color: transparent;
  cursor: ${({ $disabled }) => $disabled ? "not-allowed" : "pointer"};

  &:hover {
    color: ${({ $variant, $disabled }) => $disabled ? colors.basic[400] : TAG_VARIANTS[$variant].hoverIcon};
  }

  svg {
    width: 100%;
    height: 100%;
  }
`; 