import { Dayjs } from "dayjs";
import { Card, Icon, Slide } from "../..";
import React, { forwardRef, memo, useEffect } from "react";
import { Container, IconContainer } from "../styled";
import { Action, Actions } from "../internal/Actions";
import { YearMonths } from "../internal/YearMonths";
import { InnerCalendar } from "../internal/InnerCalendar";

export type CalendarProps = React.HTMLAttributes<HTMLDivElement> & {
  /**
   * 日付
   * @default dayjs()
   */
  date: Dayjs;
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
    actions,
    onClickCloseButton,
    isOutsideRange = () => false,
    onDateChange,
    ...rest
  },
  ref,
) {
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
    <Card
      ref={ref}
      display="flex"
      style={{ width: "fit-content", overflow: "hidden" }}
      {...rest}
    >
      <Actions actions={actions} />
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
          yearIsOpen={yearIsOpen}
          isOutsideRange={isOutsideRange}
          onYearIsOpen={setYearIsOpen}
          onDateChange={onDateChange}
        />
      </Container>
      {onClickCloseButton && (
        <IconContainer expanded={yearIsOpen} onClick={onClickCloseButton}>
          <Icon name="close" />
        </IconContainer>
      )}
    </Card>
  );
});

export default memo(Calendar);
