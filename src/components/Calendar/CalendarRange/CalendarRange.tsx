import { Dayjs } from "dayjs";
import { Icon, DateRange, Slide } from "../..";
import React, {
  forwardRef,
  memo,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Container, IconContainer, Card } from "../styled";
import { Action, Actions } from "../internal/Actions";
import { ClickState, ClickStateType } from "./constants";
import { InnerCalendarRange } from "../internal/InnerCalendarRange/InnerCalendarRange";
import { YearMonths } from "../internal/YearMonths";
import { useTheme } from "../../../themes";

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
   * アクションをクリックしたときの挙動
   */
  onClickAction?: (action: Action) => void;
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
      monthFormat = "YYYY年M月",
      weekList = ["日", "月", "火", "水", "木", "金", "土"],
      defaultClickAction,
      actions,
      onClickAction,
      onClose,
      isOutsideRange = () => false,
      onClickCloseButton,
      onDatesChange,
      ...rest
    },
    ref,
  ) {
    const theme = useTheme();
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
      <Card ref={ref} {...rest}>
        <Actions
          defaultClickAction={defaultClickAction}
          actions={actions}
          onClickAction={onClickAction}
        />
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
              monthFormat={monthFormat}
              weekList={weekList}
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
            <Icon name="close" color={theme.palette.black} />
          </IconContainer>
        )}
      </Card>
    );
  },
);

export type { DateRange };
export default memo(CalendarRange);
