import { Dayjs } from "dayjs";

export type DateFieldProps = {
  /**
   * 日付
   * @default dayjs()
   */
  date: Dayjs;
  /**
   * 指定したい format
   * @default YYYY-MM-DD
   */
  format?: string;
  /**
   * 入力を無効にする
   * @default false
   */
  disabled?: boolean;
  /**
   * 日付が変更されたときに呼ばれる関数
   */
  onDateChange?: (date: Dayjs) => void;
  /**
   * カレンダーアイコンをクリックした時に呼ばれる関数
   */
  onClick: () => void;
};

export type UseDateFieldProps = Omit<DateFieldProps, "onClick">;

export type Sections = {
  start: number;
  end: number;
  value: string;
  editable: boolean;
  type?: "year" | "month" | "day";
};
