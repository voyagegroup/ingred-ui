import * as React from "react";
import { Property } from "csstype";
import * as Styled from "./styled";
import { useTheme } from "../../themes/useTheme";

export type SpinnerProps = {
  width?: Property.Width;
};

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ width = "50px" }, ref) => {
    const theme = useTheme();
    return (
      <Styled.Container ref={ref} width={width}>
        <Styled.Svg viewBox="25 25 50 50">
          <Styled.Circle
            cx="50"
            cy="50"
            r="20"
            stroke={theme.palette.gray.light}
          />
          <Styled.PrimaryCircle
            cx="50"
            cy="50"
            r="20"
            stroke={theme.palette.primary.main}
          />
        </Styled.Svg>
      </Styled.Container>
    );
  },
);

export default Spinner;
