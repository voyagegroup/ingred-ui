import React from "react";
import { Story } from "@storybook/react/types-6-0";
import { Title, Description, ArgsTable, Stories } from "@storybook/addon-docs";
import ConfirmModal from "./ConfirmModal";



export default {
  title: "Components/Utils/ConfirmModal",
  component: ConfirmModal,
  args: {
    isOpen: false,
  },
  parameters: {
    docs: {
      source: { type: "code" },
      page: () => (
        <>
          <Title />
          <Description


  