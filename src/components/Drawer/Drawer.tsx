import React from "react";
import * as Styled from "./styled";
import { DrawerContext } from "./utils";
import { Container } from "./Container";
import { Header, Content, Footer } from "./Inner";
import { MainContent } from "./MainContent";
import { Fixture } from "./Fixture";
import { Menu } from "./Menu";
import { ExpantionMenu } from "./ExpantionMenu";
import { ExpantionMenuItem } from "./ExpantionMenuItem";

type Props = {
  children?: React.ReactNode;
};

const Drawer = ({ children }: Props) => {
  const { isOpen, isFixed, onHandleOpen, onHandleClose } = React.useContext(
    DrawerContext,
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

Drawer.Container = Container;
Drawer.Header = Header;
Drawer.Content = Content;
Drawer.Footer = Footer;
Drawer.Menu = Menu;
Drawer.ExpantionMenu = ExpantionMenu;
Drawer.ExpantionMenuItem = ExpantionMenuItem;
Drawer.Fixture = Fixture;
Drawer.MainContent = MainContent;

export default Drawer;
