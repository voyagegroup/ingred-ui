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
    <label className="react-switch-label">
      <input
        checked={active}
        className="react-switch-checkbox"
        type="checkbox"
        readOnly={onChange == undefined}
        onChange={disabled ? undefined : onChange}
      />
      <span className="react-switch-button" />
      {active ? (
        <Styled.LeftLabel disabled={disabled}>ON</Styled.LeftLabel>
      ) : (
        <Styled.RightLabel disabled={disabled}>OFF</Styled.RightLabel>
      )}
    </label>
  </Styled.Container>
);

export default ToggleButton;
