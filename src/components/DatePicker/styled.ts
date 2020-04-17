import styled from "styled-components";
import { Size, Radius } from "../../styles";
import { colors } from "../../styles/color";

export const Container = styled.div<{ error: boolean }>`
  /* Overriding styles */
  /* DateRangePicker */
  .DateRangePicker {
    display: inline-flex; /* これがないと.DateRangePickerInputのoveflow:hiddenで位置がずれる */
  }

  /* DateRangePickerInput */
  .DateRangePickerInput {
    display: block;
    border: ${Size.Border.Small} solid
      ${({ error }) =>
        error ? ({ theme }) => theme.palette.danger.main : colors.basic[300]};
    border-radius: ${Radius.SMALL};
    background-color: ${({ theme }) => theme.palette.background.default};
    box-shadow: 0 ${Size.Border.Normal} 0 0
      ${({ theme }) => theme.palette.gray.light} inset;
    overflow: hidden;
  }
  .DateInput {
    width: 96px;
    background-color: transparent;
  }
  .DateInput_input {
    padding: 10px 11px 8px;
    line-height: 20px;
    font-size: 14px;
    color: ${({ error }) =>
      error
        ? ({ theme }) => theme.palette.danger.main
        : ({ theme }) => theme.palette.black};
    background-color: transparent;
    font-family: "Noto Sans JP", "Hiragino Kaku Gothic ProN", "Proxima Nova",
      Verdana, "游ゴシック", YuGothic, Meiryo, sans-serif;
  }
  .DateInput_input__focused {
    border-bottom-color: ${({ theme }) => theme.palette.primary.main};
  }
  /* DayPickerRangeController */
  .DayPicker__withBorder {
    box-shadow: 0px 0px 16px #041c3315;
    border-radius: ${Radius.SMALL};
  }
  .DayPicker_weekHeader {
    color: ${({ theme }) => theme.palette.text.secondary};
  }
  td {
    position: relative;
  }
  td:nth-child(7n):not(.CalendarDay__selected_start) {
    &:before {
      left: 0;
      border-top-right-radius: 11px;
      border-bottom-right-radius: 11px;
    }
    &:after {
      left: 0;
    }
  }
  td:nth-child(7n).CalendarDay__selected_span,
  td:nth-child(7n).CalendarDay__hovered_span {
    &:before {
      width: calc((41px - 22px) / 2 + 22px);
    }
    &:before {
      width: calc((41px - 22px) / 2 + 22px);
    }
  }
  td:nth-child(7n + 1):not(.CalendarDay__selected_end) {
    &:before {
      right: 0;
      border-top-left-radius: 11px;
      border-bottom-left-radius: 11px;
    }
    &:after {
      right: 0;
    }
  }
  td:nth-child(7n + 1).CalendarDay__selected_span,
  td:nth-child(7n + 1).CalendarDay__hovered_span {
    &:before {
      width: calc((41px - 22px) / 2 + 22px);
    }
  }
  .CalendarMonth_caption {
    font-size: 16px;
    padding-bottom: 50px;
  }
  .CalendarDay__blocked_out_of_range {
    border: 0;
  }
  .CalendarDay__default {
    border: 0;
    font-size: 12px;
  }
  .CalendarDay__hovered_span {
    background: transparent;
    color: ${({ theme }) => theme.palette.black};
    z-index: 1;
    &:hover {
      background: inherit;
      border: 0;
      color: inherit;
    }
    &:before {
      content: "";
      display: block;
      position: absolute;
      top: 50%;
      /* left: 0; td:nth-childにて指定している */
      transform: translateY(-50%);
      width: 100%;
      height: 22px;
      background: ${({ theme }) => theme.palette.primary.highlight};
      z-index: -1;
    }
  }
  .CalendarDay__selected_span {
    background: transparent;
    color: ${({ theme }) => theme.palette.black};
    z-index: 1;
    &:hover {
      background: inherit;
      border: 0;
      color: inherit;
      &:before {
        background: ${({ theme }) => theme.palette.background.hint};
      }
    }
    &:before {
      content: "";
      display: block;
      position: absolute;
      top: 50%;
      /* left: 0; td:nth-childにて指定している */
      transform: translateY(-50%);
      width: 100%;
      height: 22px;
      background: ${({ theme }) => theme.palette.primary.highlight};
      z-index: -1;
    }
  }
  .CalendarDay__outside {
    color: ${({ theme }) => theme.palette.text.secondary};
  }
  .CalendarDay__selected {
    background: transparent;
    color: ${({ theme }) => theme.palette.white};
    z-index: 1;
    &:hover {
      background: inherit;
      border: 0;
      color: ${({ theme }) => theme.palette.white};
      &:before {
        background: ${({ theme }) => theme.palette.primary.dark};
      }
      &::after {
        background: ${({ theme }) => theme.palette.background.hint};
      }
    }
    &:before {
      content: "";
      display: block;
      position: absolute;
      top: 50%;
      left: 50% !important; /* td:nth-child(7n):beforeで上書きされるのを防ぐ */
      transform: import { Size } from '../../styles/size';
translate(calc(-50% - 0.5px), -50%);
      width: 22px;
      height: 22px;
      background: ${({ theme }) => theme.palette.primary.main};
      border-radius: 50%;
      z-index: -1;
    }
  }
  .CalendarDay__selected_start {
    &::after {
      content: "";
      display: block;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateY(-50%);
      width: 50%;
      height: 22px;
      background: ${({ theme }) => theme.palette.primary.highlight};
      z-index: -2;
    }
  }
  .CalendarDay__selected_end {
    &::after {
      content: "";
      display: block;
      position: absolute;
      top: 50%;
      right: 50%;
      transform: translateY(-50%);
      width: 50%;
      height: 22px;
      background: ${({ theme }) => theme.palette.primary.highlight};
      z-index: -2;
    }
  }
`;

export const CustomArrowIcon = styled.div`
  width: 8px;
  height: 1px;
  background-color: ${({ theme }) => theme.palette.text.hint};
`;

export const BaseNavIcon = styled.div`
  position: absolute;
  top: 22px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.palette.gray.light};
`;

export const NavPrev = styled(BaseNavIcon)`
  left: 30px;
`;

export const NavNext = styled(BaseNavIcon)`
  right: 30px;
`;
