import {
  ConfirmModalProps,
  FileUploaderProps,
  ItemEmptyProps,
  MultipleFilterProps,
  ToggleButtonProps,
} from "..";
import { DatePickerProps, SelectProps } from "../components";
import { CreatableSelectProps } from "../components/CreatableSelect";
import { FullSizeConfirmModalProps } from "../components/FullSizeConfirmModal";
import { EditFilterCardProps } from "../components/MultipleFilter/internal/EditFilterCard/EditFilterCard";
import { FilterCardProps } from "../components/MultipleFilter/internal/FilterCard/FilterCard";

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export interface Localization {
  components?: {
    ToggleButton?: {
      defaultProps: Pick<ToggleButtonProps, "checkedText" | "unCheckedText">;
    };
    ConfirmModal?: {
      defaultProps: Pick<ConfirmModalProps, "confirmText" | "cancelText">;
    };
    FullSizeConfirmModal?: {
      defaultProps: Pick<
        FullSizeConfirmModalProps,
        "confirmText" | "cancelText"
      >;
    };
    FileUploader?: {
      defaultProps: Pick<FileUploaderProps, "title">;
    };
    ItemEmpty?: {
      defaultProps: Pick<ItemEmptyProps, "title">;
    };
    Select?: {
      defaultProps: Pick<
        SelectProps<any, boolean>,
        "placeholder" | "emptyMessage"
      >;
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
      defaultProps: Pick<DatePickerProps, "monthFormat"> & {
        weekList: string[];
      };
    };
    DateRangePicker?: {
      defaultProps: Pick<DatePickerProps, "monthFormat"> & {
        weekList: string[];
      };
    };
    WeekTime?: {
      defaultProps: {
        weekList: string[];
      };
    };
    WeekTimeSelector?: {
      defaultProps: {
        weekList: string[];
      };
    };
    DualListBox?: {
      defaultProps: {
        selectedItemTitle: string;
      };
    };
  };
}

export const jaJP: Localization = {
  components: {
    ToggleButton: {
      defaultProps: { checkedText: "オン", unCheckedText: "オフ" },
    },
    ConfirmModal: {
      defaultProps: { confirmText: "確認", cancelText: "キャンセル" },
    },
    FullSizeConfirmModal: {
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
      defaultProps: {
        monthFormat: "YYYY年MM月",
        weekList: ["日", "月", "火", "水", "木", "金", "土"],
      },
    },
    DateRangePicker: {
      defaultProps: {
        monthFormat: "YYYY年MM月",
        weekList: ["日", "月", "火", "水", "木", "金", "土"],
      },
    },
    WeekTime: {
      defaultProps: {
        weekList: ["月", "火", "水", "木", "金", "土", "日"],
      },
    },
    WeekTimeSelector: {
      defaultProps: {
        weekList: ["月", "火", "水", "木", "金", "土", "日"],
      },
    },
    DualListBox: {
      defaultProps: {
        selectedItemTitle: "個選択済み",
      },
    },
  },
};

export const zhCN: Localization = {
  components: {
    ToggleButton: {
      defaultProps: { checkedText: "开", unCheckedText: "关" },
    },
    ConfirmModal: {
      defaultProps: { confirmText: "确认", cancelText: "取消" },
    },
    FullSizeConfirmModal: {
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
  components: {
    DatePicker: {
      defaultProps: {
        monthFormat: "MMM YYYY",
        weekList: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      },
    },
    DateRangePicker: {
      defaultProps: {
        monthFormat: "MMM YYYY",
        weekList: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      },
    },
    WeekTime: {
      defaultProps: {
        weekList: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
    },
    WeekTimeSelector: {
      defaultProps: {
        weekList: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
    },
    DualListBox: {
      defaultProps: {
        selectedItemTitle: "selected",
      },
    },
  },
};

export type LocalizationComponentName = keyof (Localization["components"] & {});
