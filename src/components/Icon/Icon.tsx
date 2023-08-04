import * as React from "react";
import { Theme } from "../../themes";
import { useTheme } from "../../themes/useTheme";
import { AdBlockIcon } from "./internal/AdBlockIcon";
import { AddLineIcon } from "./internal/AddLineIcon";
import { AlartIcon } from "./internal/AlartIcon";
import { AnalyticsIcon } from "./internal/AnalyticsIcon";
import { AppsIcon } from "./internal/AppsIcon";
import { ArrowBottomIcon } from "./internal/ArrowBottomIcon";
import { ArrowDoubleLeftIcon } from "./internal/ArrowDoubleLeftIcon";
import { ArrowDoubleRightIcon } from "./internal/ArrowDoubleRightIcon";
import { ArrowLeftIcon } from "./internal/ArrowLeftIcon";
import { ArrowRightIcon } from "./internal/ArrowRightIcon";
import { AuctionIcon } from "./internal/AuctionIcon";
import { BarChartFramedIcon } from "./internal/BarChartFramedIcon";
import { BarChartIcon } from "./internal/BarChartIcon";
import { BarChartSearchIcon } from "./internal/BarChartSearchIcon";
import { BaseStationIcon } from "./internal/BaseStationIcon";
import { BidStrapIcon } from "./internal/BidStrapIcon";
import { BrailleIcon } from "./internal/BrailleIcon";
import { BuildingIcon } from "./internal/BuildingIcon";
import { CalendarIcon } from "./internal/CalendarIcon";
import { CameraMovieIcon } from "./internal/CameraMovieIcon";
import { CartSecureIcon } from "./internal/CartSecureIcon";
import { CheckBoxCircleIcon } from "./internal/CheckBoxCircleIcon";
import { CheckIcon } from "./internal/CheckIcon";
import { CheckThinIcon } from "./internal/CheckThinIcon";
import { CloseCircleIcon } from "./internal/CloseCircleIcon";
import { CloseIcon } from "./internal/CloseIcon";
import { CodeFileIcon } from "./internal/CodeFileIcon";
import { CompanyIcon } from "./internal/CompanyIcon";
import { CompanySettingsIcon } from "./internal/CompanySettingsIcon";
import { CopyIcon } from "./internal/CopyIcon";
import { DashboardIcon } from "./internal/DashboardIcon";
import { DataStrapIcon } from "./internal/DataStrapIcon";
import { DateRangeIcon } from "./internal/DateRangeIcon";
import { DeleteBinIcon } from "./internal/DeleteBinIcon";
import { DesktopIcon } from "./internal/DesktopIcon";
import { DesktopMobileIcon } from "./internal/DesktopMobileIcon";
import { DocumentIcon } from "./internal/DocumentIcon";
import { DownloadCloudIcon } from "./internal/DownloadCloudIcon";
import { DraftIcon } from "./internal/DraftIcon";
import { ExclamationIcon } from "./internal/ExclamationIcon";
import { ExportIcon } from "./internal/ExportIcon";
import { ExternalLinkIcon } from "./internal/ExternalLinkIcon";
import { EyeIcon } from "./internal/EyeIcon";
import { EyeOffIcon } from "./internal/EyeOffIcon";
import { FileListIcon } from "./internal/FileListIcon";
import { FilterIcon } from "./internal/FilterIcon";
import { FluctIcon } from "./internal/FluctIcon";
import { FolderIcon } from "./internal/FolderIcon";
import { FolderOpenIcon } from "./internal/FolderOpenIcon";
import { ForbidIcon } from "./internal/ForbidIcon";
import { HeartPulseIcon } from "./internal/HeartPulseIcon";
import { ImageIcon } from "./internal/ImageIcon";
import { ImportIcon } from "./internal/ImportIcon";
import { InformationIcon } from "./internal/InformationIcon";
import { LabelIcon } from "./internal/LabelIcon";
import { LineChartFramedIcon } from "./internal/LineChartFramedIcon";
import { LinkIcon } from "./internal/LinkIcon";
import { LogoutIcon } from "./internal/LogoutIcon";
import { MailIcon } from "./internal/MailIcon";
import { MailOpenIcon } from "./internal/MailOpenIcon";
import { MenuIcon } from "./internal/MenuIcon";
import { MobileIcon } from "./internal/MobileIcon";
import { MoreIcon } from "./internal/MoreIcon";
import { MoreVertIcon } from "./internal/MoreVertIcon";
import { MultiLineChartFramedIcon } from "./internal/MultiLineChartFramedIcon";
import { NoLinkIcon } from "./internal/NoLinkIcon";
import { NotificationIcon } from "./internal/NotificationIcon";
import { PencilIcon } from "./internal/PencilIcon";
import { PlayCircleIcon } from "./internal/PlayCircleIcon";
import { ProfileIcon } from "./internal/ProfileIcon";
import { QuestionIcon } from "./internal/QuestionIcon";
import { RefreshLineIcon } from "./internal/RefreshLine";
import { ReturnLineIcon } from "./internal/ReturnLineIcon";
import { SaveIcon } from "./internal/SaveIcon";
import { SearchIcon } from "./internal/SearchIcon";
import { SettingIcon } from "./internal/SettingIcon";
import { SortAscIcon } from "./internal/SortAscIcon";
import { SortDescIcon } from "./internal/SortDescIcon";
import { SortDownIcon } from "./internal/SortDownIcon";
import { SortInactiveIcon } from "./internal/SortInactiveIcon";
import { SortUpIcon } from "./internal/SortUpIcon";
import { StopCircleIcon } from "./internal/StopCircleIcon";
import { SupportIcon } from "./internal/SupportIcon";
import { TimeIcon } from "./internal/TimeIcon";
import { TruckIcon } from "./internal/TruckIcon";
import { UnlinkIcon } from "./internal/UnlinkIcon";
import { UserIcon } from "./internal/UserIcon";
import { UserSettingsIcon } from "./internal/UserSettingsIcon";
import { ZoomInIcon } from "./internal/ZoomInIcon";
import * as Styled from "./styled";

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
  | "refresh_line"
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
  | "data_strap"
  | "company"
  | "document"
  | "user"
  | "information"
  | "analytics"
  | "support"
  | "apps"
  | "ad_block"
  | "building"
  | "image"
  | "calendar"
  | "menu"
  | "file_list"
  | "draft"
  | "time"
  | "stop_circle"
  | "play_circle"
  | "sort_asc"
  | "sort_desc"
  | "bar_chart_search"
  | "check_thin";

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
  refresh_line: RefreshLineIcon,
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
  company: CompanyIcon,
  document: DocumentIcon,
  user: UserIcon,
  information: InformationIcon,
  analytics: AnalyticsIcon,
  support: SupportIcon,
  apps: AppsIcon,
  ad_block: AdBlockIcon,
  building: BuildingIcon,
  image: ImageIcon,
  calendar: CalendarIcon,
  menu: MenuIcon,
  file_list: FileListIcon,
  draft: DraftIcon,
  time: TimeIcon,
  stop_circle: StopCircleIcon,
  play_circle: PlayCircleIcon,
  sort_asc: SortAscIcon,
  sort_desc: SortDescIcon,
  bar_chart_search: BarChartSearchIcon,
  check_thin: CheckThinIcon,
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

const Icon = React.forwardRef<HTMLSpanElement, Props>(
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
