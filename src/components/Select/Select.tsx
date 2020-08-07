import * as React from "react";
import ReactSelect, {
  Props as ReactSelectProps,
  StylesConfig,
} from "react-select";
import * as Styled from "./styled";
import { Space } from "../../styles";
import { fontSize } from "../Typography/Typography";
import { DropdownIndicator } from "./internal/DropdownIndicator";
import { ClearIndicator } from "./internal/ClearIndicator";
import { MultiValueRemove } from "./internal/MultiValueRemove";
import { Theme, useTheme } from "../../themes";

const getOverrideStyles = (theme: Theme, error: boolean) => {
  const overrideStyles: StylesConfig = {
    control: (base, { menuIsOpen }) => ({
      ...base,
      boxShadow: `0 -2px 0 0 ${theme.palette.gray.light} inset`,
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
      marginTop: "-1px", // controlのborderBottom分ネガティヴマージンを当てる
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
    option: (base, { isSelected, isFocused }) => {
      let backgroundColor = "transparent";
      if (isSelected) {
        backgroundColor = theme.palette.primary.main;
      } else if (isFocused) {
        backgroundColor = theme.palette.gray.light;
      }
      return {
        ...base,
        padding: `4px ${Space}px 5px`,
        color: isSelected ? theme.palette.white : theme.palette.black,
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
      backgroundColor: theme.palette.gray.light,
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
        backgroundColor: theme.palette.gray.main,
      },
    }),
    valueContainer: (base) => ({
      ...base,
      padding: "8px",
    }),
  };
  return overrideStyles;
};

export type OptionType<T = string> = { label: string; value: T };

export type Props = {
  limit?: number;
  minWidth?: string;
  error?: boolean;
} & ReactSelectProps;
const Select: React.FunctionComponent<Props> = ({
  limit,
  onInputChange,
  minWidth,
  error = false,
  ...rest
}) => {
  const theme = useTheme();
  let i = 0;
  const filterOption: Props["filterOption"] = limit
    ? ({ label }, query) => label.indexOf(query) >= 0 && i++ < limit
    : undefined;
  const onHandleInputChange: Props["onInputChange"] = (
    newValue,
    actionMeta,
  ) => {
    i = 0;
    if (onInputChange) {
      onInputChange(newValue, actionMeta);
    }
  };

  const getEmptyMessage = () => {
    return "見つかりませんでした";
  };
  return (
    <Styled.Container minWidth={minWidth}>
      <ReactSelect
        isClearable
        components={{
          DropdownIndicator: (props) => (
            <DropdownIndicator {...props} error={error} />
          ),
          ClearIndicator,
          IndicatorSeparator: null,
          MultiValueRemove,
        }}
        placeholder="選択してください"
        noOptionsMessage={getEmptyMessage}
        styles={getOverrideStyles(theme, error)}
        maxMenuHeight={150}
        {...rest}
        filterOption={filterOption}
        onInputChange={onHandleInputChange}
      />
    </Styled.Container>
  );
};

export default Select;
