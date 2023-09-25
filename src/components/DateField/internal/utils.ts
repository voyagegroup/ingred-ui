export const getInputWidth = (input: string) =>
  [...input.split("")].reduce((acc, char) => {
    const code = char.charCodeAt(0);
    return acc + (code >= 0x3000 && code <= 0xff60 ? 2 : 1);
  }, 0);
