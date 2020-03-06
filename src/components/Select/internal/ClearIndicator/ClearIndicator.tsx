import * as React from "react";
import * as Styled from "./styled";
import { IndicatorProps, components } from "react-select";
import Icon from "../../../Icon";
import { useTheme } from "../../../../themes/useTheme";

const ClearIndicator = (props: IndicatorProps<any>) => {
  const theme = useTheme();
  return (
    <Styled.Container>
      <components.ClearIndicator {...props}>
        <Icon name="close" size="sm" color={theme.palette.black} />
      </components.ClearIndicator>
    </Styled.Container>
  );
};
export { ClearIndicator };
