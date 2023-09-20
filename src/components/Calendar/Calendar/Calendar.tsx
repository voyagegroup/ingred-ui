import { Dayjs } from "dayjs";
import { Icon, Slide } from "../..";
import React, { forwardRef, memo, useEffect } from "react";
import { Container, IconContainer, Card } from "../styled";
import { Action, Actions } from "../internal/Actions";
import { YearMonths } from "../internal/YearMonths";
import { InnerCalendar } from "../internal/InnerCalendar";
import { useTheme } from "../../../themes";

export type CalendarProps = React.HTMLAttributes<HTMLDivElement> & {
  /**
   * 日付
   * @default dayjs()
   */
  date: Dayjs;
  /**
   * カレンダーに表示する年月のフォーマット
   */
  monthFormat?: string;
  /**
   * カレンダーに表示する曜日のリスト
   * @memo dayjs().format("ddd") で対応したいが、階層が深くなったりするので一旦静的な値で対処
   */
  weekList?: string[];
  /**
   * デフォルトで選択されているアクション
   */
  defaultClickAction?: string;
  /**
   * カレンダーの左に表示するアクション
   */
  actions?: Action[];
  /**
   * 閉じるボタンを押したときの振る舞い
   * この関数が渡されてないときは、閉じるボタンが表示されない
   */
  onClickCloseButton?: () => void;
  /**
   * 選択可能なカレンダーの領域を制限する
   * true が返る場合は、選択不可となる
   * @default () => false
   */
  isOutsideRange?: (date: Dayjs) => boolean;
  /**
   * 日付が変更されたときに呼ばれる関数
   */
  onDateChange: (value: Dayjs) => void;
};

const Calendar = forwardRef<HTMLDivElement, CalendarProps>(function Calendar(
  {
    date,
    monthFormat = "YYYY年M月",
    weekList = ["日", "月", "火", "水", "木", "金", "土"],
    defaultClickAction,
    actions,
    onClickCloseButton,
    isOutsideRange = () => false,
    onDateChange,
    ...rest
  },
  ref,
) {
  const theme = useTheme();
  const [current, setCurrent] = React.useState<Dayjs>(date);
  const [yearIsOpen, setYearIsOpen] = React.useState(false);

  const handleCloseYear = (date: Dayjs) => {
    setYearIsOpen(false);
    setCurrent(date);
  };

  useEffect(() => {
    setCurrent(date);
  }, [date]);

  return (
    <Card ref={ref} {...rest}>
      <Actions defaultClickAction={defaultClickAction} actions={actions} />
      <Container>
        <Slide unmountOnExit in={yearIsOpen} direction="up">
          <YearMonths
            date={date}
            current={date}
            yearIsOpen={yearIsOpen}
            onYearIsOpen={setYearIsOpen}
            onClick={handleCloseYear}
          />
        </Slide>
        <InnerCalendar
          date={date}
          current={current}
          monthFormat={monthFormat}
          weekList={weekList}
          yearIsOpen={yearIsOpen}
          isOutsideRange={isOutsideRange}
          onYearIsOpen={setYearIsOpen}
          onDateChange={onDateChange}
        />
      </Container>
      {onClickCloseButton && (
        <IconContainer expanded={yearIsOpen} onClick={onClickCloseButton}>
          <Icon name="close" color={theme.palette.black} />
        </IconContainer>
      )}
    </Card>
  );
});

export default memo(Calendar);
