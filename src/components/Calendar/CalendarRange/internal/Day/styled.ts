import styled from "styled-components";

export const DayStyle = styled.button`
  background-color: transparent;
  border: none;
  height: ${({ theme }) => theme.spacing * 4}px;
  width: ${({ theme }) => theme.spacing * 4}px;
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing / 2}px 0;
  text-align: center;
  border-radius: 50%;

  &:hover {
    transition: 0.3s;
    background-color: ${({ theme }) => theme.palette.primary.main};
    color: ${({ theme }) => theme.palette.white};
  }
`;

// 選択された日付の共通スタイル
const SelectedDate = styled(DayStyle)`
  border-radius: 50%;
  &::before {
    height: ${({ theme }) => theme.spacing * 4}px;
    width: ${({ theme }) => theme.spacing * 4}px;
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${({ theme }) => theme.palette.primary.light};
    z-index: -1;
  }
`;

// 開始日と終了日の共通スタイル
// SelectedDate を上書きしている
const EdgeDate = styled(SelectedDate)`
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.white};

  &::before {
    width: 50%;
  }
`;

export const DayStart = styled(EdgeDate)`
  &::before {
    transform: translateX(100%);
  }
`;

export const DayEnd = styled(EdgeDate)``;

export const DayBetween = styled(SelectedDate)``;

export const DisableDayContainer = styled(DayStyle)`
  color: ${({ theme }) => theme.palette.gray.main};
  cursor: not-allowed;
  &:hover {
    background-color: ${({ theme }) => theme.palette.gray.light};
  }
`;
