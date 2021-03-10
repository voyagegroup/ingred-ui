import React from "react";
import * as Styled from "./styled";
import { Property } from "csstype";
import Divider from "../Divider";
import Typography from "../Typography";
import { useTheme } from "../../themes";

export type ContentProp = React.ComponentPropsWithRef<"div"> & {
  text: string;
  // TODO: rename "handleClick"
  onClick: () => void;
  divideTop?: boolean;
  disabled?: boolean;
};

export type MenuListProps = React.ComponentPropsWithRef<"div"> & {
  inline?: boolean;
  contents: ContentProp[];
  maxHeight?: Property.MaxHeight;
};

const MenuList = React.forwardRef<HTMLDivElement, MenuListProps>(
  ({ inline = false, contents, maxHeight = "none", ...rest }, ref) => {
    const theme = useTheme();
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
              disabled={content.disabled}
              onClick={content.onClick}
            >
              <Typography
                size="sm"
                color={content.disabled ? "disabled" : "initial"}
              >
                {content.text}
              </Typography>
            </Styled.TextContainer>
          </React.Fragment>
        ))}
      </Styled.Container>
    );
  },
);

export default MenuList;
