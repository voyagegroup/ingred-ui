import React, {
  useState,
  type ReactNode,
  type ReactElement,
  type Ref,
  type ButtonHTMLAttributes,
  useEffect,
} from "react";
import {
  ContextMenu2,
  ContextMenu2ButtonControlsItem,
  ContextMenu2Container,
  ContextMenu2HeadingItem,
  ContextMenu2SeparatorItem,
  ContextMenu2TextInputItem,
} from "../ContextMenu2";
import Button from "../Button";
import * as styled from "./styled";

////////////////////////////////////////////////////////////////////////////////
// Public Components
////////////////////////////////////////////////////////////////////////////////
type DataTable2InlineEditorProps = {
  trigger: ReactElement<
    ButtonHTMLAttributes<HTMLButtonElement> & {
      ref?: Ref<HTMLButtonElement>;
    },
    "button"
  >;
  label: string;
  value: string;
  children: ReactNode;
  onChange: (value: string) => void;
};

export const DataTable2InlineEditor = ({
  trigger,
  label,
  value,
  children,
  onChange,
}: DataTable2InlineEditorProps) => {
  const [userValue, setUserValue] = useState(value);
  const [isOpen, setIsOpen] = useState(false);
  const handleCancel = () => {
    setIsOpen(false);
    setUserValue(value);
  };
  const handleApply = () => {
    setIsOpen(false);
    onChange(userValue);
  };
  useEffect(() => {
    setUserValue(value);
  }, [value]);
  return (
    <styled.DataTable2InlineEditor>
      {children}
      <styled.DataTable2InlineEditorButton>
        <ContextMenu2Container>
          <ContextMenu2
            width={252}
            trigger={trigger}
            open={isOpen}
            onOpenChange={setIsOpen}
          >
            <ContextMenu2HeadingItem>{label}</ContextMenu2HeadingItem>
            <ContextMenu2TextInputItem
              value={userValue}
              onChange={(event) => setUserValue(event.target.value)}
              onEnter={handleApply}
            />
            <ContextMenu2SeparatorItem />
            <ContextMenu2ButtonControlsItem>
              <Button
                type="button"
                color="clear"
                size="small"
                onClick={handleCancel}
              >
                キャンセル
              </Button>
              <Button
                type="button"
                color="primary"
                size="small"
                onClick={handleApply}
              >
                適用
              </Button>
            </ContextMenu2ButtonControlsItem>
          </ContextMenu2>
        </ContextMenu2Container>
      </styled.DataTable2InlineEditorButton>
    </styled.DataTable2InlineEditor>
  );
};
