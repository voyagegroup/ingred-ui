import styled from "styled-components";
import { colors } from "../../styles/color";
import { Size } from "../../styles/size";
import { Radius } from "../../styles/radius";

export type ContainerProps = {
  height: string;
  minWidth: string;
  fontSize: string;
};

export const ButtonGroupContainer = styled.div<ContainerProps>`
  display: inline-flex;
  justify-content: center;

  button {
    min-width: ${({ minWidth }) => minWidth};
    width: auto;
    height: ${({ height }) => height};
    background: ${({ theme }) => theme.palette.white};
    color: ${({ theme }) => theme.palette.black};
    border: ${Size.Border.Small} solid ${({ theme }) => theme.palette.divider};
    padding-right: 8px;
    padding-left: 8px;
    border-radius: ${Radius.SMALL};
    font-size: ${({ fontSize }) => fontSize};
    box-shadow: none;
    font-weight: normal;
    &:hover {
      background: ${({ theme }) => theme.palette.gray.light};
    }
    &:active {
      background: ${colors.basic[300]};
    }
  }

  button:not(:last-child) {
    border-right: none;
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
  }

  button:not(:first-child) {
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
  }

  button:last-child {
    border-bottom-left-radius: 0;
    border-top-left-radius: 0;
  }
`;
