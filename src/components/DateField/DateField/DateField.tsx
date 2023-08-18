import React, { forwardRef, memo } from "react";
import { Icon, Input } from "../..";
import { useDateField } from "../useDateField";
import { useMergeRefs } from "../../../hooks/useMergeRefs";
import { CalendarIcon, InputContainer } from "./styled";
import { DateFieldProps } from "../types";

const DateField = forwardRef<HTMLInputElement, DateFieldProps>(
  function DateField({ disabled = false, onClick, ...rest }, propRef) {
    const { ref: inputRef, ...props } = useDateField({ ...rest });
    const ref = useMergeRefs<HTMLInputElement>(propRef, inputRef);

    return (
      <InputContainer disabled={disabled}>
        <Input
          ref={ref}
          readOnly
          disabled={disabled}
          style={{ border: "none" }}
          {...props}
        />
        <CalendarIcon onClick={onClick}>
          <Icon name="date_range" />
        </CalendarIcon>
      </InputContainer>
    );
  },
);

export type { DateFieldProps } from "../types";
export default memo(DateField);
