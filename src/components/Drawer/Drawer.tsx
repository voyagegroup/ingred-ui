import React, { useEffect, useState, useRef, useCallback } from "react";
import Portal from "../Portal";
import ConfirmModal from "../ConfirmModal";

// 確認ダイアログの設定型
export type ConfirmCloseConfig = {
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  buttonColor?: "primary" | "primaryPale" | "basicLight" | "basicDark" | "danger" | "clear";
};

// 相対値をpx値に変換するヘルパー関数
const convertToPixels = (value: string | number, direction: "left" | "right" | "bottom"): number => {
  if (typeof value === "number") {
    return value; // 数値はpx扱い
  }
  
  // 文字列の場合は単位チェック
  const numericValue = parseFloat(value);
  
  if (value.includes("vw")) {
    return (numericValue / 100) * window.innerWidth;
  }
  if (value.includes("vh")) {
    return (numericValue / 100) * window.innerHeight;
  }
  if (value.includes("%")) {
    // %の場合は親要素基準だが、ここではviewport基準として扱う
    const isHorizontal = direction === "left" || direction === "right";
    return (numericValue / 100) * (isHorizontal ? window.innerWidth : window.innerHeight);
  }
  if (value.includes("px")) {
    return numericValue;
  }
  
  // 単位なしの文字列は警告を出す
  if (!isNaN(numericValue)) {
    console.warn(`Drawer: 文字列サイズには単位を指定してください。"${value}" → "${value}px" を推奨`);
    return numericValue; // 一応数値として扱う
  }
  
  // 無効な値の場合はエラー警告とフォールバック
  console.error(`Drawer: 無効なサイズ値です: "${value}". デフォルト値を使用します。`);
  return 400; // フォールバック
};

export type DrawerProps = {
  isOpen: boolean;
  direction: "left" | "right" | "bottom";
  onClose?: (reason: "backdropClick" | "escapeKey") => void;
  size?: string | number; // 数値(400)はpx、文字列は単位必須("400px", "30vw", "25%")
  resizable?: boolean; // リサイズ可能かどうか
  minSize?: string | number; // 数値(200)はpx、文字列は単位必須
  maxSize?: string | number; // 数値(800)はpx、文字列は単位必須
  onResize?: (newSize: number) => void; // リサイズ時のコールバック（常にpx値）
  stickyHeader?: React.ReactNode; // スクロール時も上部に固定されるヘッダー
  stickyFooter?: React.ReactNode; // スクロール時も下部に固定されるフッター
  confirmOnClose?: boolean | string | ConfirmCloseConfig; // 閉じる前に確認ダイアログを表示
  children: React.ReactNode;
};

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
  const [pendingCloseReason, setPendingCloseReason] = useState<"backdropClick" | "escapeKey" | null>(null);

  // confirmOnCloseの設定をパース
  const confirmConfig = React.useMemo(() => {
    if (!confirmOnClose) return null;
    
    if (typeof confirmOnClose === "boolean") {
      return {
        title: "確認",
        message: "変更内容が保存されていません。閉じてもよろしいですか？",
        confirmText: "閉じる",
        cancelText: "キャンセル",
        buttonColor: "primary" as const,
      };
    }
    
    if (typeof confirmOnClose === "string") {
      return {
        title: "確認", 
        message: confirmOnClose,
        confirmText: "閉じる",
        cancelText: "キャンセル",
        buttonColor: "primary" as const,
      };
    }
    
    return {
      title: confirmOnClose.title || "確認",
      message: confirmOnClose.message || "変更内容が保存されていません。閉じてもよろしいですか？",
      confirmText: confirmOnClose.confirmText || "閉じる",
      cancelText: confirmOnClose.cancelText || "キャンセル",
      buttonColor: confirmOnClose.buttonColor || "primary",
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
  const requestClose = (reason: "backdropClick" | "escapeKey") => {
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

  // アニメーション用のtransform値を計算
  const getTransform = () => {
    if (shouldShow) {
      return "translate3d(0, 0, 0)"; // 画面内位置（最終位置）
    }
    
    // 画面外位置（初期位置）
    switch (direction) {
      case "left":
        return "translate3d(-100%, 0, 0)";
      case "right":
        return "translate3d(100%, 0, 0)";
      case "bottom":
        return "translate3d(0, 100%, 0)";
      default:
        return "translate3d(0, 0, 0)";
    }
  };

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
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1200,
            opacity: shouldShow ? 1 : 0,
            transition: `opacity ${transitionDuration}ms ease-out`,
          }}
          onClick={handleBackdropClick}
        >
          {/* Drawerコンテナ */}
          <div
            style={{
              position: "fixed",
              top: direction === "bottom" ? "auto" : 0,
              bottom: direction === "bottom" ? 0 : 0,
              left: direction === "right" ? "auto" : 0,
              right: direction === "left" ? "auto" : 0,
              width: direction === "bottom" ? "100%" : `${currentSize}px`,
              height: direction === "bottom" ? `${currentSize}px` : "100%",
              backgroundColor: "#fff",
              boxShadow: "0 2px 16px rgba(0,0,0,0.12)",
              zIndex: 1201,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden", // コンテナ自体はhidden、中央エリアでスクロール制御
              transform: getTransform(),
              transition: `transform ${transitionDuration}ms cubic-bezier(0.23, 1, 0.32, 1)`,
            }}
          >
            {/* リサイズハンドル */}
            {resizable && (
              <div
                style={{
                  position: "absolute",
                  zIndex: 10,
                  backgroundColor: "transparent",
                  cursor: direction === "bottom" ? "ns-resize" : "ew-resize",
                  transition: "background-color 0.2s ease",
                  ...(direction === "left"
                    ? { top: 0, right: 0, width: 8, height: "100%" }
                    : direction === "right"
                    ? { top: 0, left: 0, width: 8, height: "100%" }
                    : { top: 0, left: 0, width: "100%", height: 8 }),
                }}
                onMouseDown={handleResizeStart}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.backgroundColor = "rgba(0, 0, 0, 0.1)";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.backgroundColor = "transparent";
                }}
              />
            )}
            
            {/* stickyHeader */}
            {stickyHeader && (
              <div
                style={{
                  position: "sticky",
                  top: 0,
                  backgroundColor: "#ffffff",
                  zIndex: 1,
                  borderBottom: "1px solid #e5e7eb",
                  marginBottom: 8,
                  paddingBottom: 8,
                }}
              >
                {stickyHeader}
              </div>
            )}
            
            {/* スクロール可能なコンテンツエリア */}
            <div
              style={{
                flex: 1,
                overflow: "auto",
                paddingTop: stickyHeader ? 0 : 0,
                paddingBottom: stickyFooter ? 0 : 0,
              }}
            >
              {children}
            </div>
            
            {/* stickyFooter */}
            {stickyFooter && (
              <div
                style={{
                  position: "sticky",
                  bottom: 0,
                  backgroundColor: "#ffffff",
                  zIndex: 1,
                  borderTop: "1px solid #e5e7eb",
                  marginTop: 8,
                  paddingTop: 8,
                }}
              >
                {stickyFooter}
              </div>
            )}
          </div>
        </div>
      </Portal>
    </>
  );
};

export default Drawer;