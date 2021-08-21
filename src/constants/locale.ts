import {
  ConfirmModalProps,
  FileUploaderProps,
  ItemEmptyProps,
  ToggleButtonProps,
} from "..";

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export interface Localization {
  components?: {
    ToggleButton?: {
      defaultProps: Pick<ToggleButtonProps, "activeText" | "inActiveText">;
    };
    ConfirmModal?: {
      defaultProps: Pick<ConfirmModalProps, "confirmText" | "cancelText">;
    };
    FileUploader?: {
      defaultProps: Pick<FileUploaderProps, "title">;
    };
    ItemEmpty?: {
      defaultProps: Pick<ItemEmptyProps, "title">;
    };
  };
}

export const jaJP: Localization = {
  components: {
    ToggleButton: {
      defaultProps: { activeText: "オン", inActiveText: "オフ" },
    },
    ConfirmModal: {
      defaultProps: { confirmText: "確認", cancelText: "キャンセル" },
    },
    FileUploader: {
      defaultProps: {
        title: "ファイルをドラッグ&ドロップ、またはここをクリック",
      },
    },
    ItemEmpty: { defaultProps: { title: "見つかりませんでした。" } },
  },
};

export const zhCN: Localization = {
  components: {
    ToggleButton: {
      defaultProps: { activeText: "开", inActiveText: "关" },
    },
    ConfirmModal: {
      defaultProps: { confirmText: "确认", cancelText: "取消" },
    },
    FileUploader: {
      defaultProps: {
        title: "把文件拖入,  同样支持点击上传。",
      },
    },
    ItemEmpty: { defaultProps: { title: "未找到。" } },
  },
};

// default
export const enUS: Localization = {
  // No localization needed.
  //
};
