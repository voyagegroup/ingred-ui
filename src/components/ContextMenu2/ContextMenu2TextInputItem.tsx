import React, {
  useState,
  useCallback,
  forwardRef,
  type InputHTMLAttributes,
  type KeyboardEvent,
} from "react";
import styled from "styled-components";
import { colors } from "../../styles";

// 特に機能を持たない、見た目付きのテキスト入力

type ContextMenu2TextInputItemProps = {
  onEnter?: () => void;
} & InputHTMLAttributes<HTMLInputElement>;

const InternalContextMenu2TextInputItem = forwardRef<
  HTMLInputElement,
  ContextMenu2TextInputItemProps
>(({ className, onEnter, ...props }, ref) => {
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
      if (isComposing) {
        onEnter?.();
      }
    },
    [isComposing, onEnter],
  );

  return (
    <div className={className}>
      <input
        {...props}
        ref={ref}
        onKeyDown={handleOnKeyDown}
        onCompositionStart={() => setIsComposing(true)}
        onCompositionEnd={() => setIsComposing(false)}
      />
    </div>
  );
});
InternalContextMenu2TextInputItem.displayName = "ContextMenu2TextInputItem";

export const ContextMenu2TextInputItem = styled(
  InternalContextMenu2TextInputItem,
)`
  padding: 6px 8px;

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
  }
`;
