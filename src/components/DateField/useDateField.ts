import { useCallback, useEffect, useRef, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { getSections, formatString } from "./utils";
import { AllowedKeys, allowedKeys, numberKeys } from "../DateField/constants";

// CustomParseFormat の clone
import customParseFormat from "./plugin";

type Props = {
  date: Dayjs | null;
  format?: string;
  onDateChange?: (date: Dayjs) => void;
};

/**
 * 指定された format で日付を表示・操作するための hooks
 * 左右キーでセクション移動、上下キーで選択中のセクションの値を増減する
 * 直接キーボード入力することもできる
 *
 */
export const useDateField = ({
  date,
  format = "YYYY-MM-DD",
  onDateChange,
}: Props) => {
  dayjs.extend(customParseFormat);

  const ref = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(date?.format(format));
  const [sections, setSections] = useState(getSections(value));
  const [placement, setPlacement] = useState({
    start: 0,
    end: sections.length - 1,
    current: 0,
  });

  const [keyDownCount, setKeyDownCount] = useState(0);

  const setCurrent = useCallback(() => {
    setTimeout(() => {
      const selectionStart = ref.current?.selectionStart ?? 0;
      const lastSectionEnd = sections[sections.length - 1].end + 1;
      const currentFocusIndex =
        selectionStart >= lastSectionEnd ? lastSectionEnd : selectionStart;

      const currentSectionIndex = sections.findIndex(
        (section) =>
          currentFocusIndex >= section.start &&
          currentFocusIndex <= section.end + 1,
      );

      setPlacement((prev) => {
        if (prev.current === currentSectionIndex) {
          return prev;
        }

        return {
          ...prev,
          current: currentSectionIndex,
        };
      });

      ref.current?.setSelectionRange(
        sections[currentSectionIndex].start,
        sections[currentSectionIndex].end + 1,
      );
    });
  }, [sections]);

  const onFocus = useCallback(() => {
    setCurrent();
  }, [setCurrent]);

  const onBlur = useCallback(() => {
    setPlacement((prev) => ({
      ...prev,
      current: 0,
    }));
    setKeyDownCount(0);
  }, []);

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (!allowedKeys.includes(event.key as AllowedKeys)) {
        return;
      }

      // 左右キーでセクションを移動する
      // TODO: Tab and Tab + Command
      // ブラウザやOSでの差分吸収がめんどくさいので一旦保留
      if (
        event.key === AllowedKeys.ArrowLeft ||
        event.key === AllowedKeys.ArrowRight
      ) {
        event.preventDefault();

        const getIndex = (key: AllowedKeys) => {
          const currentIndex = placement.current;
          if (key === AllowedKeys.ArrowLeft) {
            for (let i = currentIndex - 1; i >= 0; i--) {
              if (sections[i].editable) {
                return i - currentIndex;
              }
            }
          } else if (key === AllowedKeys.ArrowRight) {
            for (let i = currentIndex + 1; i < sections.length; i++) {
              if (sections[i].editable) {
                return i - currentIndex;
              }
            }
          }

          return 0;
        };

        const key = event.key;

        setPlacement((prev) => ({
          ...prev,
          current: prev.current + getIndex(key),
        }));
      }

      // 上下キーでインクリメント・デクリメントする
      if (
        event.key === AllowedKeys.ArrowUp ||
        event.key === AllowedKeys.ArrowDown
      ) {
        event.preventDefault();
        const i = event.key === AllowedKeys.ArrowUp ? 1 : -1;
        const newValueNumber = Number(sections[placement.current].value) + i;

        const newValue = String(newValueNumber).padStart(
          sections[placement.current].value.length,
          "0",
        );

        const newSections = [...sections];
        newSections[placement.current].value = newValue;

        setSections(newSections);

        const v = formatString(newSections);
        const newDate = dayjs(v, format);

        setValue(newDate.format(format));

        if (newDate.isValid()) {
          onDateChange && onDateChange(newDate);
        }
      }

      // 数字を直接入力した時の挙動
      if (numberKeys.includes(event.key)) {
        event.preventDefault();

        if (keyDownCount === 0) {
          sections[placement.current].value = "".padStart(
            sections[placement.current].value.length,
            "0",
          );
        }

        const newValue = `${sections[placement.current].value.slice(1)}${
          event.key
        }`;

        const newSections = [...sections];
        newSections[placement.current].value = newValue;

        setSections(newSections);

        setKeyDownCount(keyDownCount + 1);

        // そのセクションで入力が完了したら keydown をリセットする
        if (keyDownCount + 1 === sections[placement.current].value.length) {
          setKeyDownCount(0);

          // 入力が完了したら次のセクションに移動する
          // MEMO: 一旦保留
          // if (placement.current + 1 < sections.length) {
          //   setPlacement((prev) => ({
          //     ...prev,
          //     current: prev.current + 1,
          //   }));
          // }

          const v = formatString(sections);

          const newDate = dayjs(v, format);

          setValue(newDate.format(format));
          onDateChange && onDateChange(newDate);
        } else {
          const v = formatString(sections);

          if (!dayjs(v, format, true).isValid()) {
            setValue(v);
            return;
          }

          const newDate = dayjs(v, format);

          setValue(newDate.format(format));
          onDateChange && onDateChange(newDate);
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sections, format, onDateChange, placement],
  );

  const onMouseDown = useCallback(() => {
    setCurrent();
  }, [setCurrent]);

  // 日付をコピペした時の挙動
  // どのセクションにフォーカスしていてもペーストした日付がすべてのセクションに適用される
  const onPaste = useCallback(
    (event: React.ClipboardEvent<HTMLInputElement>) => {
      event.preventDefault();

      const pastedText = event.clipboardData.getData("text");
      const newDate = dayjs(pastedText);

      onDateChange && onDateChange(newDate);
    },
    [onDateChange],
  );

  // input をクリックしたときにカーソルを正しい位置に移動する
  useEffect(() => {
    ref.current?.setSelectionRange(
      sections[placement.current].start,
      sections[placement.current].end + 1,
    );
  }, [placement, sections]);

  // 日付が変更されたら input と sections を更新する
  useEffect(() => {
    setValue(date?.format(format));
    setSections(getSections(date?.format(format)));
  }, [date, format]);

  return {
    ref,
    value,
    onFocus,
    onBlur,
    onKeyDown,
    onMouseDown,
    onPaste,
  };
};
