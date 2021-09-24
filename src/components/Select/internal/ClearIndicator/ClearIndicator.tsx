import * as React from "react";
import * as Styled from "./styled";
import { ClearIndicatorProps, components, GroupBase } from "react-select";
import Icon from "../../../Icon";
import { useTheme } from "../../../../themes/useTheme";
import { OptionType } from "../../";

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
