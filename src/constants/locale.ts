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
    FileUploader: { defaultProps: { title: "タイトル" } },
    ItemEmpty: { defaultProps: { title: "タイトル" } },
  },
};

export const zhCN: Localization = {
  components: {
    ToggleButton: {
      defaultProps: { activeText: "开", inActiveText: "关" },
    },
  },
};

// default
export const enUS: Localization = {
  // No localization needed.
  //
};
