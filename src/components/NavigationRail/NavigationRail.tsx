import React from "react";
import * as Styled from "./styled";
import { NavigationRailContext } from "./utils";
import { NavigationRailContainer } from "./NavigationRailContainer";
import { Header, Content, Footer } from "./Inner";
import { MainContent } from "./MainContent";
import { Fixture } from "./Fixture";
import { Menu } from "./Menu";
import { ExpantionMenu } from "./ExpantionMenu";
import { ExpantionMenuItem } from "./ExpantionMenuItem";

type Props = {
  children?: React.ReactNode;
};

const NavigationRail = ({ children }: Props) => {
  const { isOpen, isFixed, onHandleOpen, onHandleClose } = React.useContext(
    NavigationRailContext,
  );

  return (
    <Styled.Container
      isOpen={isOpen}
      isFixed={isFixed}
      onMouseOver={onHandleOpen}
      onMouseOut={onHandleClose}
    >
      {children}
    </Styled.Container>
  );
};

NavigationRail.Container = NavigationRailContainer;
NavigationRail.Header = Header;
NavigationRail.Content = Content;
NavigationRail.Footer = Footer;
NavigationRail.Menu = Menu;
NavigationRail.ExpantionMenu = ExpantionMenu;
NavigationRail.ExpantionMenuItem = ExpantionMenuItem;
NavigationRail.Fixture = Fixture;
NavigationRail.MainContent = MainContent;

export default NavigationRail;
