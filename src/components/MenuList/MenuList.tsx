import React from "react";
import * as Styled from "./styled";
import { Property } from "csstype";
import Divider from "../Divider";
import { Theme, useTheme } from "../../themes";

export type ContentType = "warning" | "disabled";

export type ContentTypeStyle = {
  normal: {
    background: string;
    color: string;
  };
  hover: {
    background: string;
    color: string;
  };
  active: {
    background: string;
    color: string;
  };
};

export const getContentTypeStyles = (
  theme: Theme,
): { [P in ContentType]: ContentTypeStyle } => ({
  warning: {
    normal: {
      background: theme.palette.gray.highlight,
      color: theme.palette.danger.main,
    },
    hover: {
      background: theme.palette.danger.main,
      color: theme.palette.text.white,
    },
    active: {
      background: theme.palette.danger.dark,
      color: theme.palette.text.white,
    },
  },
  disabled: {
    normal: {
      background: "auto",
      color: "disabled",
    },
    hover: {
      background: "auto",
      color: "disabled",
    },
    active: {
      background: "auto",
      color: "disabled",
    },
  },
});

export type ContentProp = React.ComponentPropsWithRef<"div"> & {
  text: string;
  // TODO: rename "handleClick"
  onClick: () => void;
  divideTop?: boolean;
  type?: ContentType;
};

export type MenuListProps = React.ComponentPropsWithRef<"div"> & {
  inline?: boolean;
  contents: ContentProp[];
  maxHeight?: Property.MaxHeight;
};

const MenuList = React.forwardRef<HTMLDivElement, MenuListProps>(
  ({ inline = false, contents, maxHeight = "none", ...rest }, ref) => {
    const theme = useTheme();
    const contentTypeStyles = getContentTypeStyles(theme);

    return (
      <Styled.Container
        inline={inline}
        maxHeight={maxHeight}
        {...rest}
        ref={ref}
      >
        {contents.map((content) => (
          <React.Fragment key={content.text}>
            {content.divideTop && (
              <Divider my={1} mx={2} color={theme.palette.gray.light} />
            )}
            {/* eslint-disable-next-line react/jsx-handler-names */}
            <Styled.TextContainer
              disabled={content.type === "disabled"}
              bgColorAtHover={
                content.type
                  ? contentTypeStyles[content.type]["hover"]["background"]
                  : theme.palette.gray.light
              }
              bgColorAtActive={
                content.type
                  ? contentTypeStyles[content.type]["active"]["background"]
                  : theme.palette.gray.main
              }
              textColorAtHover={
                content.type
                  ? contentTypeStyles[content.type]["hover"]["color"]
                  : theme.palette.black
              }
              onClick={
                content.type === "disabled" ? undefined : content.onClick
              }
            >
              <Styled.Text
                size="sm"
                color={
                  content.type
                    ? contentTypeStyles[content.type]["normal"]["color"]
                    : "initial"
                }
              >
                {content.text}
              </Styled.Text>
            </Styled.TextContainer>
          </React.Fragment>
        ))}
      </Styled.Container>
    );
  },
);

export default MenuList;
