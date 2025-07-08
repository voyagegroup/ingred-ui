import React from "react";
import styled from "styled-components";

const StyledMessage = styled.p`
  margin: 16px 0;
  font-size: 13px;
  color: ${({ theme }) => theme.palette.text.secondary};
  text-align: center;
`;

export type ContextMenu2NoResultsMessageProps = {
  message: string;
};

export const ContextMenu2NoResultsMessage: React.FC<
  ContextMenu2NoResultsMessageProps
> = ({ message }) => {
  return <StyledMessage>{message}</StyledMessage>;
};

ContextMenu2NoResultsMessage.displayName = "ContextMenu2NoResultsMessage";
