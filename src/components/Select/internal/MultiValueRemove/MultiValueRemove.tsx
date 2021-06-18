import * as React from "react";
import { components, GroupTypeBase } from "react-select";
import Icon from "../../../Icon";
import { useTheme } from "../../../../themes/useTheme";
import { OptionType } from "../../";
import { MultiValueRemoveProps } from "react-select/src/components/MultiValue";

const MultiValueRemove = <T,>(
  props: MultiValueRemoveProps<OptionType<T>, GroupTypeBase<OptionType<T>>>,
) => {
  const theme = useTheme();
  return (
    <components.MultiValueRemove {...props}>
      <Icon name="close_circle" color={theme.palette.black} />
    </components.MultiValueRemove>
  );
};
export { MultiValueRemove };
