import * as React from "react";
import styled from "styled-components";
import Spacer from "../Spacer";
import Typography from "../Typography";
import Flex from "./Flex";

const Square = styled.div`
  width: 50px;
  height: 50px;
  background-color: ${({ theme }) => theme.palette.background.active};
`;

const FullBox = styled.div`
  width: 100%;
`;

export default {
  title: "Components/Layout/Flex",
  component: Flex,
};

export const Overview = () => (
  <>
    <Typography size="xxl" color="secondary">
      This is utility component that can use CSS flex layout.
    </Typography>
    <Spacer pt={2} />
    <FullBox>
      <Flex display="flex" justifyContent="space-between">
        <Square />
        <Square />
        <Square />
      </Flex>
    </FullBox>
  </>
);
