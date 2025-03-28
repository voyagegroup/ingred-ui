import styled from "styled-components";
import { TextAlign, FontWeight } from "./Typography";

type ContainerProps = {
  color: string;
  align: TextAlign;
  fontSize: string;
  weight: FontWeight;
  lineHeight: string;
  children?: React.ReactNode;
  as?: string | React.ComponentType<any>;
};

export const Container = styled.p<ContainerProps>`
  color: ${({ color }) => color};
  text-align: ${({ align }) => align};
  font-size: ${({ fontSize }) => fontSize};
  font-weight: ${({ weight }) => weight};
  line-height: ${({ lineHeight }) => lineHeight};
  word-break: break-all;
`;
