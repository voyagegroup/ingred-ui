import * as React from "react";
import * as Styled from "./styled";
import Typography from "../Typography";
import { useLocaleProps } from "../../hooks/useLocaleProps";

export type ToggleButtonProps = {
  active?: boolean;
  disabled?: boolean;
  onChange?: () => void;
  width?: string;
  activeText?: string;
  inActiveText?: string;
  inputRef?: React.Ref<HTMLInputElement>;
};

const ToggleButton = React.forwardRef<HTMLDivElement, ToggleButtonProps>(
  (inProps, ref) => {
    const props = useLocaleProps({ props: inProps, name: "ToggleButton" });
    const {
      active = false,
      disabled = false,
      onChange,
      width = "56px",
      activeText = "ON",
      inActiveText = "OFF",
      inputRef,
    } = props;
    return (
      <Styled.Container ref={ref} width={width}>
        <Styled.Label active={active} disabled={disabled} width={width}>
          <Styled.HiddenInput
            ref={inputRef}
            checked={active}
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
          <Styled.ToggleButton active={active} disabled={disabled} />
        </Styled.Label>
      </Styled.Container>
    );
  },
);

export default ToggleButton;
