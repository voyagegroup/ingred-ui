import * as React from "react";
import styled from "styled-components";
import ConfirmModal from ".";
import Spacer from "../Spacer";
import DataTable from "../DataTable";
import { data } from "../DataTable/data";

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing * 3}px;
  background-color: ${({ theme }) => theme.palette.background.dark};
`;

export default {
  title: "ConfirmModal",
  parameters: {
    component: ConfirmModal
  }
};

export const Overview = () => (
  <Container>
    <ConfirmModal title="タイトル">コンテンツ</ConfirmModal>
  </Container>
);

export const WithDanger = () => (
  <Container>
    <ConfirmModal title="タイトル" buttonColor="danger" confirmText="削除する">
      コンテンツ
    </ConfirmModal>
  </Container>
);

export const WithFullSize = () => (
  <Container>
    <Spacer pt={2} />
    <ConfirmModal title="タイトル" fullSize={true}>
      コンテンツ
    </ConfirmModal>
  </Container>
);

export const WithLoading = () => (
  <Container>
    <Spacer pt={2} />
    <ConfirmModal title="タイトル" loading={true}>
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
    >
      <DataTable
        data={data}
        columns={[
          {
            name: "ID",
            selector: data => data.id,
            sortable: true
          },
          {
            name: "名前",
            selector: data => data.date,
            sortable: true
          }
        ]}
      />
    </ConfirmModal>
  </Container>
);
