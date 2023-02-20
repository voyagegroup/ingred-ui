import * as React from "react";
import { useLocaleProps } from "../../hooks/useLocaleProps";
import Typography from "../Typography";
import * as Styled from "./styled";

export type ToggleButtonProps = React.ComponentPropsWithRef<"input"> & {
  disabled?: boolean;
  onChange?: () => void;
  width?: string;
  checkedText?: string;
  unCheckedText?: string;
  inputRef?: React.Ref<HTMLInputElement>;
};

const ToggleButton = React.forwardRef<HTMLDivElement, ToggleButtonProps>(
  (inProps, ref) => {
    const props = useLocaleProps({ props: inProps, name: "ToggleButton" });
    const {
      checked = false,
      disabled = false,
      onChange,
      width = "56px",
      checkedText = "ON",
      unCheckedText = "OFF",
      inputRef,
    } = props;
    return (
      <Styled.Container ref={ref} width={width}>
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
          <Styled.CheckedLabelText>
            <Typography
              component="div"
              color={disabled ? "disabled" : "primary"}
              align="left"
              size="xs"
              weight="bold"
            >
              {checkedText}
            </Typography>
          </Styled.CheckedLabelText>
          <Styled.UnCheckedLabelText>
            <Typography
              component="div"
              color={disabled ? "disabled" : "secondary"}
              align="right"
              size="xs"
              weight="bold"
            >
              {unCheckedText}
            </Typography>
          </Styled.UnCheckedLabelText>
          <Styled.ToggleButton checked={checked} disabled={disabled} />
        </Styled.Label>
      </Styled.Container>
    );
  },
);

export default ToggleButton;
