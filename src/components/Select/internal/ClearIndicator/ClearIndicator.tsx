import * as React from "react";
import * as Styled from "./styled";
import { IndicatorProps, components } from "react-select";
import Icon from "../../../Icon";
import { useTheme } from "../../../../themes/useTheme";
import { OptionType } from "../../";

const ClearIndicator = <T,>(props: IndicatorProps<OptionType<T>, boolean>) => {
  const theme = useTheme();
  return (
    <Styled.Container>
      <components.ClearIndicator {...props}>
        <Icon name="close_circle" color={theme.palette.black} />
      </components.ClearIndicator>
    </Styled.Container>
  );
};

export { ClearIndicator };
