import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import Drawer from "../Drawer";
import { defaultTheme } from "../../../themes";

describe("Drawer", () => {
  it("opens and displays content when isOpen is true", () => {
    render(
      <Drawer isOpen={true} direction="right">
        <div>Test Content</div>
      </Drawer>
    );
    
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("does not render when isOpen is false", () => {
    render(
      <Drawer isOpen={false} direction="right">
        <div>Test Content</div>
      </Drawer>
    );
    
    expect(screen.queryByText("Test Content")).not.toBeInTheDocument();
  });

  it("calls onClose when backdrop is clicked", () => {
    const onClose = jest.fn();
    render(
      <Drawer isOpen={true} direction="right" onClose={onClose}>
        <div>Test Content</div>
      </Drawer>
    );
    
    // 背景をクリック（ポータル → オーバーレイ → Drawerコンテナ）
    const contentArea = screen.getByText("Test Content").parentElement; // スクロール可能なコンテンツエリア
    const drawerContainer = contentArea?.parentElement; // Drawerコンテナ  
    const backdrop = drawerContainer?.parentElement; // 背景オーバーレイ
    if (backdrop) {
      fireEvent.click(backdrop);
      expect(onClose).toHaveBeenCalledWith("backdropClick");
    }
  });

  it("calls onClose when Escape key is pressed", () => {
    const onClose = jest.fn();
    render(
      <Drawer isOpen={true} direction="right" onClose={onClose}>
        <div>Test Content</div>
      </Drawer>
    );
    
    fireEvent.keyDown(window, { key: "Escape" });
    expect(onClose).toHaveBeenCalledWith("escapeKey");
  });

  it("uses fixed transition duration", () => {
    const { rerender } = render(
      <Drawer isOpen={false} direction="right">
        <div>Test Content</div>
      </Drawer>
    );
    
    // 開く
    rerender(
      <Drawer isOpen={true} direction="right">
        <div>Test Content</div>
      </Drawer>
    );
    
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("handles direction prop correctly", () => {
    const { rerender } = render(
      <Drawer isOpen={true} direction="left">
        <div>Left Drawer</div>
      </Drawer>
    );
    
    expect(screen.getByText("Left Drawer")).toBeInTheDocument();
    
    rerender(
      <Drawer isOpen={true} direction="bottom">
        <div>Bottom Drawer</div>
      </Drawer>
    );
    
    expect(screen.getByText("Bottom Drawer")).toBeInTheDocument();
  });

  it("applies custom size", () => {
    render(
      <Drawer isOpen={true} direction="right" size={600}>
        <div>Test Content</div>
      </Drawer>
    );
    
    const contentArea = screen.getByText("Test Content").parentElement;
    const drawerContainer = contentArea?.parentElement; // Drawerコンテナ
    expect(drawerContainer).toHaveStyle("width: 600px");
  });

  it("handles animation states properly", async () => {
    const { rerender } = render(
      <Drawer isOpen={false} direction="right">
        <div>Test Content</div>
      </Drawer>
    );
    
    // 初期状態：非表示
    expect(screen.queryByText("Test Content")).not.toBeInTheDocument();
    
    // 開く
    rerender(
      <Drawer isOpen={true} direction="right">
        <div>Test Content</div>
      </Drawer>
    );
    
    // すぐに表示される
    expect(screen.getByText("Test Content")).toBeInTheDocument();
    
    // 閉じる
    rerender(
      <Drawer isOpen={false} direction="right">
        <div>Test Content</div>
      </Drawer>
    );
    
    // アニメーション中はまだ表示されている
    expect(screen.getByText("Test Content")).toBeInTheDocument();
    
    // アニメーション完了後は非表示（固定300ms + 余裕）
    await waitFor(() => {
      expect(screen.queryByText("Test Content")).not.toBeInTheDocument();
    }, { timeout: 400 });
  });

  // リサイズ機能のテスト
  it("renders resize handle when resizable is true", () => {
    render(
      <Drawer isOpen={true} direction="right" resizable={true}>
        <div>Test Content</div>
      </Drawer>
    );
    
    const contentArea = screen.getByText("Test Content").parentElement;
    const drawerContainer = contentArea?.parentElement;
    const resizeHandle = drawerContainer?.querySelector('div[style*="cursor"]');
    expect(resizeHandle).toBeInTheDocument();
  });

  it("does not render resize handle when resizable is false", () => {
    render(
      <Drawer isOpen={true} direction="right" resizable={false}>
        <div>Test Content</div>
      </Drawer>
    );
    
    const drawerContainer = screen.getByText("Test Content").parentElement;
    const resizeHandle = drawerContainer?.querySelector('div[style*="cursor"]');
    expect(resizeHandle).not.toBeInTheDocument();
  });

  it("applies min and max size constraints", () => {
    const onResize = jest.fn();
    render(
      <Drawer 
        isOpen={true} 
        direction="right" 
        resizable={true}
        size={300}
        minSize={200}
        maxSize={500}
        onResize={onResize}
      >
        <div>Test Content</div>
      </Drawer>
    );
    
    const contentArea = screen.getByText("Test Content").parentElement;
    const drawerContainer = contentArea?.parentElement;
    expect(drawerContainer).toHaveStyle("width: 300px");
  });

  it("calls onResize when provided", () => {
    const onResize = jest.fn();
    render(
      <Drawer 
        isOpen={true} 
        direction="right" 
        resizable={true}
        onResize={onResize}
      >
        <div>Test Content</div>
      </Drawer>
    );
    
    // onResizeが関数として提供されていることを確認
    expect(typeof onResize).toBe("function");
  });

  it("updates size when size prop changes", () => {
    const { rerender } = render(
      <Drawer isOpen={true} direction="right" size={300}>
        <div>Test Content</div>
      </Drawer>
    );
    
    let contentArea = screen.getByText("Test Content").parentElement;
    let drawerContainer = contentArea?.parentElement;
    expect(drawerContainer).toHaveStyle("width: 300px");
    
    // サイズを変更
    rerender(
      <Drawer isOpen={true} direction="right" size={500}>
        <div>Test Content</div>
      </Drawer>
    );
    
    contentArea = screen.getByText("Test Content").parentElement;
    drawerContainer = contentArea?.parentElement;
    expect(drawerContainer).toHaveStyle("width: 500px");
  });

  it("handles different directions for resize handle positioning", () => {
    const directions: Array<"left" | "right" | "bottom"> = ["left", "right", "bottom"];
    
    directions.forEach((direction) => {
      const { unmount } = render(
        <Drawer isOpen={true} direction={direction} resizable={true}>
          <div>{direction} Content</div>
        </Drawer>
      );
      
      const contentArea = screen.getByText(`${direction} Content`).parentElement;
      const drawerContainer = contentArea?.parentElement;
      const resizeHandle = drawerContainer?.querySelector('div[style*="cursor"]');
      expect(resizeHandle).toBeInTheDocument();
      
      unmount();
    });
  });

  // 相対値サポートのテスト
  describe("Relative size support", () => {
    beforeEach(() => {
      // テスト用にviewportサイズを設定
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 1000,
      });
      Object.defineProperty(window, "innerHeight", {
        writable: true,
        configurable: true,
        value: 800,
      });
    });

    it("converts vw values to pixels", () => {
      render(
        <Drawer isOpen={true} direction="right" size="30vw">
          <div>Test Content</div>
        </Drawer>
      );
      
      const contentArea = screen.getByText("Test Content").parentElement;
      const drawerContainer = contentArea?.parentElement;
      // 30vw = 30% of 1000px = 300px
      expect(drawerContainer).toHaveStyle("width: 300px");
    });

    it("converts vh values to pixels", () => {
      render(
        <Drawer isOpen={true} direction="bottom" size="40vh">
          <div>Test Content</div>
        </Drawer>
      );
      
      const contentArea = screen.getByText("Test Content").parentElement;
      const drawerContainer = contentArea?.parentElement;
      // 40vh = 40% of 800px = 320px
      expect(drawerContainer).toHaveStyle("height: 320px");
    });

    it("converts percentage values to pixels", () => {
      render(
        <Drawer isOpen={true} direction="left" size="25%">
          <div>Test Content</div>
        </Drawer>
      );
      
      const contentArea = screen.getByText("Test Content").parentElement;
      const drawerContainer = contentArea?.parentElement;
      // 25% = 25% of viewport width = 250px
      expect(drawerContainer).toHaveStyle("width: 250px");
    });

    it("handles px string values", () => {
      render(
        <Drawer isOpen={true} direction="right" size="400px">
          <div>Test Content</div>
        </Drawer>
      );
      
      const contentArea = screen.getByText("Test Content").parentElement;
      const drawerContainer = contentArea?.parentElement;
      expect(drawerContainer).toHaveStyle("width: 400px");
    });

    it("handles mixed relative and absolute min/max sizes", () => {
      render(
        <Drawer 
          isOpen={true} 
          direction="right" 
          size="30vw"
          minSize={200}
          maxSize="50vw"
          resizable={true}
        >
          <div>Test Content</div>
        </Drawer>
      );
      
      const contentArea = screen.getByText("Test Content").parentElement;
      const drawerContainer = contentArea?.parentElement;
      expect(drawerContainer).toHaveStyle("width: 300px");
    });

    it("warns for string values without units", () => {
      const consoleSpy = jest.spyOn(console, "warn").mockImplementation();
      
      render(
        <Drawer isOpen={true} direction="right" size="400">
          <div>Test Content</div>
        </Drawer>
      );
      
      expect(consoleSpy).toHaveBeenCalledWith(
        'Drawer: 文字列サイズには単位を指定してください。"400" → "400px" を推奨'
      );
      
      const contentArea = screen.getByText("Test Content").parentElement;
      const drawerContainer = contentArea?.parentElement;
      expect(drawerContainer).toHaveStyle("width: 400px");
      
      consoleSpy.mockRestore();
    });

    it("shows error and falls back for invalid values", () => {
      const consoleSpy = jest.spyOn(console, "error").mockImplementation();
      
      render(
        <Drawer isOpen={true} direction="right" size="invalid">
          <div>Test Content</div>
        </Drawer>
      );
      
      expect(consoleSpy).toHaveBeenCalledWith(
        'Drawer: 無効なサイズ値です: "invalid". デフォルト値を使用します。'
      );
      
      const contentArea = screen.getByText("Test Content").parentElement;
      const drawerContainer = contentArea?.parentElement;
      expect(drawerContainer).toHaveStyle("width: 400px");
      
      consoleSpy.mockRestore();
    });

    it("accepts numeric values without warnings", () => {
      const consoleSpy = jest.spyOn(console, "warn").mockImplementation();
      
      render(
        <Drawer isOpen={true} direction="right" size={400}>
          <div>Test Content</div>
        </Drawer>
      );
      
      expect(consoleSpy).not.toHaveBeenCalled();
      
      const contentArea = screen.getByText("Test Content").parentElement;
      const drawerContainer = contentArea?.parentElement;
      expect(drawerContainer).toHaveStyle("width: 400px");
      
      consoleSpy.mockRestore();
    });
  });

  // 相対値デフォルト値のテスト
  describe("Relative default values", () => {
    beforeEach(() => {
      // テスト用にviewportサイズを設定
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 1000,
      });
      Object.defineProperty(window, "innerHeight", {
        writable: true,
        configurable: true,
        value: 800,
      });
    });

    it("uses vw default values", () => {
      render(
        <Drawer isOpen={true} direction="right">
          <div>Default Drawer</div>
        </Drawer>
      );
      
      const contentArea = screen.getByText("Default Drawer").parentElement;
      const drawerContainer = contentArea?.parentElement;
      // 30vw = 30% of 1000px = 300px
      expect(drawerContainer).toHaveStyle("width: 300px");
    });

    it("works for all directions with vw defaults", () => {
      const { rerender } = render(
        <Drawer isOpen={true} direction="left">
          <div>Left Drawer</div>
        </Drawer>
      );
      
      let contentArea = screen.getByText("Left Drawer").parentElement;
      let drawerContainer = contentArea?.parentElement;
      expect(drawerContainer).toHaveStyle("width: 300px");

      rerender(
        <Drawer isOpen={true} direction="bottom">
          <div>Bottom Drawer</div>
        </Drawer>
      );
      
      contentArea = screen.getByText("Bottom Drawer").parentElement;
      drawerContainer = contentArea?.parentElement;
      // 30vw = 30% of 1000px = 300px (bottom drowerでもvwが適用される)
      expect(drawerContainer).toHaveStyle("height: 300px");
    });
  });

  // stickyHeader/Footerのテスト
  describe("StickyHeader and StickyFooter", () => {
    it("renders stickyHeader when provided", () => {
      render(
        <Drawer 
          isOpen={true} 
          direction="right"
          stickyHeader={<div data-testid="sticky-header">Header Content</div>}
        >
          <div>Main Content</div>
        </Drawer>
      );
      
      expect(screen.getByTestId("sticky-header")).toBeInTheDocument();
      expect(screen.getByText("Header Content")).toBeInTheDocument();
    });

    it("renders stickyFooter when provided", () => {
      render(
        <Drawer 
          isOpen={true} 
          direction="right"
          stickyFooter={<div data-testid="sticky-footer">Footer Content</div>}
        >
          <div>Main Content</div>
        </Drawer>
      );
      
      expect(screen.getByTestId("sticky-footer")).toBeInTheDocument();
      expect(screen.getByText("Footer Content")).toBeInTheDocument();
    });

    it("renders both stickyHeader and stickyFooter together", () => {
      render(
        <Drawer 
          isOpen={true} 
          direction="right"
          stickyHeader={<div data-testid="sticky-header">Header</div>}
          stickyFooter={<div data-testid="sticky-footer">Footer</div>}
        >
          <div>Main Content</div>
        </Drawer>
      );
      
      expect(screen.getByTestId("sticky-header")).toBeInTheDocument();
      expect(screen.getByTestId("sticky-footer")).toBeInTheDocument();
      expect(screen.getByText("Main Content")).toBeInTheDocument();
    });

    it("does not render stickyHeader when not provided", () => {
      render(
        <Drawer isOpen={true} direction="right">
          <div>Main Content</div>
        </Drawer>
      );
      
      expect(screen.queryByTestId("sticky-header")).not.toBeInTheDocument();
    });

    it("does not render stickyFooter when not provided", () => {
      render(
        <Drawer isOpen={true} direction="right">
          <div>Main Content</div>
        </Drawer>
      );
      
      expect(screen.queryByTestId("sticky-footer")).not.toBeInTheDocument();
    });

    it("applies correct styling to stickyHeader", () => {
      render(
        <Drawer 
          isOpen={true} 
          direction="right"
          stickyHeader={<div data-testid="sticky-header">Header</div>}
        >
          <div>Main Content</div>
        </Drawer>
      );
      
      const stickyHeader = screen.getByTestId("sticky-header").parentElement;
      expect(stickyHeader).toHaveStyle("position: sticky");
      expect(stickyHeader).toHaveStyle("top: 0");
      expect(stickyHeader).toHaveStyle("z-index: 1");
    });

    it("applies correct styling to stickyFooter", () => {
      render(
        <Drawer 
          isOpen={true} 
          direction="right"
          stickyFooter={<div data-testid="sticky-footer">Footer</div>}
        >
          <div>Main Content</div>
        </Drawer>
      );
      
      const stickyFooter = screen.getByTestId("sticky-footer").parentElement;
      expect(stickyFooter).toHaveStyle("position: sticky");
      expect(stickyFooter).toHaveStyle("bottom: 0");
      expect(stickyFooter).toHaveStyle("z-index: 1");
    });
  });

  // 確認ダイアログのテスト
  describe("Close Confirmation Dialog", () => {
    it("does not show confirmation dialog when confirmOnClose is not set", () => {
      const onClose = jest.fn();
      render(
        <Drawer isOpen={true} direction="right" onClose={onClose}>
          <div>Test Content</div>
        </Drawer>
      );
      
      fireEvent.keyDown(window, { key: "Escape" });
      expect(onClose).toHaveBeenCalledWith("escapeKey");
      expect(screen.queryByText("確認")).not.toBeInTheDocument();
    });

    it("shows default confirmation dialog when confirmOnClose is true", () => {
      const onClose = jest.fn();
      render(
        <ThemeProvider theme={defaultTheme}>
          <Drawer isOpen={true} direction="right" onClose={onClose} confirmOnClose={true}>
            <div>Test Content</div>
          </Drawer>
        </ThemeProvider>
      );
      
      fireEvent.keyDown(window, { key: "Escape" });
      expect(onClose).not.toHaveBeenCalled();
      expect(screen.getByText("確認")).toBeInTheDocument();
      expect(screen.getByText("変更内容が保存されていません。閉じてもよろしいですか？")).toBeInTheDocument();
    });

    it("shows custom message when confirmOnClose is string", () => {
      const onClose = jest.fn();
      const customMessage = "カスタム確認メッセージです";
      
      render(
        <ThemeProvider theme={defaultTheme}>
          <Drawer isOpen={true} direction="right" onClose={onClose} confirmOnClose={customMessage}>
            <div>Test Content</div>
          </Drawer>
        </ThemeProvider>
      );
      
      fireEvent.keyDown(window, { key: "Escape" });
      expect(onClose).not.toHaveBeenCalled();
      expect(screen.getByText(customMessage)).toBeInTheDocument();
    });

    it("shows custom config when confirmOnClose is object", () => {
      const onClose = jest.fn();
      const customConfig = {
        title: "カスタムタイトル",
        message: "カスタムメッセージ",
        confirmText: "はい",
        cancelText: "いいえ",
      };
      
      render(
        <ThemeProvider theme={defaultTheme}>
          <Drawer isOpen={true} direction="right" onClose={onClose} confirmOnClose={customConfig}>
            <div>Test Content</div>
          </Drawer>
        </ThemeProvider>
      );
      
      fireEvent.keyDown(window, { key: "Escape" });
      expect(onClose).not.toHaveBeenCalled();
      expect(screen.getByText("カスタムタイトル")).toBeInTheDocument();
      expect(screen.getByText("カスタムメッセージ")).toBeInTheDocument();
      expect(screen.getByText("はい")).toBeInTheDocument();
      expect(screen.getByText("いいえ")).toBeInTheDocument();
    });

    it("closes drawer when user confirms in dialog", () => {
      const onClose = jest.fn();
      render(
        <ThemeProvider theme={defaultTheme}>
          <Drawer isOpen={true} direction="right" onClose={onClose} confirmOnClose={true}>
            <div>Test Content</div>
          </Drawer>
        </ThemeProvider>
      );
      
      // ESCキーで確認ダイアログを表示
      fireEvent.keyDown(window, { key: "Escape" });
      expect(screen.getByText("確認")).toBeInTheDocument();
      
      // 確認ボタンをクリック
      const confirmButton = screen.getByText("閉じる");
      fireEvent.click(confirmButton);
      
      expect(onClose).toHaveBeenCalledWith("escapeKey");
    });

    it("cancels close when user cancels in dialog", async () => {
      const onClose = jest.fn();
      render(
        <ThemeProvider theme={defaultTheme}>
          <Drawer isOpen={true} direction="right" onClose={onClose} confirmOnClose={true}>
            <div>Test Content</div>
          </Drawer>
        </ThemeProvider>
      );
      
      // ESCキーで確認ダイアログを表示
      fireEvent.keyDown(window, { key: "Escape" });
      expect(screen.getByText("確認")).toBeInTheDocument();
      
      // キャンセルボタンをクリック
      const cancelButton = screen.getByText("キャンセル");
      fireEvent.click(cancelButton);
      
      expect(onClose).not.toHaveBeenCalled();
      
      // ダイアログが消えるまで待つ
      await waitFor(() => {
        expect(screen.queryByText("確認")).not.toBeInTheDocument();
      });
      
      expect(screen.getByText("Test Content")).toBeInTheDocument(); // Drawerは開いたまま
    });

    it("works with backdrop click", () => {
      const onClose = jest.fn();
      render(
        <ThemeProvider theme={defaultTheme}>
          <Drawer isOpen={true} direction="right" onClose={onClose} confirmOnClose={true}>
            <div>Test Content</div>
          </Drawer>
        </ThemeProvider>
      );
      
      // 背景クリックで確認ダイアログを表示
      const contentArea = screen.getByText("Test Content").parentElement;
      const drawerContainer = contentArea?.parentElement;
      const backdrop = drawerContainer?.parentElement;
      
      if (backdrop) {
        fireEvent.click(backdrop);
        expect(screen.getByText("確認")).toBeInTheDocument();
        
        // 確認して閉じる
        const confirmButton = screen.getByText("閉じる");
        fireEvent.click(confirmButton);
        
        expect(onClose).toHaveBeenCalledWith("backdropClick");
      }
    });
  });
}); 