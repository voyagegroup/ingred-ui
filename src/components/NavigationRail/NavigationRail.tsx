import React from "react";
import { ExpansionMenu } from "./ExpansionMenu";
import { ExpansionMenuItem } from "./ExpansionMenuItem";
import { Fixture } from "./Fixture";
import { Header, Content, Footer } from "./Inner";
import { MainContent } from "./MainContent";
import { Menu } from "./Menu";
import { NavigationRailContainer } from "./NavigationRailContainer";
import * as Styled from "./styled";
import { NavigationRailContext } from "./utils";

type ExportedComponentType = {
  (props: Props & React.RefAttributes<HTMLDivElement>): JSX.Element;
  Container: typeof NavigationRailContainer;
  Header: typeof Header;
  Content: typeof Content;
  Footer: typeof Footer;
  Menu: typeof Menu;
  ExpansionMenu: typeof ExpansionMenu;
  ExpansionMenuItem: typeof ExpansionMenuItem;
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
ExportedComponent.ExpansionMenu = ExpansionMenu;
ExportedComponent.ExpansionMenuItem = ExpansionMenuItem;
ExportedComponent.Fixture = Fixture;
ExportedComponent.MainContent = MainContent;

export default ExportedComponent as ExportedComponentType;
