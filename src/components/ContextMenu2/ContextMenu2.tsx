import React, {
  useState,
  useRef,
  useContext,
  forwardRef,
  cloneElement,
  isValidElement,
  Children,
  type ReactNode,
  type Ref,
  type ReactElement,
  type ButtonHTMLAttributes,
  type Dispatch,
  type SetStateAction,
  useMemo,
  useEffect,
  Fragment,
  useCallback,
} from "react";
import {
  useFloating,
  useClick,
  useHover,
  useDismiss,
  useRole,
  useInteractions,
  useFloatingNodeId,
  useListNavigation,
  offset,
  size,
  autoPlacement,
  autoUpdate,
  safePolygon,
  FloatingNode,
  FloatingTree,
  FloatingPortal,
  FloatingFocusManager,
  useMergeRefs,
} from "@floating-ui/react";
import styled from "styled-components";
import { colors } from "../../styles";
import { ContextMenu2Context } from "./context";
import { ContextMenu2ButtonItem } from "./ContextMenu2ButtonItem";
import { ContextMenu2CheckItem } from "./ContextMenu2CheckItem";
import { ContextMenu2SwitchItem } from "./ContextMenu2SwitchItem";
import { ContextMenu2TriggerItem } from "./ContextMenu2TriggerItem";
import { ContextMenu2SortableContext } from "./ContextMenu2SortableItem";
import { depth } from "../../styles/depth";

//
// -----------------------------------------------------------------------------

export type ContextMenu2Anchor = {
  x: number;
  y: number;
};

export const useContextMenu2Anchor = (): {
  position: ContextMenu2Anchor;
  setPosition: Dispatch<
    SetStateAction<{
      x: number;
      y: number;
    }>
  >;
} => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  return { position, setPosition };
};

const isContextMenu2Anchor = (anchor: any): anchor is ContextMenu2Anchor => {
  return typeof anchor === "object" && "x" in anchor && "y" in anchor;
};

//
// -----------------------------------------------------------------------------
type ContextMenu2Props = {
  /**
   * コンテキストメニューを開くかどうか。省略時は内部で開閉状態を管理される
   */
  open?: boolean;
  /**
   * 開閉トリガーとなるボタン要素
   */
  trigger:
    | ReactElement<
        ButtonHTMLAttributes<HTMLButtonElement> & {
          ref?: Ref<HTMLButtonElement>;
        },
        "button"
      >
    | ContextMenu2Anchor;
  /**
   * コンテキストメニューの幅（省略時は幅が内容にフィットする）
   */
  width?: number;
  /**
   * コンテキストメニューの最小幅
   */
  minWidth?: number;
  /**
   * メニュー内の項目。ContextMenu2*** のコンポーネントのみで構成する前提
   */
  children: ReactNode;
  /**
   * 開閉状態が変更されたときのコールバック
   */
  onOpenChange?: (open: boolean) => void;
};

// Fragment を展開して子要素をフラット化する
const flattenChildren = (children: ReactNode): ReactNode[] => {
  return Children.toArray(children)
    .map((child) => {
      // Fragmentであれば再帰的にflattenChildrenを呼び出す
      if (isValidElement(child) && child.type === Fragment) {
        return flattenChildren(child.props.children);
      }
      // Fragment以外はそのまま返す
      return child;
    })
    .flat(Infinity);
};

const ContextMenu2Panel = styled.div`
  z-index: ${depth.modal + 1};
  padding: 10px 8px;
  border: 1px solid ${colors.basic[200]};
  border-radius: 6px;
  box-shadow: 0px 0px 16px rgba(4, 28, 51, 0.08);
  background: #ffffff;
  overflow: auto;

  &:focus {
    outline: none;
  }
`;
export const ContextMenu2 = forwardRef<HTMLButtonElement, ContextMenu2Props>(
  ({ open, trigger, width, minWidth, children, onOpenChange }, ref) => {
    const { isRoot, close } = useContext(ContextMenu2Context);
    const [isOpen, setIsOpen] = useState(false);
    // 通常では、パネル外にカーソルが出ると自動で自パネルを閉じる。
    // 一方で、ドラッグで移動できるパーツ（Sortable）を children として持っている場合は、
    // ドラッグ時にパネル外にカーソルが出てしまう時がある。
    // その時にパネルを閉じてしまうと、操作感として残念なので、
    // ドラッグ中にマウスアウトしても閉じないようにするためのフラグ
    const [isSorting, setIsSorting] = useState(false);

    const computedOpen = useMemo(() => {
      if (isSorting) return true;
      if (open !== undefined) return open;
      return isOpen;
    }, [open, isOpen, isSorting]);

    const forceCloseRoot = useCallback(() => {
      close();
      setIsOpen(false);
      setIsSorting(false);
      onOpenChange?.(false);
    }, [close, setIsOpen, setIsSorting, onOpenChange]);

    const nodeId = useFloatingNodeId();

    const { refs, floatingStyles, context } = useFloating({
      nodeId,
      open: computedOpen,
      onOpenChange: (open: boolean) => {
        setIsOpen(open);
        onOpenChange?.(open);
      },
      middleware: [
        offset({
          mainAxis: 5,
          crossAxis: 0,
        }),
        size({
          apply({ availableWidth, availableHeight, elements }) {
            Object.assign(elements.floating.style, {
              maxWidth: `${Math.max(0, availableWidth)}px`,
              maxHeight: `${Math.max(0, availableHeight)}px`,
            });
          },
        }),
        autoPlacement(() => {
          if (isRoot) {
            return {
              allowedPlacements: [
                "bottom-start",
                "bottom-end",
                "top-start",
                "top-end",
              ],
            };
          }

          const mql = window.matchMedia("(max-width: 480px)");
          const isSmallScreen = mql.matches;

          return {
            // 入れ子のフライアウトは左右に展開される
            // ただし、画面幅が狭い場合は余裕がないので上下に展開させる
            allowedPlacements: isSmallScreen
              ? // ? ["bottom-start", "top-start"]
                ["bottom-start"] // 入れ子内で bottom, top の両方を許可すると、スクロールの挙動がおかしくなる。bottom のみに制限
              : ["right-start", "left-start"],
            autoAlignment: false,
          };
        }),
      ],
      whileElementsMounted: autoUpdate,
    });

    const click = useClick(context);

    const hover = useHover(context, {
      enabled: !isRoot,
      mouseOnly: true,
      delay: {
        open: 100,
        close: isSorting ? 999999 : 100,
      },
      restMs: 100,
      handleClose: safePolygon(),
    });

    const dismiss = useDismiss(context);

    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const role = useRole(context);
    const listRef = useRef<HTMLElement[]>([]);
    const listNavigation = useListNavigation(context, {
      listRef,
      activeIndex,
      onNavigate: setActiveIndex,
      loop: true,
      nested: !isRoot,
    });

    const { getReferenceProps, getFloatingProps, getItemProps } =
      useInteractions([click, hover, dismiss, role, listNavigation]);

    // 自分の名前も含めるために、自関数のスコープ内で定義。トップレベルのスコープに出せない。
    const focusableItems = [
      ContextMenu2.displayName,
      ContextMenu2ButtonItem.displayName,
      ContextMenu2CheckItem.displayName,
      ContextMenu2SwitchItem.displayName,
      ContextMenu2TriggerItem.displayName,
    ];

    useEffect(() => {
      if (isContextMenu2Anchor(trigger)) {
        refs.setPositionReference({
          getBoundingClientRect() {
            return {
              width: 0,
              height: 0,
              x: trigger.x,
              y: trigger.y,
              top: trigger.y,
              left: trigger.x,
              right: trigger.x,
              bottom: trigger.y,
            };
          },
        });
      }
    }, [trigger, ref, refs]);

    const triggerRef = useMergeRefs([ref, refs.setReference]);
    const flattenedChildren = flattenChildren(children).map((child, i) => ({
      child,
      id: i,
    }));

    return (
      <>
        {isContextMenu2Anchor(trigger)
          ? null
          : cloneElement(trigger, {
              ref: triggerRef,
              ...getReferenceProps(),
              ...trigger.props,
            })}
        <FloatingNode id={nodeId}>
          {computedOpen && (
            <FloatingPortal>
              <FloatingFocusManager
                context={context}
                modal={false}
                initialFocus={-1}
              >
                <ContextMenu2Panel
                  ref={refs.setFloating}
                  style={{
                    ...floatingStyles,
                    width,
                    minWidth,
                    // ソートによるドラッグ移動中、overflow: auto にしていると、
                    // 移動場所中にスクロール可・不可の切り替えが連続的に発生しガタツキが発生する。
                    // ソートドラッグ中は overflow: auto を抑止する。
                    overflow: isSorting ? "visible" : undefined,
                  }}
                  {...getFloatingProps()}
                  tabIndex={-1}
                >
                  <ContextMenu2Context.Provider
                    value={{ isRoot: false, close: forceCloseRoot }}
                  >
                    <ContextMenu2SortableContext.Provider
                      value={{ isSorting, setIsSorting }}
                    >
                      {/*
                        上下矢印キーでメニュー内の項目を操作できるようにする
                        このとき、上下移動の対象となるコンポーネントだけに
                        tabIndex や Floating UI の props を暗黙で付与して child を返す。
                        focusableItems にコンポーネントの displayName が含まれていなければ、それをしないで child を返す。
                      */}
                      {flattenedChildren.map(({ child, id }, index) => {
                        if (!isValidElement(child)) return child;
                        if (
                          typeof child.type === "string" ||
                          !("displayName" in child.type) ||
                          typeof child.type.displayName !== "string"
                        ) {
                          return child;
                        }

                        if (!focusableItems.includes(child.type.displayName))
                          return child;

                        return cloneElement(child, {
                          tabIndex: activeIndex === index ? 0 : -1,
                          ref: (el: HTMLElement) => {
                            listRef.current[index] = el;
                          },
                          ...getItemProps(),
                          ...child.props,
                          key: id,
                        });
                      })}
                    </ContextMenu2SortableContext.Provider>
                  </ContextMenu2Context.Provider>
                </ContextMenu2Panel>
              </FloatingFocusManager>
            </FloatingPortal>
          )}
        </FloatingNode>
      </>
    );
  },
);
ContextMenu2.displayName = "ContextMenu2";

//
// -----------------------------------------------------------------------------
// <FloatingTree /> により、ContextMenu2 の入れ子の状態を管理するためのコンポーネント
// ContextMenu2 を利用する際は、必ず <ContextMenu2Container /> で囲んで運用してもらう前提

type ContextMenu2ContainerProps = {
  /**
   * ContextMenu2 を 1 つだけ含める
   */
  children: ReactElement;
};

export const ContextMenu2Container = ({
  children,
}: ContextMenu2ContainerProps) => {
  if (
    !isValidElement(children) ||
    typeof children.type === "string" ||
    !("displayName" in children.type) ||
    children.type.displayName !== ContextMenu2.displayName
  ) {
    throw new Error(
      "ContextMenu2Container には 1 つの ContextMenu2 しか入れられません",
    );
  }

  return (
    <ContextMenu2Context.Provider value={{ isRoot: true, close: () => {} }}>
      <FloatingTree>{children}</FloatingTree>
    </ContextMenu2Context.Provider>
  );
};
