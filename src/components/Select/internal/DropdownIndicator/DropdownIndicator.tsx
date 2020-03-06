import * as React from "react";
import { components } from "react-select";
import Icon from "../../../Icon";
import * as Styled from "./styled";
import { colors } from "../../../../styles/color";
import { useTheme } from "../../../../themes/useTheme";

const DropdownIndicator = ({ isDisabled, error, ...rest }: any) => {
  const theme = useTheme();
  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator {...rest}>
        <Styled.DropdownIndicator menuIsOpen={rest.selectProps.menuIsOpen}>
          <Icon
            name="arrow_bottom"
            size="lg"
            color={
              isDisabled
                ? colors.basic[400]
                : error
                ? `${theme.palette.danger.main}`
                : theme.palette.black
            }
          />
        </Styled.DropdownIndicator>
      </components.DropdownIndicator>
    )
  );
};

export { DropdownIndicator };
