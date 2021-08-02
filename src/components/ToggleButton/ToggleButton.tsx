import * as React from "react";
import * as Styled from "./styled";
import Typography from "../Typography";

export type ToggleButtonProps = React.ComponentPropsWithRef<"input"> & {
  checked?: boolean;
  disabled?: boolean;
  onChange?: () => void;
  width?: string;
  activeText?: string;
  inActiveText?: string;
  inputRef?: React.Ref<HTMLInputElement>;
};

const ToggleButton: React.FunctionComponent<ToggleButtonProps> = ({
  checked = false,
  disabled = false,
  onChange,
  width = "56px",
  activeText = "ON",
  inActiveText = "OFF",
  inputRef,
}) => {
  return (
    <Styled.Container width={width}>
      <Styled.Label checked={checked} disabled={disabled} width={width}>
        <Styled.HiddenInput
          ref={inputRef}
          checked={checked}
          type="checkbox"
          // eslint-disable-next-line react/jsx-handler-names
          readOnly={onChange == undefined}
          disabled={disabled}
          onChange={onChange}
        />
        <Styled.ActiveLabelText>
          <Typography
            component="div"
            color={disabled ? "disabled" : "primary"}
            align="left"
            size="xs"
            weight="bold"
          >
            {activeText}
          </Typography>
        </Styled.ActiveLabelText>
        <Styled.InActiveLabelText>
          <Typography
            component="div"
            color={disabled ? "disabled" : "secondary"}
            align="right"
            size="xs"
            weight="bold"
          >
            {inActiveText}
          </Typography>
        </Styled.InActiveLabelText>
        <Styled.ToggleButton checked={checked} disabled={disabled} />
      </Styled.Label>
    </Styled.Container>
  );
};

export default ToggleButton;
