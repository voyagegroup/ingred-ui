import * as React from "react";
import { useTheme } from "styled-components";
import Button from "../../../Button";
import { Divider } from "../../../Divider/styled";
import Icon from "../../../Icon";
import Select from "../../../Select";
import Spacer from "../../../Spacer";
import Typography from "../../../Typography";
import * as Styled from "./styled";

export type Props = {};

export const Label: React.FunctionComponent<Props> = ({}) => {
  return (
    <Styled.Container>
      aad
      <Styled.RightContainer>
        <Icon name="close" />
      </Styled.RightContainer>
    </Styled.Container>
  );
};
