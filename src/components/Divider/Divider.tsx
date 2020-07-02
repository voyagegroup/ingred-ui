import React from "react";
import * as Styled from "./styled";

type Props = {
  variant?: "fullWidth" | "middle";
};

const Divider: React.FunctionComponent<Props> = ({ variant = "fullWidth" }) => (
  <Styled.Divider variant={variant} />
);

export default Divider;
