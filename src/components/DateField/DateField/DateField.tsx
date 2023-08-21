import React, { forwardRef, memo } from "react";
import { ErrorText, Icon, Input, Spacer } from "../..";
import { useDateField } from "../useDateField";
import { useMergeRefs } from "../../../hooks/useMergeRefs";
import { CalendarIcon, InputContainer } from "./styled";
import { DateFieldProps } from "../types";

const DateField = forwardRef<HTMLInputElement, DateFieldProps>(
  function DateField(
    { errorText, disabled = false, onClick, ...rest },
    propRef,
  ) {
    const { ref: inputRef, ...props } = useDateField({ ...rest });
    const ref = useMergeRefs<HTMLInputElement>(propRef, inputRef);

    return (
      <>
        <InputContainer disabled={disabled} error={!!errorText}>
          <Input
            ref={ref}
            readOnly
            style={{ border: "none" }}
            error={!!errorText}
            disabled={disabled}
            {...props}
          />
          <CalendarIcon onClick={onClick}>
            <Icon name="date_range" />
          </CalendarIcon>
        </InputContainer>
        {errorText && (
          <Spacer pt={1}>
            <ErrorText>{errorText}</ErrorText>
          </Spacer>
        )}
      </>
    );
  },
);

export type { DateFieldProps } from "../types";
export default memo(DateField);
