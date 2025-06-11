import * as React from "react";
import * as Styled from "./styled";
import { useTheme } from "../../themes";
import Typography from "../Typography";
import Flex from "../Flex";
import Icon from "../Icon";
import { IconName } from "../Icon/Icon";

export type BannerType = "info" | "warning" | "error";
export type BannerSize = "small" | "medium";

export type BannerProps = {
  /**
   * バナーのタイプ
   * @default "info"
   */
  type?: BannerType;
  /**
   * バナーのサイズ
   * @default "medium"
   */
  size?: BannerSize;
  /**
   * バナーに表示するメッセージ
   */
  message: React.ReactNode;
  /**
   * 追加のCSSクラス
   */
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const getIconNameByType = (type: BannerType): IconName => {
  switch (type) {
    case "info":
      return "information";
    case "warning":
      return "alert";
    case "error":
      return "alert";
    default:
      return "information";
  }
};

const Banner = React.forwardRef<HTMLDivElement, BannerProps>(function Banner(
  { type = "info", size = "medium", message, className, ...rest },
  ref,
) {
  const theme = useTheme();
  const iconName = getIconNameByType(type);

  const getIconColor = () => {
    switch (type) {
      case "info":
        return theme.palette.primary.main;
      case "warning":
        return theme.palette.warning.main;
      case "error":
        return theme.palette.danger.main;
      default:
        return theme.palette.primary.main;
    }
  };

  return (
    <Styled.Container
      ref={ref}
      type={type}
      size={size}
      className={className}
      {...rest}
    >
      <Flex display="flex" alignItems="center">
        <Icon
          name={iconName}
          size={size === "small" ? "md-lg" : "lg"}
          color={getIconColor()}
        />
        <Typography
          color="inherit"
          component="div"
          size={size === "small" ? "sm" : "md"}
        >
          {message}
        </Typography>
      </Flex>
    </Styled.Container>
  );
});

export default Banner;
