import React, {
  useState,
  useMemo,
  Children,
  type ReactNode,
  type ReactElement,
  isValidElement,
  useContext,
  createContext,
} from "react";
import {
  DndContext,
  DragOverlay,
  type DragStartEvent,
  type DragEndEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core";
import { SortableContext, useSortable, arrayMove } from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { CSS } from "@dnd-kit/utilities";
import styled from "styled-components";
import { colors } from "../../styles";
import { createPortal } from "react-dom";
import Icon from "../Icon";

export const ContextMenu2SortableContext = createContext<{
  isSorting: boolean;
  setIsSorting: (_: boolean) => void;
}>({
  isSorting: false,
  setIsSorting: (_: boolean) => {},
});

const ContextMenu2SortableItemContext = createContext<{
  isGhost: boolean;
}>({
  isGhost: false,
});

//
// -----------------------------------------------------------------------------

type ContextMenu2SortableContainerProps = {
  order: UniqueIdentifier[];
  children: ReactElement[];
  onOrderChange: (order: UniqueIdentifier[]) => void;
};

const GroupInner = styled.div`
  overflow: hidden;
`;

export const ContextMenu2SortableGroup = ({
  order,
  children,
  onOrderChange,
}: ContextMenu2SortableContainerProps) => {
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const { setIsSorting } = useContext(ContextMenu2SortableContext);
  const sortedChildren = useMemo(
    () =>
      Children.toArray(children).sort((a, b) => {
        if (!isValidElement(a) || !isValidElement(b)) return 0;
        return order.indexOf(a.props.id) - order.indexOf(b.props.id);
      }),
    [children, order],
  );

  const activeChild = useMemo(
    () =>
      Children.toArray(children).find((child) => {
        if (!isValidElement(child)) return false;
        return child.props.id === activeId;
      }),
    [children, activeId],
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id);
    setIsSorting(true);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    setActiveId(null);
    setIsSorting(false);

    if (over == null) return;
    if (active.id === over.id) return;

    const oldIndex = order.indexOf(active.id);
    const newIndex = order.indexOf(over.id);
    const newOrder = arrayMove(order, oldIndex, newIndex);
    onOrderChange(newOrder);
  };

  const handleCancel = () => {
    setActiveId(null);
    setIsSorting(false);
  };

  return (
    <DndContext
      modifiers={[restrictToVerticalAxis]}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleCancel}
      onDragAbort={handleCancel}
    >
      <GroupInner>
        <SortableContext items={order}>
          {Children.map(sortedChildren, (child) => {
            if (
              !isValidElement(child) ||
              typeof child.type === "string" ||
              !("displayName" in child.type) ||
              child?.type?.displayName !== "ContextMenu2SortableItem"
            ) {
              // ContextMenu2SortableItem 以外は受け付けない
              throw new Error(
                "ContextMenu2SortableContainer には ContextMenu2SortableItem しか入れられません",
              );
            }

            return child;
          })}
        </SortableContext>
      </GroupInner>
      {createPortal(
        <DragOverlay>
          <ContextMenu2SortableItemContext.Provider value={{ isGhost: true }}>
            {activeChild}
          </ContextMenu2SortableItemContext.Provider>
        </DragOverlay>,
        document.body,
      )}
    </DndContext>
  );
};

//
// -----------------------------------------------------------------------------

type ContextMenu2SortableItemProps = {
  id: UniqueIdentifier;
  disabled?: boolean;
  children: ReactNode;
};

const SortableThumb = styled.button<{
  isDragging: boolean;
  isGhost: boolean;
  disabled?: boolean;
}>`
  flex-shrink: 0;
  width: 18px;
  aspect-ratio: 1;
  border: 0;
  color: ${colors.basic[900]};
  background: transparent;
  cursor: ${({ isGhost, disabled }) => {
    if (isGhost) return "grabbing";
    if (disabled) return "";
    return "grab";
  }};
  visibility: ${({ isDragging, disabled }) =>
    isDragging || disabled ? "hidden" : "visible"};
`;

const SortableContents = styled.div<{
  isGhost: boolean;
}>`
  flex-grow: 1;
  pointer-events: ${({ isGhost }) => (isGhost ? "none" : "auto")};
`;

const SortableItem = styled.div<{
  isGhost: boolean;
}>`
  display: flex;
  align-items: center;
  cursor: ${({ isGhost }) => (isGhost ? "grabbing" : "")};
`;

export const ContextMenu2SortableItem = ({
  id,
  disabled,
  children,
}: ContextMenu2SortableItemProps) => {
  const {
    setNodeRef,
    setActivatorNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
  });
  const { isGhost } = useContext(ContextMenu2SortableItemContext);

  return (
    <SortableItem
      ref={setNodeRef}
      isGhost={isGhost}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        // DragOverlay がドラッグ中の要素のコピーを別で描画するため、実態はドラッグ中は薄くする
        opacity: isDragging ? 0.25 : 1,
      }}
    >
      <SortableThumb
        ref={setActivatorNodeRef}
        isGhost={isGhost}
        isDragging={isDragging}
        disabled={disabled}
        {...attributes}
        {...listeners}
      >
        <Icon name="braille" />
      </SortableThumb>
      <SortableContents isGhost={isGhost}>{children}</SortableContents>
    </SortableItem>
  );
};

ContextMenu2SortableItem.displayName = "ContextMenu2SortableItem";
