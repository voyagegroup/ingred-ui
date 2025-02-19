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
  ContextMenu2CheckItem,
} from "../ContextMenu2";
import Button from "../Button";
import ActionButton from "../ActionButton";
import * as styled from "./styled";

////////////////////////////////////////////////////////////////////////////////
// Public Components
////////////////////////////////////////////////////////////////////////////////
type DataTable2InlineEditorProps = {
  label: string;
  value: string;
  children: ReactNode;
  onChange: (value: string) => void;
};

export const DataTable2InlineEditor = ({
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
            trigger={
              <ActionButton type="button" color="primary" icon="pencil" />
            }
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

type DataTable2InlineSelectEditorProps = {
  label: string;
  value: string;
  options: string[];
  children: ReactNode;
  onChange: (value: string) => void;
};

export const DataTable2InlineSelectEditor = ({
  label,
  value,
  options,
  children,
  onChange,
}: DataTable2InlineSelectEditorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <styled.DataTable2InlineEditor>
      {children}
      <styled.DataTable2InlineEditorButton>
        <ContextMenu2Container>
          <ContextMenu2
            width={252}
            trigger={
              <ActionButton type="button" color="primary" icon="pencil" />
            }
            open={isOpen}
            onOpenChange={setIsOpen}
          >
            <ContextMenu2HeadingItem>{label}</ContextMenu2HeadingItem>
            {options.map((option) => (
              <ContextMenu2CheckItem
                key={option}
                checked={value === option}
                onChange={() => onChange(option)}
              >
                {option}
              </ContextMenu2CheckItem>
            ))}
          </ContextMenu2>
        </ContextMenu2Container>
      </styled.DataTable2InlineEditorButton>
    </styled.DataTable2InlineEditor>
  );
};
