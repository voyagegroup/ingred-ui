import * as React from "react";
import { components, GroupBase } from "react-select";
import Icon from "../../../Icon";
import { useTheme } from "../../../../themes/useTheme";
import { OptionType } from "../../";
import { MultiValueRemoveProps } from "react-select/dist/declarations/src/components/MultiValue";

const MultiValueRemove = <T,>(
  props: MultiValueRemoveProps<
    OptionType<T>,
    boolean,
    GroupBase<OptionType<T>>
  >,
) => {
  const theme = useTheme();
  return (
    <components.MultiValueRemove {...props}>
      <Icon name="close_circle" color={theme.palette.black} />
    </components.MultiValueRemove>
  );
};
export { MultiValueRemove };
