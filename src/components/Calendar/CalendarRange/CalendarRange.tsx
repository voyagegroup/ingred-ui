import { Dayjs } from "dayjs";
import { Card, Icon, DateRange, Slide } from "../..";
import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Container, IconContainer } from "../styled";
import { Action, Actions } from "../internal/Actions";
import { ClickState, ClickStateType } from "./constants";
import { InnerCalendarRange } from "../internal/InnerCalendarRange/InnerCalendarRange";
import { YearMonths } from "../internal/YearMonths";

export type CalendarRangeProps = React.HTMLAttributes<HTMLDivElement> & {
  /**
   * 開始日
   * @default dayjs()
   */
  startDate: Dayjs;
  /**
   * 終了日
   * @default dayjs()
   */
  endDate: Dayjs;
  /**
   * カレンダーの左に表示するアクション
   */
  actions?: Action[];
  /**
   * 親コンポーネントで calendar を任意のタイミングで閉じたい場合に使用する
   */
  onClose?: (clickState: ClickStateType) => void;
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
  onDatesChange: (dates: DateRange) => void;
};

/**
 * CalendarRange
 * Scrollable calendar UI.
 * Currently, one year from the currently selected date is displayed.
 */
export const CalendarRange = forwardRef<HTMLDivElement, CalendarRangeProps>(
  function CalendarRange(
    {
      startDate,
      endDate,
      actions,
      onClose,
      isOutsideRange = () => false,
      onClickCloseButton,
      onDatesChange,
      ...rest
    },
    ref,
  ) {
    const [current, setCurrent] = React.useState<Dayjs>(startDate);
    const [yearIsOpen, setYearIsOpen] = React.useState(false);

    const handleCloseYear = (date: Dayjs) => {
      setYearIsOpen(false);
      setCurrent(date);
    };

    useEffect(() => {
      setCurrent(startDate);
    }, [startDate]);

    const [clickState, setClickState] = useState<ClickStateType>(
      ClickState.START,
    );

    const handleDateChange = useCallback(
      (value: Dayjs) => {
        onClose && onClose(clickState);
        switch (clickState) {
          case ClickState.START:
            onDatesChange?.({
              startDate: value,
              endDate,
            });
            setClickState(ClickState.END);
            break;
          case ClickState.END:
            onDatesChange?.({
              startDate,
              endDate: value,
            });
            setClickState(ClickState.START);
            break;
          // Maybe, I will add other state.
          default:
            break;
        }
      },
      [onClose, clickState, onDatesChange, endDate, startDate],
    );

    return (
      <Card
        ref={ref}
        display="flex"
        width="fit-content"
        style={{ overflow: "hidden" }}
        {...rest}
      >
        <Actions actions={actions} />
        <Container>
          <div style={{ position: "relative", zIndex: 1 }}>
            <Slide unmountOnExit in={yearIsOpen} direction="up">
              <YearMonths
                date={startDate}
                current={startDate}
                yearIsOpen={yearIsOpen}
                onYearIsOpen={setYearIsOpen}
                onClick={handleCloseYear}
              />
            </Slide>
          </div>
          <div style={{ position: "relative", zIndex: 0 }}>
            <InnerCalendarRange
              startDate={startDate}
              endDate={endDate}
              current={current}
              yearIsOpen={yearIsOpen}
              isOutsideRange={isOutsideRange}
              onYearIsOpen={setYearIsOpen}
              onDateChange={handleDateChange}
            />
          </div>
        </Container>
        {onClickCloseButton && (
          <IconContainer expanded={yearIsOpen} onClick={onClickCloseButton}>
            <Icon name="close" />
          </IconContainer>
        )}
      </Card>
    );
  },
);

export type { DateRange };
export default memo(CalendarRange);
