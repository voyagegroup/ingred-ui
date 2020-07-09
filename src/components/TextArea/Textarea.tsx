import * as React from "react";
import * as Styled from "./styled";
import Spacer from "../Spacer";
import ErrorText from "../ErrorText";

type Props = React.ComponentPropsWithoutRef<"textarea"> & {
  resize?: "none" | "both" | "horizontal" | "vertical" | "inherit";
  errorText?: string;
};

const Textarea = React.forwardRef<HTMLTextAreaElement, Props>(
  ({ errorText, resize = "both", ...rest }, ref) => (
    <Styled.Container>
      <Styled.Textarea
        {...rest}
        ref={ref}
        isError={!!errorText}
        resize={resize}
      />
      {errorText && (
        <Spacer pt={1}>
          <ErrorText>{errorText}</ErrorText>
        </Spacer>
      )}
    </Styled.Container>
  ),
);

export default Textarea;
