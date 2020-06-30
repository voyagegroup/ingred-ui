import styled from "styled-components";
import { Radius } from "../../styles";
import { colors } from "../../styles/color";
import { BaseButton } from "./internal/BaseButton";
import { ButtonColorStyle } from "./Button";
import { Size } from "../../styles/size";

export type ContainerProps = ButtonColorStyle & {
  inline: boolean;
  fontSize: string;
  fontWeight: string;
  height: string;
  horizontalPadding: string;
  minWidth: string;
  href?: string;
};

export const ButtonContainer = styled(BaseButton)<ContainerProps>`
  display: ${({ inline }) => (inline ? "inline-flex" : "flex")};
  justify-content: center;
  align-items: center;
  padding-right: ${({ horizontalPadding }) => horizontalPadding};
  padding-left: ${({ horizontalPadding }) => horizontalPadding};
  width: ${({ inline }) => (inline ? "auto" : "100%")};
  min-width: ${({ minWidth }) => minWidth};
  height: ${({ height }) => height};
  border-radius: ${Radius.SMALL};
  border: ${({ normal }) => normal.border};
  background: ${({ normal }) => normal.background};
  color: ${({ normal }) => normal.color};
  text-align: center;
  font-weight: ${({ fontWeight }) => fontWeight};
  font-size: ${({ fontSize }) => fontSize};
  box-shadow: ${({ normal }) => normal.boxShadow};
  transition: all 0.3s;

  &.disabled {
    border: ${Size.Border.Small} solid ${colors.basic[100]};
    background: ${colors.basic[100]};
    color: ${({ theme }) => theme.palette.text.disabled};
    box-shadow: none;
    pointer-events: none;
  }

  &:hover {
    background: ${({ hover }) => hover.background};
  }

  &:active {
    background: ${({ active }) => active.background};
    box-shadow: none;
  }
`;
