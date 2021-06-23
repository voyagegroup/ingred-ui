import React from "react";
import * as Styled from "./styled";
import { Property } from "csstype";
import { Theme, useTheme } from "../../themes";
import Divider from "../Divider";
import Typography from "../Typography";

export type ContentType = "default" | "warning" | "disabled";

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
  type?: ContentType,
): ContentTypeStyle => {
  const contentTypeStyle = {
    default: {
      normal: {
        background: theme.palette.background.default,
        color: theme.palette.black,
      },
      hover: {
        background: theme.palette.gray.light,
        color: theme.palette.black,
      },
      active: {
        background: theme.palette.gray.main,
        color: theme.palette.black,
      },
    },
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
  };

  if (type) {
    return contentTypeStyle[type];
  } else {
    return contentTypeStyle.default;
  }
};

export type ContentProp = React.ComponentPropsWithoutRef<"div"> & {
  text: string;
  onClick: () => void;
  divideTop?: boolean;
  type?: ContentType;

  /**
   * @deprecated
   *
   * I'll delete it in the future.
   * Please use "type: disabled".
   */
  disabled?: boolean;
};

export type GroupContentProp = React.ComponentPropsWithoutRef<"div"> & {
  title: string;
  contents: ContentProp[];
};

export type MenuListProps = React.ComponentPropsWithoutRef<"div"> & {
  inline?: boolean;
  contents: Array<ContentProp | GroupContentProp>;
  maxHeight?: Property.MaxHeight;
};

const MenuList = React.forwardRef<HTMLDivElement, MenuListProps>(
  ({ inline = false, contents, maxHeight = "none", ...rest }, ref) => {
    const theme = useTheme();

    const checkIsDisabled = (type?: ContentType, disabled?: boolean) => {
      if (type === "disabled" || disabled === true) {
        return true;
      }
      return false;
    };

    // TODO: I'll delete in the future.
    const selectStyleInDisabledProp = (
      theme: Theme,
      type?: ContentType,
      disabled?: boolean,
    ) => {
      if (checkIsDisabled(type, disabled)) {
        return getContentTypeStyles(theme, "disabled");
      }
      return getContentTypeStyles(theme, type);
    };

    const handleClick =
      (content: ContentProp, disabled?: boolean) => (): void => {
        if (checkIsDisabled(content.type, disabled)) {
          return;
        }
        content.onClick();
      };

    const isGroupContent = (
      content: GroupContentProp | ContentProp,
    ): content is GroupContentProp => {
      if (content.title === "") return true;
      return !!content.title;
    };

    const renderContent = (content: ContentProp) => (
      <React.Fragment key={content.text}>
        {content.divideTop && (
          <Divider my={1} mx={2} color={theme.palette.gray.light} />
        )}
        <Styled.TextContainer
          disabled={checkIsDisabled(content.type, content.disabled)}
          normal={
            selectStyleInDisabledProp(theme, content.type, content.disabled)
              .normal
          }
          hover={
            selectStyleInDisabledProp(theme, content.type, content.disabled)
              .hover
          }
          active={
            selectStyleInDisabledProp(theme, content.type, content.disabled)
              .active
          }
          onClick={handleClick(content, content.disabled)}
        >
          <Styled.Text
            size="sm"
            color={
              selectStyleInDisabledProp(theme, content.type, content.disabled)
                .normal.color
            }
          >
            {content.text}
          </Styled.Text>
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
        {contents.map((content) =>
          isGroupContent(content) ? (
            <React.Fragment key={content.title}>
              {content.title && (
                <Styled.TitleContainer>
                  <Typography
                    size="xs"
                    color={theme.palette.text.secondary}
                    weight="bold"
                  >
                    {content.title}
                  </Typography>
                </Styled.TitleContainer>
              )}
              {content.contents.map(renderContent)}
            </React.Fragment>
          ) : (
            renderContent(content)
          ),
        )}
      </Styled.Container>
    );
  },
);

export default MenuList;
