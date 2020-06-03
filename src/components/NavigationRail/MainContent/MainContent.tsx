import React from "react";
import * as Styled from "./styled";
import { NavigationRailContext } from "../utils";

type Props = {
  children: React.ReactNode;
};

const MainContent: React.FC<Props> = ({ children }) => {
  const { isFixed } = React.useContext(NavigationRailContext);

  return <Styled.Container isFixed={isFixed}>{children}</Styled.Container>;
};

export { MainContent };
