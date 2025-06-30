import React, { useEffect, useState, useRef, useCallback } from "react";
import Portal from "../Portal";
import ConfirmModal from "../ConfirmModal";
import { DrawerProps, CloseReason } from "./types";
import { convertToPixels } from "./utils";
import {
  Backdrop,
  DrawerContainer,
  ResizeHandle,
  StickyHeader,
  ScrollableContent,
  StickyFooter,
  ResizeBar,
} from "./styled";

const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  direction,
  onClose,
  size = "40vw",
  resizable = false,
  minSize = "20vw",
  maxSize = "90vw",
  onResize,
  stickyHeader,
  stickyFooter,
  confirmOnClose,
  allowBackgroundScroll = false,
  children,
}) => {
  // 固定アニメーション時間
  const transitionDuration = 300;

  // 相対値をpx値に変換（初期化時のみ）
  const convertedSize = convertToPixels(size, direction);
  const convertedMinSize = convertToPixels(minSize, direction);
  const convertedMaxSize = convertToPixels(maxSize, direction);

  // サイズ制約のバリデーション（自動補正＋開発時のみ警告）
  const safeMin = Math.min(convertedMinSize, convertedMaxSize);
  const safeMax = Math.max(convertedMinSize, convertedMaxSize);
  const safeSize = Math.max(safeMin, Math.min(convertedSize, safeMax));

  if (process.env.NODE_ENV !== "production") {
    if (convertedMinSize > convertedMaxSize) {
      // eslint-disable-next-line no-console
      console.warn(
        `Drawer: minSize (${convertedMinSize}px) が maxSize (${convertedMaxSize}px) より大きいです。自動補正します。`,
      );
    }
    if (convertedSize < safeMin || convertedSize > safeMax) {
      // eslint-disable-next-line no-console
      console.warn(
        `Drawer: size (${convertedSize}px) が min/max の範囲外です。自動補正します。`,
      );
    }
  }

  // アニメーション状態管理
  const [isVisible, setIsVisible] = useState(false);
  const [shouldShow, setShouldShow] = useState(false); // Drawerの実際の表示位置制御

  // リサイズ状態管理（内部は常にpx値）
  const [currentSize, setCurrentSize] = useState(safeSize);
  const dragging = useRef(false);
  const startPos = useRef(0);
  const startSize = useRef(0);
  const justFinishedResizing = useRef(false);

  // 確認ダイアログの状態管理
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [pendingCloseReason, setPendingCloseReason] =
    useState<CloseReason | null>(null);

  // リサイズハンドルhover状態
  const [isHandleHovered, setIsHandleHovered] = useState(false);

  // confirmOnCloseの設定をパース
  const confirmConfig = React.useMemo(() => {
    if (!confirmOnClose) return null;

    const config =
      typeof confirmOnClose === "string"
        ? { message: confirmOnClose }
        : confirmOnClose;

    return {
      title: config.title || "確認",
      message:
        config.message ||
        "変更内容が保存されていません。閉じてもよろしいですか？",
      confirmText: config.confirmText || "変更を破棄して閉じる",
      cancelText: config.cancelText || "編集を続ける",
      buttonColor: config.buttonColor || "danger",
    };
  }, [confirmOnClose]);

  // サイズが外部から変更された場合の同期
  useEffect(() => {
    const newSize = convertToPixels(size, direction);
    const newMinSize = convertToPixels(minSize, direction);
    const newMaxSize = convertToPixels(maxSize, direction);
    const safeMin = Math.min(newMinSize, newMaxSize);
    const safeMax = Math.max(newMinSize, newMaxSize);
    const safeSize = Math.max(safeMin, Math.min(newSize, safeMax));

    if (process.env.NODE_ENV !== "production") {
      if (newMinSize > newMaxSize) {
        // eslint-disable-next-line no-console
        console.warn(
          `Drawer: minSize (${newMinSize}px) が maxSize (${newMaxSize}px) より大きいです。自動補正します。`,
        );
      }
      if (newSize < safeMin || newSize > safeMax) {
        // eslint-disable-next-line no-console
        console.warn(
          `Drawer: size (${newSize}px) が min/max の範囲外です。自動補正します。`,
        );
      }
    }

    setCurrentSize(safeSize);
  }, [size, minSize, maxSize, direction]);

  // isOpenの変化に応じてアニメーション制御
  useEffect(() => {
    if (isOpen) {
      // 開く時：DOM表示 → 画面外 → 画面内
      setIsVisible(true);
      // 次のフレームで画面内位置へアニメーション開始
      const timer = setTimeout(() => {
        setShouldShow(true);
      }, 16);
      return () => clearTimeout(timer);
    } else if (isVisible) {
      // 閉じる時：画面内 → 画面外 → DOM削除
      setShouldShow(false);
      // アニメーション完了後にDOM削除
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, transitionDuration);
      return () => clearTimeout(timer);
    }

    // その他の場合は何もしない
    return undefined;
  }, [isOpen, isVisible]);

  // isOpenの変化に合わせてbodyスクロールを制御
  useEffect(() => {
    if (!allowBackgroundScroll && isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
    return;
  }, [isOpen, allowBackgroundScroll]);

  // リサイズハンドラー
  const handleResize = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!dragging.current) return;

      const isHorizontal = direction === "left" || direction === "right";
      // タッチかマウスかで座標取得方法を分岐
      let currentPos: number;
      if (e instanceof TouchEvent) {
        const touch = e.touches[0] || e.changedTouches[0];
        currentPos = isHorizontal ? touch.clientX : touch.clientY;
      } else {
        currentPos = isHorizontal
          ? (e as MouseEvent).clientX
          : (e as MouseEvent).clientY;
      }

      let delta = currentPos - startPos.current;

      // 方向に応じてデルタを調整
      if (direction === "right") delta = -delta;
      if (direction === "bottom") delta = -delta;

      let newSize = startSize.current + delta;

      // 最小・最大サイズの制限（変換済みの値を使用）
      newSize = Math.max(safeMin, Math.min(safeMax, newSize));

      setCurrentSize(newSize);
      onResize?.(newSize);
    },
    [direction, safeMin, safeMax, onResize],
  );

  const handleResizeEnd = useCallback(() => {
    dragging.current = false;
    document.body.style.userSelect = "";
    document.body.style.cursor = "";

    // リサイズ終了直後の短時間は背景クリックを無効化
    justFinishedResizing.current = true;
    setTimeout(() => {
      justFinishedResizing.current = false;
    }, 100);
  }, []);

  const handleResizeStart = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (!resizable) return;

      e.preventDefault();
      e.stopPropagation();

      dragging.current = true;
      const isHorizontal = direction === "left" || direction === "right";
      let start: number;
      if ("touches" in e && e.touches.length > 0) {
        start = isHorizontal ? e.touches[0].clientX : e.touches[0].clientY;
      } else if ("changedTouches" in e && e.changedTouches.length > 0) {
        start = isHorizontal
          ? e.changedTouches[0].clientX
          : e.changedTouches[0].clientY;
      } else {
        start = isHorizontal
          ? (e as React.MouseEvent).clientX
          : (e as React.MouseEvent).clientY;
      }
      startPos.current = start;
      startSize.current = currentSize;

      document.body.style.userSelect = "none";
      document.body.style.cursor = isHorizontal ? "ew-resize" : "ns-resize";
    },
    [resizable, direction, currentSize],
  );

  // グローバルマウス/タッチイベントリスナー
  useEffect(() => {
    if (!resizable) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (dragging.current) {
        handleResize(e);
      }
    };
    const handleMouseUp = () => {
      if (dragging.current) {
        handleResizeEnd();
      }
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (dragging.current) {
        handleResize(e);
      }
    };
    const handleTouchEnd = () => {
      if (dragging.current) {
        handleResizeEnd();
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [resizable, handleResize, handleResizeEnd]);

  // 閉じる処理の共通ロジック
  const requestClose = useCallback(
    (reason: CloseReason) => {
      if (confirmConfig) {
        setPendingCloseReason(reason);
        setShowConfirmDialog(true);
      } else {
        onClose?.(reason);
      }
    },
    [confirmConfig, onClose],
  );

  // 確認ダイアログのハンドラー
  const handleConfirmClose = () => {
    setShowConfirmDialog(false);
    if (pendingCloseReason && onClose) {
      onClose(pendingCloseReason);
    }
    setPendingCloseReason(null);
  };

  const handleCancelClose = () => {
    setShowConfirmDialog(false);
    setPendingCloseReason(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleConfirmClose();
  };

  // ESCキー処理
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && !showConfirmDialog) {
        requestClose("escapeKey");
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, showConfirmDialog, requestClose]);

  // 背景クリック処理
  const handleBackdropClick = (e: React.MouseEvent) => {
    // リサイズ中またはリサイズ終了直後は背景クリックを無効化
    if (dragging.current || justFinishedResizing.current) {
      return;
    }

    if (e.target === e.currentTarget) {
      requestClose("backdropClick");
    }
  };

  // 表示制御：アニメーション中も表示を維持
  if (!isVisible) {
    return null;
  }

  return (
    <>
      {/* 確認ダイアログ */}
      {confirmConfig && (
        <ConfirmModal
          isOpen={showConfirmDialog}
          title={confirmConfig.title}
          confirmText={confirmConfig.confirmText}
          cancelText={confirmConfig.cancelText}
          buttonColor={confirmConfig.buttonColor}
          onSubmit={handleSubmit}
          onClose={() => handleCancelClose()}
        >
          {confirmConfig.message}
        </ConfirmModal>
      )}

      <Portal>
        {/* allowBackgroundScrollがtrueならBackdropなしでDrawerContainerのみ */}
        {allowBackgroundScroll ? (
          <DrawerContainer
            direction={direction}
            currentSize={currentSize}
            shouldShow={shouldShow}
            transitionDuration={transitionDuration}
          >
            {/* リサイズ可能な時はグレーのバーを表示（方向ごとに位置・向きを変える） */}
            {resizable && (
              <ResizeBar
                direction={direction}
                data-testid="resize-bar"
                active={isHandleHovered}
              />
            )}
            {/* リサイズハンドル */}
            {resizable && (
              <ResizeHandle
                direction={direction}
                data-testid="resize-handle"
                onMouseDown={handleResizeStart}
                onTouchStart={(e) => {
                  handleResizeStart(e);
                  setIsHandleHovered(true);
                }}
                onTouchEnd={() => setIsHandleHovered(false)}
                onTouchCancel={() => setIsHandleHovered(false)}
                onMouseEnter={() => setIsHandleHovered(true)}
                onMouseLeave={() => setIsHandleHovered(false)}
              />
            )}

            {/* stickyHeader */}
            {stickyHeader && <StickyHeader>{stickyHeader}</StickyHeader>}

            {/* スクロール可能なコンテンツエリア */}
            <ScrollableContent>{children}</ScrollableContent>

            {/* stickyFooter */}
            {stickyFooter && <StickyFooter>{stickyFooter}</StickyFooter>}
          </DrawerContainer>
        ) : (
          <Backdrop
            shouldShow={shouldShow}
            transitionDuration={transitionDuration}
            onClick={handleBackdropClick}
          >
            {/* Drawerコンテナ */}
            <DrawerContainer
              direction={direction}
              currentSize={currentSize}
              shouldShow={shouldShow}
              transitionDuration={transitionDuration}
            >
              {/* リサイズ可能な時はグレーのバーを表示（方向ごとに位置・向きを変える） */}
              {resizable && (
                <ResizeBar
                  direction={direction}
                  data-testid="resize-bar"
                  active={isHandleHovered}
                />
              )}
              {/* リサイズハンドル */}
              {resizable && (
                <ResizeHandle
                  direction={direction}
                  data-testid="resize-handle"
                  onMouseDown={handleResizeStart}
                  onTouchStart={(e) => {
                    handleResizeStart(e);
                    setIsHandleHovered(true);
                  }}
                  onTouchEnd={() => setIsHandleHovered(false)}
                  onTouchCancel={() => setIsHandleHovered(false)}
                  onMouseEnter={() => setIsHandleHovered(true)}
                  onMouseLeave={() => setIsHandleHovered(false)}
                />
              )}

              {/* stickyHeader */}
              {stickyHeader && <StickyHeader>{stickyHeader}</StickyHeader>}

              {/* スクロール可能なコンテンツエリア */}
              <ScrollableContent>{children}</ScrollableContent>

              {/* stickyFooter */}
              {stickyFooter && <StickyFooter>{stickyFooter}</StickyFooter>}
            </DrawerContainer>
          </Backdrop>
        )}
      </Portal>
    </>
  );
};

export default Drawer;
