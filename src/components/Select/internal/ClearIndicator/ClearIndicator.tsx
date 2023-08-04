import * as React from "react";
import { ClearIndicatorProps, components, GroupBase } from "react-select";
import { OptionType } from "../../";
import { useTheme } from "../../../../themes/useTheme";
import Icon from "../../../Icon";
import * as Styled from "./styled";

const ClearIndicator = <T,>(
  props: ClearIndicatorProps<OptionType<T>, boolean, GroupBase<OptionType<T>>>,
) => {
  const theme = useTheme();
  return (
    <Styled.Container>
      <components.ClearIndicator
        // TODO: remove any
        {...(props as ClearIndicatorProps<any, boolean, any>)}
      >
        <Icon name="close_circle" color={theme.palette.black} />
      </components.ClearIndicator>
    </Styled.Container>
  );
};

export { ClearIndicator };
