import * as React from "react";
import ReactSelect, {
  Props as ReactSelectProps,
  StylesConfig,
} from "react-select";
import * as Styled from "./styled";
import { Space, Size } from "../../styles";
import { colors } from "../../styles/color";
import { fontSize } from "../Typography/Typography";
import { DropdownIndicator } from "./internal/DropdownIndicator";
import { ClearIndicator } from "./internal/ClearIndicator";
import { MultiValueRemove } from "./internal/MultiValueRemove";
import { Theme, useTheme } from "../../themes";

const getOverrideStyles = (theme: Theme, error: boolean) => {
  const overrideStyles: StylesConfig = {
    control: (base, { menuIsOpen }) => ({
      ...base,
      boxShadow: `0 -${Size.Border.Normal} 0 0 ${theme.palette.gray.light} inset`,
      borderTopColor: `${colors.basic[300]}`,
      borderRightColor: `${colors.basic[300]}`,
      borderLeftColor: `${colors.basic[300]}`,
      borderBottomColor: menuIsOpen ? `transparent` : `${colors.basic[300]}`,
      borderColor: error ? `${theme.palette.danger.main}!important` : "",
      borderRadius: menuIsOpen ? "4px 4px 0 0" : "4px",
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
      borderRadius: "0 0 4px 4px",
      borderRight: `${Size.Border.Small} solid ${
        error ? theme.palette.danger.main : colors.basic[300]
      }`,
      borderBottom: `${Size.Border.Small} solid ${
        error ? theme.palette.danger.main : colors.basic[300]
      }`,
      borderLeft: `${Size.Border.Small} solid ${
        error ? theme.palette.danger.main : colors.basic[300]
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
          backgroundColor: colors.basic[300],
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
    singleValue: (base) => {
      let color = theme.palette.black;
      if (error) {
        color = theme.palette.danger.main;
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
      borderRadius: "4px",
    }),
    multiValueLabel: (base) => ({
      ...base,
      padding: 0,
      fontSize: `${fontSize.sm}px`,
      color: theme.palette.black,
    }),
    multiValueRemove: (base) => ({
      ...base,
      ":hover": {
        backgroundColor: colors.basic[300],
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
