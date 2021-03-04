export type Color = {
  40?: string; // TODO: Abolish this key or define all colors with this key
  50?: string; // TODO: Abolish this key or define all colors with this key
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  1000?: string; // TODO: Abolish this key or define all colors with this key
};

export const colors: { [color: string]: Color } = {
  red: {
    100: "#FFE2E5",
    200: "#FFBAC3",
    300: "#F96979",
    400: "#F34468",
    500: "#EB0A4E",
    600: "#CA0755",
    700: "#A90556",
    800: "#880352",
    900: "#70014E",
  },
  blue: {
    40: "#F4F8FA",
    50: "#F2F9FC",

    100: "#CDF0FE",
    200: "#9CDDFD",
    300: "#6AC3FB",
    400: "#46AAF8",
    500: "#0B82F4",
    600: "#0864D1",
    700: "#054BAF",
    800: "#03348D",
    900: "#022575",
  },
  yellow: {
    100: "#FEFACF",
    200: "#FEF4A0",
    300: "#FEED71",
    400: "#FDE54E",
    500: "#FCD914",
    600: "#D8B70E",
    700: "#B5960A",
    800: "#927606",
    900: "#785F03",
  },
  green: {
    100: "#ECFCD3",
    200: "#D6F9A9",
    300: "#B4ED7B",
    400: "#92DB57",
    500: "#63C427",
    600: "#49A81C",
    700: "#338D13",
    800: "#20710C",
    900: "#135E07",
  },
  basic: {
    50: "#FDFEFF",

    100: "#F5F7F8",
    200: "#E2E8EA",
    300: "#D1D5DA",
    400: "#B3BAC1",
    500: "#959FA9",
    600: "#778490",
    700: "#596978",
    800: "#1F3449",
    900: "#041C33",

    1000: "#001326",
  },
};
