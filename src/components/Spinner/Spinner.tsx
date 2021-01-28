import * as React from "react";
import { Property } from "csstype";
import * as Styled from "./styled";
import { useTheme } from "../../themes/useTheme";

export type SpinnerProps = {
  width?: Property.Width;
};

const Spinner: React.FunctionComponent<SpinnerProps> = ({ width = "50px" }) => {
  const theme = useTheme();
  return (
    <Styled.Container width={width}>
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
};

export default Spinner;
