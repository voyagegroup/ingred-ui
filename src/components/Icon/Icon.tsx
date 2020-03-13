import * as React from "react";
import * as Styled from "./styled";
import { Theme } from "../../themes";
import { useTheme } from "../../themes/useTheme";
import { DashboardIcon } from "./internal/DashboardIcon";
import { BarChartIcon } from "./internal/BarChartIcon";
import { LogoutIcon } from "./internal/LogoutIcon";
import { SettingIcon } from "./internal/SettingIcon";
import { ArrowBottomIcon } from "./internal/ArrowBottomIcon";
import { ArrowLeftIcon } from "./internal/ArrowLeftIcon";
import { ArrowRightIcon } from "./internal/ArrowRightIcon";
import { PencilIcon } from "./internal/PencilIcon";
import { DeleteBinIcon } from "./internal/DeleteBinIcon";
import { CloseIcon } from "./internal/CloseIcon";
import { ForbidIcon } from "./internal/ForbidIcon";
import { CheckIcon } from "./internal/CheckIcon";
import { EyeIcon } from "./internal/EyeIcon";
import { EyeOffIcon } from "./internal/EyeOffIcon";
import { ExclamationIcon } from "./internal/ExclamationIcon";
import { ArrowDoubleIcon } from "./internal/ArrowDoubleIcon";
import { QuestionIcon } from "./internal/QuestionIcon";
import { ZoomInIcon } from "./internal/ZoomInIcon";
import { SortUpIcon } from "./internal/SortUpIcon";
import { SortDownIcon } from "./internal/SortDownIcon";
import { SortInactiveIcon } from "./internal/SortInactiveIcon";
import { FolderIcon } from "./internal/FolderIcon";
import { ReturnLineIcon } from "./internal/ReturnLineIcon";
import { LinkIcon } from "./internal/LinkIcon";
import { UnlinkIcon } from "./internal/UnlinkIcon";
import { NoLinkIcon } from "./internal/NoLinkIcon";
import { SearchIcon } from "./internal/SearchIcon";

export type IconName =
  | "dashboard"
  | "bar_chart"
  | "logout"
  | "setting"
  | "arrow_bottom"
  | "arrow_left"
  | "arrow_right"
  | "pencil"
  | "delete_bin"
  | "close"
  | "forbid"
  | "check"
  | "eye"
  | "eye_off"
  | "exclamation"
  | "arrow_double"
  | "question"
  | "zoom_in"
  | "sort_up"
  | "sort_down"
  | "sort_inactive"
  | "folder"
  | "return_line"
  | "link"
  | "unlink"
  | "no_link"
  | "search";
type IconType = "fill" | "line";
type IconColor = IconType | "active" | string;
type IconSize = "sm" | "md" | "lg";
export const iconSize: { [key in IconSize]: number } = {
  sm: 12,
  md: 18,
  lg: 24
};
export interface IconProps {
  type: IconType;
  fill: string;
}

// for storybook
export const icons: {
  [key in IconName]: React.FunctionComponent<IconProps>;
} = {
  dashboard: DashboardIcon,
  bar_chart: BarChartIcon,
  logout: LogoutIcon,
  setting: SettingIcon,
  arrow_bottom: ArrowBottomIcon,
  arrow_left: ArrowLeftIcon,
  arrow_right: ArrowRightIcon,
  pencil: PencilIcon,
  delete_bin: DeleteBinIcon,
  close: CloseIcon,
  forbid: ForbidIcon,
  check: CheckIcon,
  eye: EyeIcon,
  eye_off: EyeOffIcon,
  exclamation: ExclamationIcon,
  arrow_double: ArrowDoubleIcon,
  question: QuestionIcon,
  zoom_in: ZoomInIcon,
  sort_up: SortUpIcon,
  sort_down: SortDownIcon,
  sort_inactive: SortInactiveIcon,
  folder: FolderIcon,
  return_line: ReturnLineIcon,
  link: LinkIcon,
  unlink: UnlinkIcon,
  no_link: NoLinkIcon,
  search: SearchIcon
};

const iconFactory = (name: IconName) => (props: IconProps) => {
  const Component = icons[name];
  return <Component {...props} />;
};

const getIconColor = (color: IconColor, theme: Theme) => {
  switch (color) {
    case "fill":
    case "line":
    case "active":
      return theme.palette.icon[color];
    default:
      return color;
  }
};

export interface Props {
  name: IconName;
  type?: IconType;
  size?: IconSize;
  color?: IconColor;
}
const Icon: React.FunctionComponent<Props> = ({
  name,
  type = "line",
  size = "md",
  color = "fill"
}) => {
  const theme = useTheme();
  return (
    <Styled.Container size={iconSize[size]}>
      {iconFactory(name)({ type, fill: getIconColor(color, theme) })}
    </Styled.Container>
  );
};

export default Icon;
