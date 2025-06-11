import * as React from "react";
import * as Styled from "./styled";
import { useTheme } from "../../themes";
import Typography from "../Typography";
import Flex from "../Flex";
import Icon from "../Icon";
import { IconName } from "../Icon/Icon";
import { BannerProps, BannerType } from "./types";

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
  { type = "info", size = "medium", message, children, className, ...rest },
  ref,
) {
  const theme = useTheme();
  const iconName = getIconNameByType(type);

  const getIconColor = () => {
    switch (type) {
      case "info":
        return theme.palette.primary.main;
      case "warning":
        return theme.palette.warning.deepDark;
      case "error":
        return theme.palette.danger.main;
      default:
        return theme.palette.primary.main;
    }
  };

  // messageとchildrenの両方が提供された場合、messageを優先
  const content = message || children;

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
