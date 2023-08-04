import * as React from "react";
import { components, GroupBase } from "react-select";
import { MultiValueRemoveProps } from "react-select/dist/declarations/src/components/MultiValue";
import { OptionType } from "../../";
import { useTheme } from "../../../../themes/useTheme";
import Icon from "../../../Icon";

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
