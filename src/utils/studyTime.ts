export const MINUTES_PER_HOUR = 60

// 端数は四捨五入（47800分 → 797時間）
export const minutesToHours = (minutes: number): number =>
  Math.round(minutes / MINUTES_PER_HOUR)
