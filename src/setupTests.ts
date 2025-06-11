// ResizeObserverのモック
global.ResizeObserver = class ResizeObserver {
  constructor(_callback: ResizeObserverCallback) {
    // モック実装は何もしない
  }
  observe() {
    // 何もしない
  }
  unobserve() {
    // 何もしない
  }
  disconnect() {
    // 何もしない
  }
};
