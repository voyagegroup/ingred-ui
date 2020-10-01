import * as React from "react";
import * as Styled from "./styled";
import Typography from "../Typography";

export type ToggleButtonProps = {
  active?: boolean;
  disabled?: boolean;
  onChange?: () => void;
  width?: string;
  activeText?: string;
  inActiveText?: string;
  inputRef?: React.Ref<HTMLInputElement>;
};

const ToggleButton: React.FunctionComponent<ToggleButtonProps> = ({
  active = false,
  disabled = false,
  onChange,
  width = "56px",
  activeText = "ON",
  inActiveText = "OFF",
  inputRef,
}) => {
  const textColor = active ? "primary" : "secondary";
  return (
    <Styled.Container active={active} disabled={disabled} width={width}>
      <Styled.Label active={active} disabled={disabled} width={width}>
        <Styled.HiddenInput
          ref={inputRef}
          checked={active}
          type="checkbox"
          readOnly={onChange == undefined}
          disabled={disabled}
          onChange={onChange}
        />
        <Styled.ToggleButton active={active} disabled={disabled} />
        <Styled.LabelText position={active ? "left" : "right"}>
          <Typography
            component="div"
            color={disabled ? "disabled" : textColor}
            size="xs"
            weight="bold"
          >
            {active ? activeText : inActiveText}
          </Typography>
        </Styled.LabelText>
      </Styled.Label>
    </Styled.Container>
  );
};

export default ToggleButton;
