import * as React from "react";
import { components } from "react-select";
import Icon from "../../../Icon";
import * as Styled from "./styled";
import { colors } from "../../../../styles/color";
import { useTheme } from "../../../../themes/useTheme";

const DropdownIndicator = ({ isDisabled, error, ...rest }: any) => {
  const theme = useTheme();
  let color = "";
  if (isDisabled) {
    color = colors.basic[400];
  } else if (error) {
    color = theme.palette.danger.main;
  } else {
    color = theme.palette.black;
  }
  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator {...rest}>
        <Styled.DropdownIndicator menuIsOpen={rest.selectProps.menuIsOpen}>
          <Icon name="arrow_bottom" size="md" color={color} />
        </Styled.DropdownIndicator>
      </components.DropdownIndicator>
    )
  );
};

export { DropdownIndicator };
