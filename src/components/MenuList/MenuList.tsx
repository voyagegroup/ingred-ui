import React from "react";
import * as Styled from "./styled";
import { Property } from "csstype";
import Divider from "../Divider";
import Typography from "../Typography";
import { useTheme } from "../../themes";

export type ContentProp = React.ComponentPropsWithRef<"div"> & {
  text: string;
  onClick: () => void;
  divideTop?: boolean;
  disabled?: boolean;
};

export type GroupContentProp = React.ComponentPropsWithRef<"div"> & {
  title: string;
  contents: ContentProp[];
};

export type MenuListProps = React.ComponentPropsWithRef<"div"> & {
  inline?: boolean;
  contents: ContentProp[] | GroupContentProp[];
  maxHeight?: Property.MaxHeight;
};

const MenuList = React.forwardRef<HTMLDivElement, MenuListProps>(
  ({ inline = false, contents, maxHeight = "none", ...rest }, ref) => {
    const theme = useTheme();

    const renderGroupContent = (content: GroupContentProp) => (
      <>
        <Styled.TitleContainer>
          <Typography size="sm">{content.title}</Typography>
        </Styled.TitleContainer>
        {content.contents.map((content: ContentProp) => (
          <Styled.TextContainer
            key={content.title}
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
        ))}
      </>
    );

    const renderContent = (content: ContentProp) => (
      <React.Fragment key={content.text}>
        {content.divideTop && (
          <Divider my={1} mx={2} color={theme.palette.gray.light} />
        )}
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
    );

    return (
      <Styled.Container
        inline={inline}
        maxHeight={maxHeight}
        {...rest}
        ref={ref}
      >
        {contents.map((content: ContentProp | GroupContentProp) =>
          content.title
            ? renderGroupContent(content as GroupContentProp)
            : renderContent(content as ContentProp),
        )}
      </Styled.Container>
    );
  },
);

export default MenuList;
