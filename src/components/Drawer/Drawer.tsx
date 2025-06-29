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
} from "./styled";


const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  direction,
  onClose,
  size = "30vw",
  resizable = false,
  minSize = "20vw", 
  maxSize = "50vw",
  onResize,
  stickyHeader,
  stickyFooter,
  confirmOnClose,
  children,
}) => {
  // 固定アニメーション時間
  const transitionDuration = 300;
  
  // 相対値をpx値に変換（初期化時のみ）
  const convertedSize = convertToPixels(size, direction);
  const convertedMinSize = convertToPixels(minSize, direction);
  const convertedMaxSize = convertToPixels(maxSize, direction);
  
  // アニメーション状態管理
  const [isVisible, setIsVisible] = useState(false);
  const [shouldShow, setShouldShow] = useState(false); // Drawerの実際の表示位置制御
  
  // リサイズ状態管理（内部は常にpx値）
  const [currentSize, setCurrentSize] = useState(convertedSize);
  const dragging = useRef(false);
  const startPos = useRef(0);
  const startSize = useRef(0);
  const justFinishedResizing = useRef(false);

  // 確認ダイアログの状態管理
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [pendingCloseReason, setPendingCloseReason] = useState<CloseReason | null>(null);

  // confirmOnCloseの設定をパース
  const confirmConfig = React.useMemo(() => {
    if (!confirmOnClose) return null;
    
    const config = typeof confirmOnClose === "string" 
      ? { message: confirmOnClose } 
      : confirmOnClose;
    
    return {
      title: config.title || "確認",
      message: config.message || "変更内容が保存されていません。閉じてもよろしいですか？",
      confirmText: config.confirmText || "閉じる",
      cancelText: config.cancelText || "キャンセル",
      buttonColor: config.buttonColor || "primary",
    };
  }, [confirmOnClose]);

  // サイズが外部から変更された場合の同期
  useEffect(() => {
    const newSize = convertToPixels(size, direction);
    setCurrentSize(newSize);
  }, [size, direction]);

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

  // リサイズハンドラー
  const handleResize = useCallback((e: MouseEvent) => {
    if (!dragging.current) return;

    const isHorizontal = direction === "left" || direction === "right";
    const currentPos = isHorizontal ? e.clientX : e.clientY;
    
    let delta = currentPos - startPos.current;
    
    // 方向に応じてデルタを調整
    if (direction === "right") delta = -delta;
    if (direction === "bottom") delta = -delta;
    
    let newSize = startSize.current + delta;
    
    // 最小・最大サイズの制限（変換済みの値を使用）
    newSize = Math.max(convertedMinSize, Math.min(convertedMaxSize, newSize));
    
    setCurrentSize(newSize);
    onResize?.(newSize);
  }, [direction, convertedMinSize, convertedMaxSize, onResize]);

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

  const handleResizeStart = useCallback((e: React.MouseEvent) => {
    if (!resizable) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    dragging.current = true;
    const isHorizontal = direction === "left" || direction === "right";
    startPos.current = isHorizontal ? e.clientX : e.clientY;
    startSize.current = currentSize;
    
    document.body.style.userSelect = "none";
    document.body.style.cursor = isHorizontal ? "ew-resize" : "ns-resize";
  }, [resizable, direction, currentSize]);

  // グローバルマウスイベントリスナー
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

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [resizable, handleResize, handleResizeEnd]);

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
  }, [isOpen, showConfirmDialog, confirmConfig]);

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

  // 閉じる処理の共通ロジック
  const requestClose = (reason: CloseReason) => {
    if (confirmConfig) {
      setPendingCloseReason(reason);
      setShowConfirmDialog(true);
    } else {
      onClose?.(reason);
    }
  };

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
          onSubmit={(e) => {
            e.preventDefault();
            handleConfirmClose();
          }}
          onClose={() => handleCancelClose()}
        >
          {confirmConfig.message}
        </ConfirmModal>
      )}

      <Portal>
        {/* 背景オーバーレイ */}
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
            {/* リサイズハンドル */}
            {resizable && (
              <ResizeHandle
                direction={direction}
                onMouseDown={handleResizeStart}
                data-testid="resize-handle"
              />
            )}
            
            {/* stickyHeader */}
            {stickyHeader && (
              <StickyHeader>
                {stickyHeader}
              </StickyHeader>
            )}
            
            {/* スクロール可能なコンテンツエリア */}
            <ScrollableContent>
              {children}
            </ScrollableContent>
            
                        {/* stickyFooter */}
            {stickyFooter && (
              <StickyFooter>
                {stickyFooter}
              </StickyFooter>
            )}
            </DrawerContainer>
        </Backdrop>
      </Portal>
    </>
  );
};

export default Drawer;