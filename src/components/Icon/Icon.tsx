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
import { ArrowDoubleLeftIcon } from "./internal/ArrowDoubleLeftIcon";
import { QuestionIcon } from "./internal/QuestionIcon";
import { ZoomInIcon } from "./internal/ZoomInIcon";
import { SortUpIcon } from "./internal/SortUpIcon";
import { SortDownIcon } from "./internal/SortDownIcon";
import { SortInactiveIcon } from "./internal/SortInactiveIcon";
import { FolderIcon } from "./internal/FolderIcon";
import { FolderOpenIcon } from "./internal/FolderOpenIcon";
import { ReturnLineIcon } from "./internal/ReturnLineIcon";
import { LinkIcon } from "./internal/LinkIcon";
import { UnlinkIcon } from "./internal/UnlinkIcon";
import { NoLinkIcon } from "./internal/NoLinkIcon";
import { SearchIcon } from "./internal/SearchIcon";
import { ExportIcon } from "./internal/ExportIcon";
import { AddLineIcon } from "./internal/AddLineIcon";
import { MoreVertIcon } from "./internal/MoreVertIcon";
import { ArrowDoubleRightIcon } from "./internal/ArrowDoubleRightIcon";
import { DateRangeIcon } from "./internal/DateRangeIcon";
import { ImportIcon } from "./internal/ImportIcon";
import { ExternalLinkIcon } from "./internal/ExternalLinkIcon";
import { MobileIcon } from "./internal/MobileIcon";
import { DesktopIcon } from "./internal/DesktopIcon";
import { DesktopMobileIcon } from "./internal/DesktopMobileIcon";
import { CopyIcon } from "./internal/CopyIcon";
import { BarChartFramedIcon } from "./internal/BarChartFramedIcon";
import { LineChartFramedIcon } from "./internal/LineChartFramedIcon";
import { MultiLineChartFramedIcon } from "./internal/MultiLineChartFramedIcon";
import { TruckIcon } from "./internal/TruckIcon";
import { CameraMovieIcon } from "./internal/CameraMovieIcon";
import { CodeFileIcon } from "./internal/CodeFileIcon";
import { CartSecureIcon } from "./internal/CartSecureIcon";
import { ProfileIcon } from "./internal/ProfileIcon";
import { AuctionIcon } from "./internal/AuctionIcon";
import { MailIcon } from "./internal/MailIcon";
import { MailOpenIcon } from "./internal/MailOpenIcon";
import { FilterIcon } from "./internal/FilterIcon";
import { MoreIcon } from "./internal/MoreIcon";
import { NotificationIcon } from "./internal/NotificationIcon";
import { UserSettingsIcon } from "./internal/UserSettingsIcon";
import { CompanySettingsIcon } from "./internal/CompanySettingsIcon";
import { HeartPulseIcon } from "./internal/HeartPulseIcon";
import { CheckBoxCircleIcon } from "./internal/CheckBoxCircleIcon";
import { AlartIcon } from "./internal/AlartIcon";
import { BaseStationIcon } from "./internal/BaseStationIcon";
import { BrailleIcon } from "./internal/BrailleIcon";
import { LabelIcon } from "./internal/LabelIcon";
import { DownloadCloudIcon } from "./internal/DownloadCloudIcon";
import { SaveIcon } from "./internal/SaveIcon";
import { CloseCircleIcon } from "./internal/CloseCircleIcon";
import { BidStrapIcon } from "./internal/BidStrapIcon";
import { FluctIcon } from "./internal/FluctIcon";
import { DataStrapIcon } from "./internal/DataStrapIcon";

export type IconName =
  | "dashboard"
  | "bar_chart"
  | "bar_chart_framed"
  | "line_chart_framed"
  | "multi_line_chart_framed"
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
  | "arrow_double_left"
  | "arrow_double_right"
  | "question"
  | "zoom_in"
  | "sort_up"
  | "sort_down"
  | "sort_inactive"
  | "folder"
  | "folder_open"
  | "return_line"
  | "link"
  | "unlink"
  | "no_link"
  | "search"
  | "import"
  | "export"
  | "add_line"
  | "more"
  | "more_vert"
  | "date_range"
  | "external_link"
  | "desktop"
  | "mobile"
  | "desktop_mobile"
  | "copy"
  | "truck"
  | "camera_movie"
  | "code_file"
  | "cart_secure"
  | "profile"
  | "auction"
  | "mail"
  | "mail_open"
  | "filter"
  | "notification"
  | "user_settings"
  | "company_settings"
  | "heart_pulse"
  | "checkbox_circle"
  | "alart"
  | "base_station"
  | "braille"
  | "label"
  | "download_cloud"
  | "save"
  | "close_circle"
  | "bid_strap"
  | "fluct"
  | "data_strap";

type IconType = "fill" | "line";
type IconColor = IconType | "active" | string;
type IconSize = "sm" | "md" | "lg";
export const iconSize: { [key in IconSize]: number } = {
  sm: 12,
  md: 18,
  lg: 24,
};
export type IconProps = {
  type: IconType;
  fill: string;
};

// for storybook
export const icons: {
  [key in IconName]: React.FunctionComponent<IconProps>;
} = {
  dashboard: DashboardIcon,
  bar_chart: BarChartIcon,
  bar_chart_framed: BarChartFramedIcon,
  line_chart_framed: LineChartFramedIcon,
  multi_line_chart_framed: MultiLineChartFramedIcon,
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
  arrow_double_left: ArrowDoubleLeftIcon,
  arrow_double_right: ArrowDoubleRightIcon,
  question: QuestionIcon,
  zoom_in: ZoomInIcon,
  sort_up: SortUpIcon,
  sort_down: SortDownIcon,
  sort_inactive: SortInactiveIcon,
  folder: FolderIcon,
  folder_open: FolderOpenIcon,
  return_line: ReturnLineIcon,
  link: LinkIcon,
  unlink: UnlinkIcon,
  no_link: NoLinkIcon,
  search: SearchIcon,
  import: ImportIcon,
  export: ExportIcon,
  add_line: AddLineIcon,
  more: MoreIcon,
  more_vert: MoreVertIcon,
  date_range: DateRangeIcon,
  external_link: ExternalLinkIcon,
  desktop: DesktopIcon,
  mobile: MobileIcon,
  desktop_mobile: DesktopMobileIcon,
  copy: CopyIcon,
  truck: TruckIcon,
  camera_movie: CameraMovieIcon,
  code_file: CodeFileIcon,
  cart_secure: CartSecureIcon,
  profile: ProfileIcon,
  auction: AuctionIcon,
  mail: MailIcon,
  mail_open: MailOpenIcon,
  filter: FilterIcon,
  notification: NotificationIcon,
  user_settings: UserSettingsIcon,
  company_settings: CompanySettingsIcon,
  heart_pulse: HeartPulseIcon,
  checkbox_circle: CheckBoxCircleIcon,
  alart: AlartIcon,
  base_station: BaseStationIcon,
  braille: BrailleIcon,
  label: LabelIcon,
  download_cloud: DownloadCloudIcon,
  save: SaveIcon,
  close_circle: CloseCircleIcon,
  bid_strap: BidStrapIcon,
  fluct: FluctIcon,
  data_strap: DataStrapIcon,
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

export type Props = {
  name: IconName;
  type?: IconType;
  size?: IconSize;
  color?: IconColor;
};

const Icon = React.forwardRef<HTMLDivElement, Props>(
  ({ name, type = "line", size = "md", color = "fill" }, ref) => {
    const theme = useTheme();
    return (
      <Styled.Container ref={ref} size={iconSize[size]}>
        {iconFactory(name)({ type, fill: getIconColor(color, theme) })}
      </Styled.Container>
    );
  },
);

export default Icon;
