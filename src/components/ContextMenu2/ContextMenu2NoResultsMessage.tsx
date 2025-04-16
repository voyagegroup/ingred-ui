import React from "react";
import styled from "styled-components";
import { colors } from "../../styles";

const StyledMessage = styled.p`
  margin: 8px;
  padding: 8px;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
  color: ${colors.basic[700]};
  background-color: ${colors.basic[100]};
  border-radius: 4px;
  text-align: center;
`;

export type ContextMenu2NoResultsMessageProps = {
  message: string;
};

export const ContextMenu2NoResultsMessage: React.FC<ContextMenu2NoResultsMessageProps> = ({
  message,
}) => {
  return <StyledMessage>{message}</StyledMessage>;
};

ContextMenu2NoResultsMessage.displayName = "ContextMenu2NoResultsMessage"; 