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

type ExportedComponentType = {
  (props: Props & React.RefAttributes<HTMLDivElement>): JSX.Element;
  Container: typeof NavigationRailContainer;
  Header: typeof Header;
  Content: typeof Content;
  Footer: typeof Footer;
  Menu: typeof Menu;
  ExpantionMenu: typeof ExpantionMenu;
  ExpantionMenuItem: typeof ExpantionMenuItem;
  Fixture: typeof Fixture;
  MainContent: typeof MainContent;
};

type Props = {
  children?: React.ReactNode;
};

const NavigationRail = React.forwardRef<HTMLDivElement, Props>(
  ({ children }, ref) => {
    const { isOpen, isFixed, handleOpen, handleClose } = React.useContext(
      NavigationRailContext,
    );

    return (
      <Styled.Container
        ref={ref}
        isOpen={isOpen}
        isFixed={isFixed}
        onMouseEnter={handleOpen}
        onMouseLeave={handleClose}
      >
        {children}
      </Styled.Container>
    );
  },
);

const ExportedComponent = NavigationRail as any;
ExportedComponent.Container = NavigationRailContainer;

ExportedComponent.Container = NavigationRailContainer;
ExportedComponent.Header = Header;
ExportedComponent.Content = Content;
ExportedComponent.Footer = Footer;
ExportedComponent.Menu = Menu;
ExportedComponent.ExpantionMenu = ExpantionMenu;
ExportedComponent.ExpantionMenuItem = ExpantionMenuItem;
ExportedComponent.Fixture = Fixture;
ExportedComponent.MainContent = MainContent;

export default ExportedComponent as ExportedComponentType;
