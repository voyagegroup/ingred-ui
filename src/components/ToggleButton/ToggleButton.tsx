import * as React from "react";
import * as Styled from "./styled";

type Props = {
  active?: boolean;
  disabled?: boolean;
  onChange?: () => void;
};

const ToggleButton: React.FunctionComponent<Props> = ({
  active = false,
  disabled = false,
  onChange,
}) => (
  <Styled.Container active={active} disabled={disabled}>
    <Styled.Label active={active} disabled={disabled}>
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
        {active ? "ON" : "OFF"}
      </Styled.LabelText>
    </Styled.Label>
  </Styled.Container>
);

export default ToggleButton;
