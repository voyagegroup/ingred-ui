/**
 * 相対値をpx値に変換するヘルパー関数
 * @param value - 変換する値（数値またはvw/vh/%/px等の単位付き文字列）
 * @param direction - Drawerの方向（変換時の基準値決定に使用）
 * @returns px値（数値）
 */
export const convertToPixels = (value: string | number, direction: "left" | "right" | "bottom"): number => {
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