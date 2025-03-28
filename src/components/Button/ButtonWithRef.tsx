import * as React from "react";
import { ButtonProps, ButtonHeight, FontSize, BorderRadius, paddingInline, ButtonColor } from "./Button";
import { useTheme } from "../../themes";
import Spacer from "../Spacer";

const ButtonWithRef = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function ButtonWithRef(
    {
      component,
      children,
      color = "primary",
      inline = false,
      size = "medium",
      icon,
      ...rest
    },
    ref
  ) {
    const theme = useTheme();
    
    const getColorStyle = (color: ButtonColor) => {
      switch (color) {
        case "primary":
          return {
            normal: {
              background: theme.palette.primary.main,
              color: theme.palette.text.white,
              boxShadow: theme.shadow["3dShadowPrimary"],
              border: `1px solid ${theme.palette.primary.dark}`,
            },
            hover: {
              background: theme.palette.primary.dark,
              border: "none",
            },
            active: {
              background: theme.palette.primary.dark,
              boxShadow: theme.shadow["3dShadowActive"],
              border: "none",
            },
          };
        case "basicLight":
          return {
            normal: {
              background: theme.palette.background.default,
              color: theme.palette.black,
              boxShadow: theme.shadow["3dShadowBasic"],
              border: `1px solid ${theme.palette.divider}`,
            },
            hover: {
              background: theme.palette.gray.highlight,
              border: `1px solid ${theme.palette.divider}`,
            },
            active: {
              background: theme.palette.gray.highlight,
              boxShadow: theme.shadow["3dShadowActive"],
              border: `1px solid ${theme.palette.divider}`,
            },
          };
        case "basicDark":
          return {
            normal: {
              background: theme.palette.basicDark.main,
              color: theme.palette.black,
              boxShadow: theme.shadow["3dShadowBasic"],
              border: `1px solid ${theme.palette.basicDark.deepDark}`,
            },
            hover: {
              background: theme.palette.basicDark.dark,
              border: "none",
            },
            active: {
              background: theme.palette.basicDark.dark,
              boxShadow: theme.shadow["3dShadowBasicActive"],
              border: "none",
            },
          };
        case "danger":
          return {
            normal: {
              background: theme.palette.danger.main,
              color: theme.palette.text.white,
              boxShadow: theme.shadow["3dShadowDanger"],
              border: `1px solid ${theme.palette.danger.dark}`,
            },
            hover: {
              background: theme.palette.danger.dark,
              border: "none",
            },
            active: {
              background: theme.palette.danger.dark,
              boxShadow: theme.shadow["3dShadowActive"],
              border: "none",
            },
          };
        case "clear":
          return {
            normal: {
              background: "none",
              color: theme.palette.black,
              boxShadow: "none",
              border: "none",
            },
            hover: {
              background: theme.palette.gray.light,
              border: "none",
            },
            active: {
              background: theme.palette.gray.main,
              boxShadow: "none",
              border: "none",
            },
          };
        case "primaryPale":
          return {
            normal: {
              background: theme.palette.primaryPale.main,
              color: theme.palette.primaryPale.dark,
              boxShadow: theme.shadow["3dShadowPrimaryPale"],
              border: `1px solid ${theme.palette.primaryPale.light}`,
            },
            hover: {
              background: theme.palette.primaryPale.highlight,
              border: "none",
            },
            active: {
              background: theme.palette.primaryPale.highlight,
              boxShadow: theme.shadow["3dShadowPrimaryPaleActive"],
              border: "none",
            },
          };
        default:
          return {
            normal: {
              background: theme.palette.primary.main,
              color: theme.palette.text.white,
              boxShadow: theme.shadow["3dShadowPrimary"],
              border: `1px solid ${theme.palette.primary.dark}`,
            },
            hover: {
              background: theme.palette.primary.dark,
              border: "none",
            },
            active: {
              background: theme.palette.primary.dark,
              boxShadow: theme.shadow["3dShadowActive"],
              border: "none",
            },
          };
      }
    };
    
    const colorStyle = getColorStyle(color);

    const anchorProps: {
      as?: string | React.ComponentType<{ className: string; children?: React.ReactNode }>;
      href?: string;
      target?: "_blank" | "_self" | "_parent" | "_top";
      rel?: string;
    } = {};

    if (typeof rest.href === "string") {
      const { href, target, rel } = rest;
      anchorProps.as = component || "a";
      anchorProps.href = href;
      anchorProps.target = target;
      anchorProps.rel = rel;
    }

    const buttonStyle = {
      display: inline ? "inline-flex" : "flex",
      justifyContent: "center",
      alignItems: "center",
      height: ButtonHeight[size],
      width: inline ? "fit-content" : "100%",
      paddingInline: paddingInline[size],
      borderRadius: BorderRadius[size],
      border: colorStyle.normal.border,
      background: colorStyle.normal.background,
      color: colorStyle.normal.color,
      textAlign: "center" as const,
      fontSize: FontSize[size],
      boxShadow: colorStyle.normal.boxShadow,
      transition: "background 0.3s",
      margin: 0,
      cursor: "pointer",
      outline: "none",
      textDecoration: "none",
      letterSpacing: "inherit",
      fontFamily: "inherit",
      lineHeight: "inherit",
    };

    if (typeof rest.href === "string") {
      const { href, target, rel } = rest;
      
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          target={target}
          rel={rel}
          style={buttonStyle}
        >
          {icon && icon}
          {icon && children && <Spacer pr={0.5} />}
          {children}
        </a>
      );
    }
    
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        style={buttonStyle}
        {...rest}
      >
        {icon && icon}
        {icon && children && <Spacer pr={0.5} />}
        {children}
      </button>
    );
  }
);

export default ButtonWithRef;
