import styled from "styled-components";
import { TextAlign, FontWeight } from "./Typography";

type ContainerProps = {
  color: string;
  align: TextAlign;
  fontSize: string;
  weight: FontWeight;
};

export const Container = styled.p<ContainerProps>`
  line-height: 1.4;
  color: ${({ color }) => color};
  text-align: ${({ align }) => align};
  font-size: ${({ fontSize }) => fontSize};
  font-weight: ${({ weight }) => weight};
`;
