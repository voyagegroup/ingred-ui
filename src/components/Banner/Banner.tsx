import * as React from "react";
import * as Styled from "./styled";
import { useTheme } from "../../themes";
import Typography from "../Typography";
import Flex from "../Flex";
import Icon from "../Icon";
import { IconName } from "../Icon/Icon";
import { BannerProps } from "./types";

type AriaLive = "polite" | "assertive" | "off";

// タイプごとの設定をマッピングオブジェクトとして定義
const bannerTypeConfig = {
  info: {
    iconName: "information" as IconName,
    getColor: (theme: any) => theme.palette.primary.main,
    role: "status",
    ariaLive: "polite" as AriaLive,
  },
  warning: {
    iconName: "alert" as IconName,
    getColor: (theme: any) => theme.palette.warning.deepDark,
    role: "alert",
    ariaLive: "polite" as AriaLive,
  },
  error: {
    iconName: "alert" as IconName,
    getColor: (theme: any) => theme.palette.danger.main,
    role: "alert",
    ariaLive: "assertive" as AriaLive,
  },
};

const Banner = React.forwardRef<HTMLDivElement, BannerProps>(function Banner(
  { type = "info", size = "medium", message, children, className, ...rest },
  ref,
) {
  const theme = useTheme();
  const config = bannerTypeConfig[type] || bannerTypeConfig.info;
  const iconName = config.iconName;
  const iconColor = config.getColor(theme);

  // messageとchildrenの両方が提供された場合、messageを優先
  const content = message || children;

  return (
    <Styled.Container
      ref={ref}
      type={type}
      size={size}
      className={className}
      role={config.role}
      aria-live={config.ariaLive}
      {...rest}
    >
      <Flex display="flex" alignItems="center">
        <Icon
          name={iconName}
          size={size === "small" ? "md-lg" : "lg"}
          color={iconColor}
        />
        {typeof content === "string" || typeof content === "number" ? (
          <Typography
            color="inherit"
            component="div"
            size={size === "small" ? "sm" : "md"}
          >
            {content}
          </Typography>
        ) : (
          <Styled.ContentWrapper size={size}>{content}</Styled.ContentWrapper>
        )}
      </Flex>
    </Styled.Container>
  );
});

export default Banner;
