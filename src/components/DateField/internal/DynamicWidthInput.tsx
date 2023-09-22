import React, {
  InputHTMLAttributes,
  forwardRef,
  useLayoutEffect,
  useRef,
} from "react";
import { useMergeRefs } from "../../../hooks/useMergeRefs";
import Input from "../../Input/Input";
import { Dummy, InputContainer } from "./styled";
import { useTheme } from "../../../themes";

export const DynamicWidthInput = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement> & {
    error?: boolean;
  }
>(function DynamicWidthInput(props, propRef) {
  const theme = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);

  const ref = useMergeRefs<HTMLInputElement>(propRef, inputRef);

  useLayoutEffect(() => {
    if (spanRef.current && inputRef.current) {
      const spanWidth = spanRef.current.getBoundingClientRect().width;
      inputRef.current.style.width = `${spanWidth + theme.spacing * 2.5}px`;
    }
  }, [props.value, theme.spacing]);

  return (
    <InputContainer>
      <Input ref={ref} {...props} />
      <Dummy
        ref={spanRef}
        style={{
          position: "absolute",
          whiteSpace: "pre",
          visibility: "hidden",
        }}
      >
        {props.value}
      </Dummy>
    </InputContainer>
  );
});
