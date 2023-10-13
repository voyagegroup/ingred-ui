export const hex2bin = (hex: string) => {
  if (!hex) return Array(7).fill(Array(24).fill("1")).join("");

  let out = "";
  for (const c of hex) {
    switch (c) {
      case "0":
        out += "0000";
        break;
      case "1":
        out += "0001";
        break;
      case "2":
        out += "0010";
        break;
      case "3":
        out += "0011";
        break;
      case "4":
        out += "0100";
        break;
      case "5":
        out += "0101";
        break;
      case "6":
        out += "0110";
        break;
      case "7":
        out += "0111";
        break;
      case "8":
        out += "1000";
        break;
      case "9":
        out += "1001";
        break;
      case "a":
        out += "1010";
        break;
      case "b":
        out += "1011";
        break;
      case "c":
        out += "1100";
        break;
      case "d":
        out += "1101";
        break;
      case "e":
        out += "1110";
        break;
      case "f":
        out += "1111";
        break;
      default:
        return "";
    }
  }

  return out;
};

/**
 * @param hex odr_targeting_week_time の16進数表記
 * @returns 週ごとの時間帯ターゲティングの設定の多重配列。[曜日][時間]の順（0番目が月曜日、0番目のn番目がn時）
 */
export const getTargetSetting = (hex?: string): string[][] => {
  if (!hex) return Array(7).fill(Array(24).fill("1"));

  const binary = hex2bin(hex);
  const times: string[][] = [];

  for (let d = 0; d < 7; d++) {
    times[d] = [];
    for (let h = 0; h < 24; h++) {
      times[d][h] = binary.charAt(d * 24 + h);
    }
  }

  return times;
};
