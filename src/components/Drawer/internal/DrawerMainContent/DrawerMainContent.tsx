import React from "react";
import * as Styled from "./styled";
import { DrawerContext } from "../../utils";

type Props = {
  children: React.ReactNode;
};

const DrawerMainContent: React.FC<Props> = ({ children }) => {
  const { isFixed } = React.useContext(DrawerContext);

  return <Styled.Container isFixed={isFixed}>{children}</Styled.Container>;
};

export { DrawerMainContent };
