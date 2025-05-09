import * as React from "react";
import ReactSelect, {
  Props as ReactSelectProps,
  StylesConfig,
} from "react-select";
import { useLocaleProps } from "../../hooks/useLocaleProps";
import { Space } from "../../styles";
import { Theme, useTheme } from "../../themes";
import { fontSize } from "../Typography/Typography";
import { ClearIndicator } from "./internal/ClearIndicator";
import { DropdownIndicator } from "./internal/DropdownIndicator";
import { MultiValueRemove } from "./internal/MultiValueRemove";
import * as Styled from "./styled";
import { depth } from "../../styles/depth";

export const getOverrideStyles = <OptionValue,>(
  theme: Theme,
  error: boolean,
) => {
  const overrideStyles: StylesConfig<OptionType<OptionValue>, boolean> = {
    control: (base, { menuIsOpen }) => ({
      ...base,
      boxShadow: "none",
      borderTopColor: theme.palette.divider,
      borderRightColor: theme.palette.divider,
      borderLeftColor: theme.palette.divider,
      borderBottomColor: menuIsOpen ? `transparent` : theme.palette.divider,
      borderColor: error ? `${theme.palette.danger.main}!important` : "",
      borderRadius: menuIsOpen
        ? `${theme.radius}px ${theme.radius}px 0 0`
        : `${theme.radius}px`,
      "&:hover": {},
    }),
    input: (base) => ({
      ...base,
      margin: "0 2px",
      paddingBottom: 0,
      paddingTop: 0,
    }),
    menu: (base) => ({
      ...base,
      marginTop: "-1px",
      boxShadow: "none",
      borderRadius: `0 0 ${theme.radius}px ${theme.radius}px`,
      borderRight: `1px solid ${
        error ? theme.palette.danger.main : theme.palette.divider
      }`,
      borderBottom: `1px solid ${
        error ? theme.palette.danger.main : theme.palette.divider
      }`,
      borderLeft: `1px solid ${
        error ? theme.palette.danger.main : theme.palette.divider
      }`,
    }),
    menuPortal: (base) => ({
      ...base,
      zIndex: depth.dropdown,
    }),
    menuList: (base) => ({
      ...base,
      paddingTop: "12px",
      paddingBottom: `${Space}px`,
    }),
    noOptionsMessage: (base) => ({
      ...base,
      fontSize: `${fontSize.sm}px`,
      color: theme.palette.text.hint,
    }),
    option: (base, { isSelected, isFocused, isDisabled }) => {
      let backgroundColor = "transparent";
      let color = isSelected ? theme.palette.white : theme.palette.black;
      if (isSelected) {
        backgroundColor = theme.palette.primary.main;
      } else if (isDisabled) {
        color = theme.palette.text.disabled;
      } else if (isFocused) {
        backgroundColor = theme.palette.gray.light;
      }
      return {
        ...base,
        padding: `4px ${Space}px 5px`,
        color,
        fontSize: `${fontSize.sm}px`,
        ":active": {
          backgroundColor: theme.palette.gray.main,
        },
        backgroundColor,
      };
    },
    placeholder: (base, { isDisabled, isFocused }) => {
      let color = theme.palette.black;
      switch (true) {
        case isDisabled:
          color = theme.palette.text.disabled;
          break;
        case error:
          color = theme.palette.danger.main;
          break;
        case isFocused:
          color = theme.palette.text.hint;
          break;
      }
      return {
        ...base,
        transition: "color 0.2s",
        color,
        fontSize: `${fontSize.sm}px`,
      };
    },
    singleValue: (base, { isDisabled }) => {
      let color = theme.palette.black;
      if (error) {
        color = theme.palette.danger.main;
      } else if (isDisabled) {
        color = theme.palette.text.disabled;
      }
      return {
        ...base,
        color: `${color}`,
        fontSize: `${fontSize.sm}px`,
      };
    },
    multiValue: (base) => ({
      ...base,
      backgroundColor: theme.palette.gray.highlight,
      padding: "2px 0px 3px 2px",
      margin: "0px 4px",
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: `${theme.radius}px`,
    }),
    multiValueLabel: (base, { isDisabled }) => {
      let color = theme.palette.black;
      if (error) {
        color = theme.palette.danger.main;
      } else if (isDisabled) {
        color = theme.palette.text.disabled;
      }
      return {
        ...base,
        padding: 0,
        color: `${color}`,
        fontSize: `${fontSize.sm}px`,
      };
    },
    multiValueRemove: (base) => ({
      ...base,
      ":hover": {
        backgroundColor: "transparent",
      },
      padding: "0px 8px",
    }),
    valueContainer: (base) => ({
      ...base,
      minHeight: "40px",
    }),
  };
  return overrideStyles;
};

export type OptionType<T = string> = { label: string; value: T };

export type SelectProps<OptionValue, IsMulti extends boolean> = {
  minWidth?: string;
  placeholder?: string;
  error?: boolean;
  emptyMessage?: string;
} & ReactSelectProps<OptionType<OptionValue>, IsMulti>;

const Select = <OptionValue, IsMulti extends boolean>(
  inProps: SelectProps<OptionValue, IsMulti>,
  ref: React.Ref<HTMLDivElement>,
): React.ReactElement<SelectProps<OptionValue, IsMulti>> => {
  const props = useLocaleProps({ props: inProps, name: "Select" });
  const {
    onInputChange,
    minWidth,
    isDisabled,
    error = false,
    closeMenuOnSelect = true,
    placeholder,
    emptyMessage = "Not found",
    ...rest
  } = props;

  const theme = useTheme();

  const handleInputChange: SelectProps<
    OptionValue,
    IsMulti
  >["onInputChange"] = (newValue: string, actionMeta: { action: string }) => {
    if (onInputChange) {
      onInputChange(newValue, actionMeta);
    }
  };

  return (
    <Styled.Container ref={ref} minWidth={minWidth} isDisabled={isDisabled}>
      <ReactSelect<OptionType<OptionValue>, IsMulti>
        isClearable
        placeholder={placeholder}
        closeMenuOnSelect={closeMenuOnSelect}
        noOptionsMessage={() => emptyMessage}
        isDisabled={isDisabled}
        styles={getOverrideStyles<OptionValue>(theme, error)}
        maxMenuHeight={150}
        // MEMO: use palette in Styled.ReactSelectMenuList
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

// FIXME: Implement without type assertion
export default React.forwardRef(Select) as <
  OptionValue,
  IsMulti extends boolean = false,
>(
  props: SelectProps<OptionValue, IsMulti> & {
    ref?: React.ForwardedRef<HTMLDivElement>;
  },
) => ReturnType<typeof Select>;
