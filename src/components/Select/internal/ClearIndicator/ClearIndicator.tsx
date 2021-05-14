import * as React from "react";
import * as Styled from "./styled";
import { IndicatorProps, components, GroupTypeBase } from "react-select";
import Icon from "../../../Icon";
import { useTheme } from "../../../../themes/useTheme";
import { OptionType } from "../../";

const ClearIndicator = <T,>(
  props: IndicatorProps<OptionType<T>, boolean, GroupTypeBase<OptionType<T>>>,
) => {
  const theme = useTheme();
  return (
    <Styled.Container>
      <components.ClearIndicator
        // TODO: remove any
        {...(props as IndicatorProps<any, boolean, any>)}
      >
        <Icon name="close_circle" color={theme.palette.black} />
      </components.ClearIndicator>
    </Styled.Container>
  );
};

export { ClearIndicator };
