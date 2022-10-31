import dayjs from "dayjs";
import moment from "moment";

// moment.jsで動いているreact-datesと互換性を持たせるためのメソッド
// DatePickerとDateRangePickerのリニューアルが完了したら除去する
export function dayjsToMoment(date: dayjs.Dayjs | null): moment.Moment | null {
  if (!date) return null;
  const dateString = date.format();
  return moment(dateString);
}

export function momentToDayjs(date: moment.Moment | null): dayjs.Dayjs | null {
  if (!date) return null;
  const dateString = date.format();
  return dayjs(dateString);
}
