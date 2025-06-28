import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import Drawer from "./Drawer";
import Button from "../Button";
import Typography from "../Typography";

const meta: Meta<typeof Drawer> = {
  title: "Components/Overlays/Drawer",
  component: Drawer,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    direction: {
      control: {
        type: "select",
        options: ["left", "right", "bottom"],
      },
      description: "Drawerの表示方向",
    },
    size: {
      control: "text",
      description: "数値(400)はpx、文字列は単位必須('400px', '30vw', '25%')",
    },
    resizable: {
      control: "boolean",
      description: "ドラッグでリサイズ可能にする",
    },
    minSize: {
      control: "text", 
      description: "最小サイズ - 数値(200)はpx、文字列は単位必須",
    },
    maxSize: {
      control: "text",
      description: "最大サイズ - 数値(800)はpx、文字列は単位必須", 
    },
    stickyHeader: {
      control: "text",
      description: "スクロール時も上部に固定されるヘッダー要素",
    },
    stickyFooter: {
      control: "text", 
      description: "スクロール時も下部に固定されるフッター要素",
    },
    confirmOnClose: {
      control: "object",
      description: "閉じる前に確認ダイアログを表示（boolean | string | object）",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// メインテンプレート - すべてのプロパティをコントロールで制御可能
const MainTemplate = (args: any) => {
  const [open, setOpen] = useState(false);
  const [currentSize, setCurrentSize] = useState(args.size);

  return (
    <div style={{ padding: 20 }}>
      <Button onClick={() => setOpen(true)}>
        Open {args.direction} Drawer {args.resizable ? "(Resizable)" : ""}
      </Button>
      <div style={{ marginTop: 10, fontSize: 14, color: "#666" }}>
        現在サイズ: {currentSize}px
        {args.resizable && " (端をドラッグしてリサイズ可能)"}
      </div>
      
      <Drawer
        {...args}
        isOpen={open}
        size={currentSize}
        onClose={() => setOpen(false)}
        onResize={(newSize) => {
          setCurrentSize(newSize);
          args.onResize?.(newSize);
        }}
      >
        <div style={{ padding: 16 }}>
          <Typography weight="bold" size="xl">
            {args.direction}方向のDrawer
          </Typography>
          <div style={{ marginTop: 16 }}>
            <Typography>
              ESCキーまたは背景クリックで閉じることができます。
            </Typography>
            <Typography>
              コントロールパネルで各種設定を変更してお試しください。
            </Typography>
          </div>
          
          {/* 設定情報の表示 */}
          <div style={{ 
            marginTop: 20, 
            padding: 12, 
            backgroundColor: "#f8f9fa", 
            borderRadius: 4,
            fontSize: 14 
          }}>
            <strong>現在の設定:</strong>
            <div>方向: {args.direction}</div>
            <div>サイズ: {typeof args.size === "string" ? args.size : `${args.size}px`}</div>
            <div>リサイズ: {args.resizable ? "有効" : "無効"}</div>
            {args.resizable && (
              <>
                <div>最小: {typeof args.minSize === "string" ? args.minSize : `${args.minSize}px`}</div>
                <div>最大: {typeof args.maxSize === "string" ? args.maxSize : `${args.maxSize}px`}</div>
              </>
            )}
          </div>
        
          {/* 長いコンテンツでスクロールテスト */}
          <div style={{ marginTop: 20 }}>
            <Typography weight="bold">スクロールテスト</Typography>
            {Array.from({ length: 15 }, (_, i) => (
              <div key={i} style={{ padding: "8px 0", borderBottom: "1px solid #eee" }}>
                行 {i + 1}: スクロールテスト用のコンテンツです。
              </div>
            ))}
          </div>
        </div>
      </Drawer>
    </div>
  );
};

// デフォルトストーリー - すべてのプロパティをコントロールで変更可能
export const Default: Story = {
  render: MainTemplate,
  args: {
    direction: "right",
    size: "30vw",
    resizable: true,
    minSize: "20vw",
    maxSize: "50vw",
  },
};

// スマホ用表示サンプル
const MobileTemplate = (args: any) => {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ 
      padding: 16, 
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "white"
    }}>
      {/* スマホ風のヘッダー */}
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        marginBottom: 20,
        paddingBottom: 16,
        borderBottom: "1px solid rgba(255,255,255,0.2)"
      }}>
        <Typography size="xl" weight="bold">
          📱 モバイルアプリ
        </Typography>
        <Button 
          onClick={() => setOpen(true)}
          color="clear"
          style={{ color: "white", fontSize: 24 }}
        >
          ☰
        </Button>
      </div>

      {/* メインコンテンツ */}
      <div style={{ marginBottom: 20 }}>
        <Typography size="lg" weight="bold">
          📋 スマホ向けDrawerサンプル
        </Typography>
        <div style={{ marginTop: 12, opacity: 0.9 }}>
          <Typography>
            • 画面下からスライドアップ
          </Typography>
          <Typography>
            • タッチ操作でリサイズ可能
          </Typography>
          <Typography>
            • モバイルフレンドリーなUI
          </Typography>
        </div>
      </div>

      <Button onClick={() => setOpen(true)} style={{ width: "100%", marginBottom: 16 }}>
        🚀 ボトムシートを開く
      </Button>

      <Drawer
        {...args}
        isOpen={open}
        onClose={() => setOpen(false)}
        stickyHeader={
          <div style={{ 
            padding: "12px 16px", 
            textAlign: "center", 
            background: "#f8f9fa",
            borderBottom: "1px solid #e9ecef",
            position: "relative"
          }}>
            {/* スワイプハンドル */}
            <div style={{
              width: 40,
              height: 4,
              background: "#dee2e6",
              borderRadius: 2,
              margin: "0 auto 8px",
            }} />
            <Typography weight="bold">📋 アクションシート</Typography>
            <Typography size="sm" color="#666">
              下にスワイプまたは背景タップで閉じる
            </Typography>
          </div>
        }
        stickyFooter={
          <div style={{ 
            padding: "16px", 
            background: "#f8f9fa",
            borderTop: "1px solid #e9ecef",
            display: "flex",
            gap: 12
          }}>
            <Button 
              onClick={() => setOpen(false)}
              color="clear"
              style={{ flex: 1 }}
            >
              キャンセル
            </Button>
            <Button 
              onClick={() => {
                alert("アクション実行！");
                setOpen(false);
              }}
              style={{ flex: 1 }}
            >
              実行
            </Button>
          </div>
        }
      >
        <div style={{ padding: 16 }}>
          {/* アクション一覧 */}
          {[
            { icon: "📷", title: "写真を撮る", desc: "カメラを起動して写真を撮影" },
            { icon: "🖼️", title: "ギャラリーから選択", desc: "既存の写真から選択" },
            { icon: "📄", title: "ファイルを選択", desc: "デバイス内のファイルから選択" },
            { icon: "🔗", title: "URLから追加", desc: "ウェブ上のファイルのURLを入力" },
            { icon: "☁️", title: "クラウドから", desc: "Googleドライブ等から選択" },
          ].map((action, i) => (
            <div 
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "16px 0",
                borderBottom: i < 4 ? "1px solid #e9ecef" : "none",
                cursor: "pointer",
              }}
              onClick={() => {
                alert(`${action.title} が選択されました`);
                setOpen(false);
              }}
            >
              <div style={{ fontSize: 24, marginRight: 16 }}>
                {action.icon}
              </div>
              <div style={{ flex: 1 }}>
                <Typography weight="bold">{action.title}</Typography>
                <Typography size="sm" color="#666">
                  {action.desc}
                </Typography>
              </div>
              <Typography color="#666">›</Typography>
            </div>
          ))}
          
          {/* 追加コンテンツ */}
          <div style={{ marginTop: 24, padding: 16, background: "#f8f9fa", borderRadius: 8 }}>
            <Typography weight="bold" size="sm">💡 ヒント</Typography>
            <Typography size="sm" color="#666">
              このDrawerは{args.resizable ? "リサイズ可能" : "固定サイズ"}です。
              {args.resizable && "上端をドラッグしてサイズを調整できます。"}
            </Typography>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export const MobileView: Story = {
  render: MobileTemplate,
  args: {
    direction: "bottom",
    size: "60vh",
    resizable: true,
    minSize: "30vh",
    maxSize: "80vh",
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
    layout: "fullscreen",
  },
};

// stickyHeader/Footerのデモ
const StickyTemplate = (args: any) => {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ padding: 20 }}>
      <Button onClick={() => setOpen(true)}>
        Sticky Header & Footer Demo
      </Button>
      
      <Drawer
        {...args}
        isOpen={open}
        onClose={() => setOpen(false)}
        stickyHeader={
          <div style={{ 
            padding: "12px 16px", 
            textAlign: "center", 
            fontWeight: "bold",
            background: "#e3f2fd",
            borderBottom: "1px solid #bbdefb"
          }}>
            📌 固定ヘッダー - 常に上部に表示
          </div>
        }
        stickyFooter={
          <div style={{ 
            padding: "12px 16px", 
            display: "flex", 
            gap: 8, 
            justifyContent: "flex-end",
            background: "#f3e5f5",
            borderTop: "1px solid #e1bee7"
          }}>
            <Button onClick={() => setOpen(false)} color="clear">
              キャンセル
            </Button>
            <Button onClick={() => alert("保存しました!")}>
              保存
            </Button>
          </div>
        }
      >
        <div style={{ padding: 16 }}>
          <Typography weight="bold" size="lg">
            スクロール可能なコンテンツエリア
          </Typography>
          <div style={{ marginTop: 16 }}>
            <Typography>
              ヘッダーとフッターは固定され、このエリアのみがスクロールします。
            </Typography>
          </div>
        
          {/* 長いコンテンツ */}
          <div style={{ marginTop: 20 }}>
            {Array.from({ length: 30 }, (_, i) => (
              <div key={i} style={{ 
                padding: "16px 0", 
                borderBottom: "1px solid #eee",
                display: "flex",
                alignItems: "center",
                gap: 12
              }}>
                <div style={{ 
                  width: 40, 
                  height: 40, 
                  background: `hsl(${i * 12}, 60%, 85%)`,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold"
                }}>
                  {i + 1}
                </div>
                <div>
                  <Typography weight="bold">アイテム {i + 1}</Typography>
                  <Typography size="sm" color="#666">
                    スクロールテスト用のコンテンツです。ヘッダーとフッターは固定されたまま表示されます。
                  </Typography>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export const WithStickyHeaderFooter: Story = {
  render: StickyTemplate,
  args: {
    direction: "right",
    size: 450,
    resizable: true,
  },
};

// 確認ダイアログのデモ
const ConfirmCloseTemplate = (args: any) => {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ padding: 20 }}>
      <Button onClick={() => setOpen(true)}>
        確認ダイアログ付きDrawer
      </Button>
      
      <Drawer
        {...args}
        isOpen={open}
        onClose={() => setOpen(false)}
      >
        <div style={{ padding: 16 }}>
          <Typography weight="bold" size="lg">
            📝 編集フォーム
          </Typography>
          <div style={{ marginTop: 16 }}>
            <Typography>
              このDrawerは閉じる前に確認ダイアログが表示されます。
            </Typography>
            <Typography color="#666">
              ESCキーまたは背景クリックで確認ダイアログが表示されます。
            </Typography>
          </div>
        
          {/* 編集中っぽいフォーム */}
          <div style={{ 
            marginTop: 20, 
            padding: 16, 
            border: "1px solid #e5e7eb", 
            borderRadius: 8,
            background: "#fafafa"
          }}>
            <Typography weight="bold">📋 フォームデータ</Typography>
            <div style={{ marginTop: 12 }}>
              <label style={{ display: "block", marginBottom: 4, fontSize: 14, fontWeight: 500 }}>
                タイトル
              </label>
              <input 
                placeholder="タイトルを入力" 
                style={{ 
                  width: "100%", 
                  padding: 8, 
                  border: "1px solid #ddd",
                  borderRadius: 4
                }} 
                defaultValue="サンプルタイトル"
              />
            </div>
            <div style={{ marginTop: 12 }}>
              <label style={{ display: "block", marginBottom: 4, fontSize: 14, fontWeight: 500 }}>
                説明
              </label>
              <textarea 
                placeholder="説明を入力" 
                style={{ 
                  width: "100%", 
                  padding: 8, 
                  height: 80,
                  border: "1px solid #ddd",
                  borderRadius: 4,
                  resize: "vertical"
                }}
                defaultValue="編集中のテキストです。変更を保存せずに閉じようとすると確認ダイアログが表示されます。"
              />
            </div>
            <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
              <Button color="clear" style={{ flex: 1 }}>
                リセット
              </Button>
              <Button style={{ flex: 1 }}>
                保存
              </Button>
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export const WithCloseConfirmation: Story = {
  render: ConfirmCloseTemplate,
  args: {
    direction: "right",
    size: 400,
    confirmOnClose: {
      title: "変更の破棄",
      message: "保存されていない変更があります。このまま閉じると変更内容が失われますが、よろしいですか？",
      confirmText: "破棄して閉じる",
      cancelText: "キャンセル",
    },
  },
};

// 動的な確認ダイアログのデモ（詳細表示 → 編集モード）
const DynamicConfirmTemplate = (args: any) => {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("商品詳細");
  const [description, setDescription] = useState("こちらは商品の詳細情報です。編集ボタンをクリックすることで編集モードに切り替わります。");

  // 編集モードでのみ確認ダイアログを有効化
  const currentConfirmOnClose = isEditing ? {
    title: "⚠️ 編集内容の破棄",
    message: "編集中の内容が保存されていません。破棄してよろしいですか？",
    confirmText: "破棄する",
    cancelText: "編集を続ける",
    buttonColor: "danger" as const,
  } : false;

  const handleSave = () => {
    setIsEditing(false);
    alert("変更を保存しました！");
  };

  const handleCancel = () => {
    // データをリセット
    setTitle("商品詳細");
    setDescription("こちらは商品の詳細情報です。編集ボタンをクリックすることで編集モードに切り替わります。");
    setIsEditing(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <Button onClick={() => setOpen(true)}>
        🔍 商品詳細を開く
      </Button>
      <div style={{ marginTop: 10, fontSize: 14, color: "#666" }}>
        詳細表示では確認ダイアログなし、編集モードでは確認ダイアログありのデモです
      </div>
      
      <Drawer
        {...args}
        isOpen={open}
        onClose={() => {
          setOpen(false);
          // Drawer閉じるときに編集モードもリセット
          if (isEditing) {
            setIsEditing(false);
            setTitle("商品詳細");
            setDescription("こちらは商品の詳細情報です。編集ボタンをクリックすることで編集モードに切り替わります。");
          }
        }}
        confirmOnClose={currentConfirmOnClose}
        stickyHeader={
          <div style={{ 
            padding: "16px 20px", 
            borderBottom: "1px solid #e5e7eb",
            background: "#ffffff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <Typography weight="bold" size="lg">
              {isEditing ? "📝 編集モード" : "👁️ 詳細表示"}
            </Typography>
            <div style={{ display: "flex", gap: 8 }}>
                             {!isEditing ? (
                 <Button 
                   onClick={() => setIsEditing(true)}
                   size="small"
                 >
                   ✏️ 編集
                 </Button>
               ) : (
                 <>
                   <Button 
                     onClick={handleCancel}
                     size="small"
                     color="clear"
                   >
                     キャンセル
                   </Button>
                   <Button 
                     onClick={handleSave}
                     size="small"
                   >
                     💾 保存
                   </Button>
                 </>
               )}
            </div>
          </div>
        }
      >
        <div style={{ padding: 20 }}>
          {/* モード切り替えの説明 */}
          <div style={{ 
            marginBottom: 20, 
            padding: 12, 
            background: isEditing ? "#fef3cd" : "#d1ecf1",
            border: `1px solid ${isEditing ? "#fdeaa7" : "#b6d4d8"}`,
            borderRadius: 4,
            fontSize: 14
          }}>
            <strong>現在のモード:</strong> {isEditing ? "編集中" : "詳細表示"}
            <br />
            <strong>確認ダイアログ:</strong> {isEditing ? "有効（閉じる時に確認）" : "無効（すぐに閉じる）"}
          </div>

          {/* コンテンツエリア */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ 
              display: "block", 
              marginBottom: 8, 
              fontSize: 14, 
              fontWeight: 600,
              color: "#374151"
            }}>
              📋 タイトル
            </label>
            {isEditing ? (
              <input 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{ 
                  width: "100%", 
                  padding: "8px 12px", 
                  border: "2px solid #d1d5db",
                  borderRadius: 6,
                  fontSize: 16,
                  transition: "border-color 0.2s",
                  outline: "none"
                }}
                onFocus={(e) => e.target.style.borderColor = "#3b82f6"}
                onBlur={(e) => e.target.style.borderColor = "#d1d5db"}
              />
            ) : (
              <div style={{ 
                padding: "8px 12px", 
                background: "#f9fafb",
                border: "1px solid #e5e7eb",
                borderRadius: 6,
                fontSize: 16
              }}>
                {title}
              </div>
            )}
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ 
              display: "block", 
              marginBottom: 8, 
              fontSize: 14, 
              fontWeight: 600,
              color: "#374151"
            }}>
              📄 説明
            </label>
            {isEditing ? (
              <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={6}
                style={{ 
                  width: "100%", 
                  padding: "8px 12px", 
                  border: "2px solid #d1d5db",
                  borderRadius: 6,
                  fontSize: 14,
                  lineHeight: "1.5",
                  resize: "vertical",
                  transition: "border-color 0.2s",
                  outline: "none"
                }}
                onFocus={(e) => e.target.style.borderColor = "#3b82f6"}
                onBlur={(e) => e.target.style.borderColor = "#d1d5db"}
              />
            ) : (
              <div style={{ 
                padding: "8px 12px", 
                background: "#f9fafb",
                border: "1px solid #e5e7eb",
                borderRadius: 6,
                fontSize: 14,
                lineHeight: "1.5",
                minHeight: 120
              }}>
                {description}
              </div>
            )}
          </div>

          {/* 操作説明 */}
          <div style={{ 
            marginTop: 24, 
            padding: 16, 
            background: "#f0f9ff",
            border: "1px solid #bae6fd",
            borderRadius: 6
          }}>
            <Typography weight="bold" color="#0369a1">
              💡 操作説明
            </Typography>
            <div style={{ marginTop: 8, fontSize: 14, color: "#0c4a6e" }}>
              {!isEditing ? (
                <>
                  • 現在は <strong>詳細表示モード</strong> です<br />
                  • 「編集」ボタンをクリックして編集モードに切り替えてください<br />
                  • この状態ではESCキーや背景クリックで即座に閉じます
                </>
              ) : (
                <>
                  • 現在は <strong>編集モード</strong> です<br />
                  • テキストを変更してESCキーや背景クリックをお試しください<br />
                  • 確認ダイアログが表示されて変更の破棄確認が行われます
                </>
              )}
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export const DynamicConfirmClose: Story = {
  render: DynamicConfirmTemplate,
  args: {
    direction: "right",
    size: 500,
    resizable: true,
  },
  parameters: {
    docs: {
      description: {
        story: "詳細表示では確認ダイアログなし、編集モードでは確認ダイアログありの動的制御デモです。",
      },
    },
  },
};