import React from "react";
import * as Styled from "./styled";
import { NavigationRailContext } from "../utils";

type Props = {
  children: React.ReactNode;
};

const MainContent = React.forwardRef<HTMLDivElement, Props>(
  ({ children }, ref) => {
    const { isFixed } = React.useContext(NavigationRailContext);

    return (
      <Styled.Container ref={ref} isFixed={isFixed}>
        {children}
      </Styled.Container>
    );
  },
);

export { MainContent };
