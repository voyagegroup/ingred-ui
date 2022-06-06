import {
  ConfirmModalProps,
  FileUploaderProps,
  ItemEmptyProps,
  MultipleFilterProps,
  ToggleButtonProps,
  DatePickerProps,
  DateRangePickerProps,
} from "..";
import { SelectProps } from "../components";
import { CreatableSelectProps } from "../components/CreatableSelect";
import { EditFilterCardProps } from "../components/MultipleFilter/internal/EditFilterCard/EditFilterCard";
import { FilterCardProps } from "../components/MultipleFilter/internal/FilterCard/FilterCard";

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
    Select?: {
      defaultProps: Pick<SelectProps<any>, "placeholder" | "emptyMessage">;
    };
    CreatableSelect?: {
      defaultProps: Pick<
        CreatableSelectProps<any>,
        "placeholder" | "emptyMessage" | "addMessage"
      >;
    };
    MultipleFilter?: {
      defaultProps: Pick<MultipleFilterProps, "placeholder">;
    };
    FilterCard?: {
      defaultProps: Pick<
        FilterCardProps,
        | "applyButtonTitle"
        | "inputErrorText"
        | "formPlaceholder"
        | "sectionTitle"
        | "conditionTitle"
      >;
    };
    EditFilterCard?: {
      defaultProps: Pick<
        EditFilterCardProps,
        | "editButtonTitle"
        | "inputErrorText"
        | "formPlaceholder"
        | "sectionTitle"
        | "conditionTitle"
      >;
    };
    DatePicker?: {
      defaultProps: Pick<DatePickerProps, "displayFormat" | "monthFormat">;
    };
    DateRangePicker?: {
      defaultProps: Pick<DateRangePickerProps, "displayFormat" | "monthFormat">;
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
    Select: {
      defaultProps: { placeholder: "選択...", emptyMessage: "見つかりません" },
    },
    CreatableSelect: {
      defaultProps: {
        placeholder: "選択...",
        emptyMessage: "見つかりません",
        addMessage: "次の文字列を追加する",
      },
    },
    MultipleFilter: {
      defaultProps: { placeholder: "新しいフィルターを追加してください" },
    },
    FilterCard: {
      defaultProps: {
        applyButtonTitle: "適用",
        inputErrorText: "入力してください",
        formPlaceholder: "検索",
        sectionTitle: "セクション",
        conditionTitle: "条件",
      },
    },
    EditFilterCard: { defaultProps: {} },
    DatePicker: {
      defaultProps: { displayFormat: "YYYY/MM/DD", monthFormat: "YYYY年 M月" },
    },
    DateRangePicker: {
      defaultProps: { displayFormat: "YYYY/MM/DD", monthFormat: "YYYY年 M月" },
    },
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
