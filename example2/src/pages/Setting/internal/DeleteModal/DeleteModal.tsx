import * as React from "react";
import { Typography, ConfirmModal } from "ingred-ui";

type Props = {
  todo: Todo;
  onClose?: () => void;
  onSubmit?: (demandId: number) => void;
};

const DeleteModal: React.FunctionComponent<Props> = ({
  todo,
  onClose,
  onSubmit,
}) => {
  const onHandleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (onSubmit) {
      onSubmit(todo.id);
    }
  };
  return (
    <ConfirmModal
      title="TODO削除"
      confirmText="削除する"
      buttonColor="danger"
      onClose={onClose}
      onSubmit={onHandleSubmit}
    >
      <Typography lineHeight="1.7">
        {todo.title}を削除してもよろしいですか？
      </Typography>
    </ConfirmModal>
  );
};

export { DeleteModal };
