export const DAYS_PER_MONTH = 30

// 端数は切り捨て（1850日 → 61ヶ月）
export const daysToMonths = (days: number): number =>
  Math.floor(days / DAYS_PER_MONTH)

// フェーズ3（新規登録）で使う
export const monthsToDays = (months: number): number =>
  months * DAYS_PER_MONTH
