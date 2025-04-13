import * as React from "react";
import * as Styled from "./styled";
import { Theme } from "../../themes";
import { useTheme } from "../../themes/useTheme";
import { DashboardIcon } from "./internal/DashboardIcon";
import { BarChartIcon } from "./internal/BarChartIcon";
import { LogoutIcon } from "./internal/LogoutIcon";
import { SettingIcon } from "./internal/SettingIcon";
import { ArrowUpIcon } from "./internal/ArrowUpIcon";
import { ArrowDownIcon } from "./internal/ArrowDownIcon";
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
import { ExpandDiagonalSFillIcon } from "./internal/ExpandDiagonalSFillIcon";
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
import { AlertIcon } from "./internal/AlertIcon";
import { BaseStationIcon } from "./internal/BaseStationIcon";
import { BrailleIcon } from "./internal/BrailleIcon";
import { LabelIcon } from "./internal/LabelIcon";
import { DownloadCloudIcon } from "./internal/DownloadCloudIcon";
import { SaveIcon } from "./internal/SaveIcon";
import { CloseCircleIcon } from "./internal/CloseCircleIcon";
import { BidStrapIcon } from "./internal/BidStrapIcon";
import { FluctIcon } from "./internal/FluctIcon";
import { DataStrapIcon } from "./internal/DataStrapIcon";
import { CompanyIcon } from "./internal/CompanyIcon";
import { DocumentIcon } from "./internal/DocumentIcon";
import { UserIcon } from "./internal/UserIcon";
import { InformationIcon } from "./internal/InformationIcon";
import { AnalyticsIcon } from "./internal/AnalyticsIcon";
import { SupportIcon } from "./internal/SupportIcon";
import { AppsIcon } from "./internal/AppsIcon";
import { AdBlockIcon } from "./internal/AdBlockIcon";
import { RefreshLineIcon } from "./internal/RefreshLine";
import { BuildingIcon } from "./internal/BuildingIcon";
import { ImageIcon } from "./internal/ImageIcon";
import { CalendarIcon } from "./internal/CalendarIcon";
import { MenuIcon } from "./internal/MenuIcon";
import { FileListIcon } from "./internal/FileListIcon";
import { DraftIcon } from "./internal/DraftIcon";
import { TimeIcon } from "./internal/TimeIcon";
import { StopCircleIcon } from "./internal/StopCircleIcon";
import { PlayCircleIcon } from "./internal/PlayCircleIcon";
import { SortAscIcon } from "./internal/SortAscIcon";
import { SortDescIcon } from "./internal/SortDescIcon";
import { BarChartSearchIcon } from "./internal/BarChartSearchIcon";
import { CheckThinIcon } from "./internal/CheckThinIcon";
import { ImageCheckIcon } from "./internal/ImageCheckIcon";
import { Group2Icon } from "./internal/Group2Icon";
import { KeyIcon } from "./internal/KeyIcon";
import { OperatorMatchIcon } from "./internal/OperatorMatchIcon";
import { OperatorDoesNotMatchIcon } from "./internal/OperatorDoesNotMatchIcon";
import { OperatorContainsIcon } from "./internal/OperatorContainsIcon";
import { OperatorDoesNotContainsIcon } from "./internal/OperatorDoesNotContainsIcon";
import { OperatorStartsWithIcon } from "./internal/OperatorStartsWithIcon";
import { OperatorEndsWithIcon } from "./internal/OperatorEndsWithIcon";
import { OperatorEqualIcon } from "./internal/OperatorEqualIcon";
import { OperatorNotEqualIcon } from "./internal/OperatorNotEqualIcon";
import { OperatorGreaterThanIcon } from "./internal/OperatorGreaterThanIcon";
import { OperatorGreaterThanOrEqualToIcon } from "./internal/OperatorGreaterThanOrEqualToIcon";
import { OperatorLessThanIcon } from "./internal/OperatorLessThanIcon";
import { OperatorLessThanOrEqualToIcon } from "./internal/OperatorLessThanOrEqualToIcon";

/** @deprecated "arrow_bottom" は "arrow_down" に置き換わりました */
type DeprecatedArrowBottom = "arrow_bottom";

export type IconName =
  | "dashboard"
  | "bar_chart"
  | "bar_chart_framed"
  | "line_chart_framed"
  | "multi_line_chart_framed"
  | "logout"
  | "setting"
  | "arrow_up"
  | "arrow_down"
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
  | "expand_diagonal_s_fill"
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
  | "alert"
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
  | "check_thin"
  | "image_check"
  | "group2"
  | "key"
  | "operator_match"
  | "operator_does_not_match"
  | "operator_contains"
  | "operator_does_not_contains"
  | "operator_starts_with"
  | "operator_ends_with"
  | "operator_equal"
  | "operator_not_equal"
  | "operator_greater_than"
  | "operator_greater_than_or_equal_to"
  | "operator_less_than"
  | "operator_less_than_or_equal_to";

type IconType = "fill" | "line";
type IconColor = IconType | "active" | string;
export type IconSize = "sm" | "sm-md" | "md" | "md-lg" | "lg";
export const iconSize: { [key in IconSize]: number } = {
  sm: 12,
  "sm-md": 16,
  md: 18,
  "md-lg": 20,
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
  arrow_up: ArrowUpIcon,
  arrow_down: ArrowDownIcon,
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
  expand_diagonal_s_fill: ExpandDiagonalSFillIcon,
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
  alert: AlertIcon,
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
  image_check: ImageCheckIcon,
  group2: Group2Icon,
  key: KeyIcon,
  operator_match: OperatorMatchIcon,
  operator_does_not_match: OperatorDoesNotMatchIcon,
  operator_contains: OperatorContainsIcon,
  operator_does_not_contains: OperatorDoesNotContainsIcon,
  operator_starts_with: OperatorStartsWithIcon,
  operator_ends_with: OperatorEndsWithIcon,
  operator_equal: OperatorEqualIcon,
  operator_not_equal: OperatorNotEqualIcon,
  operator_greater_than: OperatorGreaterThanIcon,
  operator_greater_than_or_equal_to: OperatorGreaterThanOrEqualToIcon,
  operator_less_than: OperatorLessThanIcon,
  operator_less_than_or_equal_to: OperatorLessThanOrEqualToIcon,
};

const iconFactory = (name: IconName | DeprecatedArrowBottom) => {
  const nameNormalized = name === "arrow_bottom" ? "arrow_down" : name;
  const IconComponent = (props: IconProps) => {
    const Component = icons[nameNormalized];
    return <Component {...props} />;
  };
  IconComponent.displayName = `IconComponent(${nameNormalized})`;

  return IconComponent;
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

export type Props =
  | {
      name: IconName;
      type?: IconType;
      size?: IconSize;
      color?: IconColor;
      alt?: string;
    }
  | {
      /** @deprecated "arrow_bottom" は "arrow_down" に置き換わりました */
      name: DeprecatedArrowBottom;
      type?: IconType;
      size?: IconSize;
      color?: IconColor;
      alt?: string;
    };

const Icon = React.forwardRef<HTMLSpanElement, Props>(function Icon(
  { name, type = "line", size = "md", color = "fill", alt = undefined },
  ref,
) {
  const theme = useTheme();
  return (
    <Styled.Container ref={ref} size={iconSize[size]} aria-label={alt}>
      {iconFactory(name)({ type, fill: getIconColor(color, theme) })}
    </Styled.Container>
  );
});

export default Icon;
