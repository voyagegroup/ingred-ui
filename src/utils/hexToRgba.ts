/**
 *
 * @param hex #FF0000 or #F00
 * @param alpha 0.0 ~ 1.0
 */
export function hexToRgba(hex: string, alpha = 1): string {
  let c: number[] = [0, 0, 0];
  // long
  let r = hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
  if (r) {
    c = r.slice(1, 4).map((x) => parseInt(x, 16));
  }

  // short
  r = hex.match(/^#([0-9a-f])([0-9a-f])([0-9a-f])$/i);
  if (r) {
    c = r.slice(1, 4).map((x) => 0x11 * parseInt(x, 16));
  }

  return `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${alpha})`;
}
