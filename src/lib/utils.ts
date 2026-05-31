// src/lib/utils.ts

/** Clamp a value between min and max */
export const clamp = (val: number, min: number, max: number) =>
  Math.min(Math.max(val, min), max);

/** Linear interpolation */
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Map a value from one range to another */
export const mapRange = (
  val: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
) => {
  const t = (val - inMin) / (inMax - inMin);
  return outMin + t * (outMax - outMin);
};

/** Convert degrees to radians */
export const degToRad = (deg: number) => (deg * Math.PI) / 180;