const bin2hex = (bin: string) => {
  let out = "";
  for (let i = 0; i < bin.length; i += 4) {
    const c = bin.substr(i, 4);
    switch (c) {
      case "0000":
        out += "0";
        break;
      case "0001":
        out += "1";
        break;
      case "0010":
        out += "2";
        break;
      case "0011":
        out += "3";
        break;
      case "0100":
        out += "4";
        break;
      case "0101":
        out += "5";
        break;
      case "0110":
        out += "6";
        break;
      case "0111":
        out += "7";
        break;
      case "1000":
        out += "8";
        break;
      case "1001":
        out += "9";
        break;
      case "1010":
        out += "a";
        break;
      case "1011":
        out += "b";
        break;
      case "1100":
        out += "c";
        break;
      case "1101":
        out += "d";
        break;
      case "1110":
        out += "e";
        break;
      case "1111":
        out += "f";
        break;
      default:
        return "";
    }
  }

  return out;
};

export const convertTargetSettingToHex = (targetSetting: string[][]) => {
  let bin = "";
  for (let d = 0; d < 7; d++) {
    for (let h = 0; h < 24; h++) {
      bin += targetSetting[d][h];
    }
  }

  return bin2hex(bin);
};

/**
 * 開始位置と終了位置のそれぞれのの曜日と時間帯から、選択範囲を取得する
 */
export const getNewWeekTimeList = (
  startWeekIndex: number,
  startTimeIndex: number,
  endWeekIndex: number,
  endTimeIndex: number,
  newValue: string,
  weekTimeList: string[][],
) => {
  const newWeekTimeList = [...weekTimeList];
  const minWeekIndex = Math.min(startWeekIndex, endWeekIndex);
  const maxWeekIndex = Math.max(startWeekIndex, endWeekIndex);
  const minTimeIndex = Math.min(startTimeIndex, endTimeIndex);
  const maxTimeIndex = Math.max(startTimeIndex, endTimeIndex);

  for (let i = minWeekIndex; i <= maxWeekIndex; i++) {
    const weekTime = newWeekTimeList[i];
    const newWeekTime = weekTime.map((t, index) => {
      if (
        i >= minWeekIndex &&
        i <= maxWeekIndex &&
        index >= minTimeIndex &&
        index <= maxTimeIndex
      ) {
        return newValue; // 選択範囲内のセルの場合、newValueに更新
      }
      return t;
    });

    newWeekTimeList[i] = newWeekTime;
  }

  return newWeekTimeList;
};
