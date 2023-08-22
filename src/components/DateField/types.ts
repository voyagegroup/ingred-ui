import { DateFieldProps } from "./DateField/DateField";

export type UseDateFieldProps = Omit<DateFieldProps, "onClick">;

export type Sections = {
  start: number;
  end: number;
  value: string;
  editable: boolean;
  type?: "year" | "month" | "day";
};
