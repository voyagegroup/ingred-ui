import * as React from "react";
import ReactCreatableSelect, { CreatableProps } from "react-select/creatable";
import { GroupBase } from "react-select/dist/declarations/src/types";
import * as Styled from "../Select/styled";
import { useTheme } from "../../themes";
import { useLocaleProps } from "../../hooks/useLocaleProps";
import { OptionType } from "../Select";
import { getOverrideStyles } from "../Select/Select";
import { DropdownIndicator } from "../Select/internal/DropdownIndicator";
import { ClearIndicator } from "../Select/internal/ClearIndicator";
import { MultiValueRemove } from "../Select/internal/MultiValueRemove";

export type CreatableSelectProps<T> = {
  minWidth?: string;
  placeholder?: string;
  error?: boolean;
  emptyMessage?: string;
  addMessage?: string;
} & CreatableProps<OptionType<T>, boolean, GroupBase<OptionType<T>>>;

const CreatableSelect = <T,>(
  inProps: CreatableSelectProps<T>,
  ref: React.Ref<HTMLDivElement>,
): React.ReactElement<CreatableSelectProps<T>> => {
  const props = useLocaleProps({ props: inProps, name: "CreatableSelect" });
  const {
    onInputChange,
    minWidth,
    isDisabled,
    error = false,
    closeMenuOnSelect = true,
    placeholder,
    emptyMessage = "Not found",
    addMessage = "Create",
    ...rest
  } = props;

  const theme = useTheme();
  const handleInputChange: CreatableSelectProps<T>["onInputChange"] = (
    newValue: string,
    actionMeta: { action: string },
  ) => {
    if (onInputChange) {
      onInputChange(newValue, actionMeta);
    }
  };

  return (
    <Styled.Container ref={ref} minWidth={minWidth} isDisabled={isDisabled}>
      <ReactCreatableSelect<OptionType<T>, boolean, GroupBase<OptionType<T>>>
        isClearable
        placeholder={placeholder}
        closeMenuOnSelect={closeMenuOnSelect}
        noOptionsMessage={() => emptyMessage}
        formatCreateLabel={(text: string) => `${addMessage} "${text}"`}
        isDisabled={isDisabled}
        styles={getOverrideStyles<T>(theme, error)}
        maxMenuHeight={150}
        // MEMO: use palette in Styled.ReactCreatableSelectMenuList
        theme={(originalTheme: any) => ({
          ...originalTheme,
          palette: theme.palette,
        })}
        {...rest}
        components={{
          DropdownIndicator: (props: any) => (
            <DropdownIndicator {...props} error={error} />
          ),
          ClearIndicator,
          IndicatorSeparator: null,
          MultiValueRemove,
          MenuList: Styled.ReactSelectMenuList,
          ...rest.components,
        }}
        menuPortalTarget={document.body}
        onInputChange={handleInputChange}
      />
    </Styled.Container>
  );
};

// FIXME: Imprement without type assertion
export default React.forwardRef(CreatableSelect) as <T>(
  props: CreatableSelectProps<T> & { ref?: React.ForwardedRef<HTMLDivElement> },
) => ReturnType<typeof CreatableSelect>;
