import React, {
  forwardRef,
  useState,
  useCallback,
  useContext,
  type InputHTMLAttributes,
  type KeyboardEvent,
  type CompositionEvent,
  useEffect,
} from "react";
import styled from "styled-components";
import { colors } from "../../styles";
import { ContextMenu2Context } from "./context";

// 特に機能を持たない、見た目付きのテキスト入力

type ContextMenu2TextInputItemProps = {
  onEnter?: () => void;
} & InputHTMLAttributes<HTMLInputElement>;

const InternalContextMenu2TextInputItem = forwardRef<
  HTMLInputElement,
  ContextMenu2TextInputItemProps
>(
  (
    {
      className,
      onEnter,
      onKeyDown,
      onCompositionStart,
      onCompositionEnd,
      ...props
    },
    ref,
  ) => {
    const { activeIndex, maxActiveIndex, setActiveIndex } =
      useContext(ContextMenu2Context);
    const [isIOS, setIsIOS] = useState(false);
    const [isComposing, setIsComposing] = useState(false);
    // Floating UI の useListNavigation によるキーボード操作を無効化する
    // 文字入力中は、矢印キーや Esc キーを利用するが、それにより Floating UI のキーボード操作が実行されるのを防ぐ
    const disableFloatingUIKeyboardNavigation = (
      event: KeyboardEvent<HTMLInputElement>,
    ) => {
      event.stopPropagation();
    };

    const handleOnKeyDown = useCallback(
      (event: KeyboardEvent<HTMLInputElement>) => {
        disableFloatingUIKeyboardNavigation(event);
        onKeyDown?.(event);
        if (isComposing) return;
        if (event.key === "Enter") {
          onEnter?.();
          return;
        }
        if (event.key === "ArrowDown") {
          event.preventDefault();
          const newActiveIndex = activeIndex === null ? 1 : activeIndex + 1;
          setActiveIndex(
            newActiveIndex > maxActiveIndex ? null : newActiveIndex,
          );
          return;
        }
        if (event.key === "ArrowUp") {
          event.preventDefault();
          const newActiveIndex = activeIndex === null ? 1 : activeIndex - 1;
          setActiveIndex(newActiveIndex < 0 ? maxActiveIndex : newActiveIndex);
          return;
        }
      },
      [
        isComposing,
        activeIndex,
        maxActiveIndex,
        onEnter,
        onKeyDown,
        setActiveIndex,
      ],
    );

    const handleCompositionStart = useCallback(
      (event: CompositionEvent<HTMLInputElement>) => {
        onCompositionStart?.(event);
        setIsComposing(true);
      },
      [onCompositionStart],
    );

    const handleCompositionEnd = useCallback(
      (event: CompositionEvent<HTMLInputElement>) => {
        onCompositionEnd?.(event);
        setIsComposing(false);
      },
      [onCompositionEnd],
    );

    useEffect(() => {
      setIsIOS(/iPad|iPhone/.test(navigator.userAgent));
    }, []);

    return (
      <div className={className}>
        <input
          {...props}
          ref={ref}
          data-ios={isIOS}
          onKeyDown={handleOnKeyDown}
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
        />
      </div>
    );
  },
);
InternalContextMenu2TextInputItem.displayName = "ContextMenu2TextInputItem";

export const ContextMenu2TextInputItem = styled(
  InternalContextMenu2TextInputItem,
)`
  // padding: 6px 8px;

  input {
    display: block;
    box-sizing: border-box;
    width: 100%;
    padding: 6px 8px;
    border-radius: 6px;
    border: 1px solid ${colors.basic[400]};
    /* UI/Text 13 */
    font-size: 13px;
    line-height: 19px;
    color: ${colors.basic[900]};
    background: ${colors.basic[100]};

    &[data-ios="true"] {
      font-size: 16px;
    }
  }
`;
