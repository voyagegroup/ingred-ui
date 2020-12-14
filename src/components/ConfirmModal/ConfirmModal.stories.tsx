import * as React from "react";
import styled from "styled-components";
import ConfirmModal from ".";
import Spacer from "../Spacer";
import DataTable from "../DataTable";
import Typography from "../Typography";
import Button from "../Button";
import { data } from "../DataTable/data";
import { action } from "@storybook/addon-actions";

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing * 3}px;
  background-color: ${({ theme }) => theme.palette.background.dark};
`;

export default {
  title: "Components/Utils/ConfirmModal",
  component: ConfirmModal,
  parameters: {
    docs: { page: null },
  },
};

export const Overview: React.FunctionComponent = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const handleToggleButton = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Container>
      <Button onClick={handleToggleButton}>Open Modal</Button>
      <ConfirmModal
        isOpen={isOpen}
        title="タイトル"
        onClose={handleToggleButton}
        onSubmit={action("submit")}
      >
        コンテンツ
      </ConfirmModal>
    </Container>
  );
};

export const WithDanger = () => (
  <Container>
    <ConfirmModal
      title="タイトル"
      buttonColor="danger"
      confirmText="削除する"
      onSubmit={action("submit")}
    >
      コンテンツ
    </ConfirmModal>
  </Container>
);

export const WithFullSize = () => (
  <Container>
    <Spacer pt={2} />
    <ConfirmModal title="タイトル" fullSize={true} onSubmit={action("submit")}>
      コンテンツ
    </ConfirmModal>
  </Container>
);

export const WithTips = () => (
  <Container>
    <Spacer pt={2} />
    <ConfirmModal
      title="タイトル"
      tipElement={
        <Typography size="sm" lineHeight="1.7">
          モーダルの設定内容に関する脚注を入れたい場合は、
          &quot;tipElement&quot;
          に表示したい内容を追加することでfloatingTipを追加できます。
        </Typography>
      }
      fullSize={true}
      onSubmit={action("submit")}
    >
      コンテンツ
    </ConfirmModal>
  </Container>
);

export const WithLoading = () => (
  <Container>
    <Spacer pt={2} />
    <ConfirmModal title="タイトル" loading={true} onSubmit={action("submit")}>
      コンテンツ
    </ConfirmModal>
  </Container>
);

export const WithOverflowYScroll = () => (
  <Container>
    <Spacer pt={2} />
    <ConfirmModal
      title="タイトル"
      overflowYScroll={true}
      disableHorizontalPadding={true}
      onSubmit={action("submit")}
    >
      <DataTable
        data={data}
        columns={[
          {
            name: "ID",
            selector: (data) => data.id,
            sortable: true,
          },
          {
            name: "名前",
            selector: (data) => data.date,
            sortable: true,
          },
        ]}
      />
    </ConfirmModal>
  </Container>
);

export const WithDisableFooter = () => (
  <Container>
    <Spacer pt={2} />
    <ConfirmModal title="タイトル" fullSize={true} overflowYScroll={false}>
      コンテンツ
    </ConfirmModal>
  </Container>
);

export const WithOverflowAndDisableFooter = () => (
  <Container>
    <Spacer pt={2} />
    <ConfirmModal
      title="タイトル"
      // overflowYScroll={true}
      disableHorizontalPadding={true}
    >
      <DataTable
        data={data}
        columns={[
          {
            name: "ID",
            selector: (data) => data.id,
            sortable: true,
          },
          {
            name: "名前",
            selector: (data) => data.date,
            sortable: true,
          },
        ]}
      />
    </ConfirmModal>
  </Container>
);

export const WithSubActions = () => (
  <Container>
    <Spacer pt={2} />
    <ConfirmModal
      title="タイトル"
      fullSize={true}
      overflowYScroll={false}
      subActions={[
        {
          title: "CSV形式でダウンロード",
          icon: "export",
          action: action("onClick"),
        },
        {
          title: "ダッシュボードに追加",
          icon: "export",
          action: action("onClick"),
        },
      ]}
    >
      コンテンツ
    </ConfirmModal>
  </Container>
);
