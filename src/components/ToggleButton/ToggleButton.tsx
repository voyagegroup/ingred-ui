import * as React from "react";
import * as Styled from "./styled";

type Props = {
  active?: boolean;
  disabled?: boolean;
  onChange?: () => void;
  width?: string;
  activeText?: string;
  inActiveText?: string;
};

const ToggleButton: React.FunctionComponent<Props> = ({
  active = false,
  disabled = false,
  onChange,
  width = "56px",
  activeText = "ON",
  inActiveText = "OFF",
}) => (
  <Styled.Container active={active} disabled={disabled}>
    <Styled.Label active={active} disabled={disabled} width={width}>
      <Styled.HiddenInput
        checked={active}
        type="checkbox"
        readOnly={onChange == undefined}
        onChange={disabled ? undefined : onChange}
      />
      <Styled.ToggleButton active={active} disabled={disabled} />
      <Styled.LabelText
        disabled={disabled}
        position={active ? "left" : "right"}
      >
        {active ? activeText : inActiveText}
      </Styled.LabelText>
    </Styled.Label>
  </Styled.Container>
);

export default ToggleButton;
