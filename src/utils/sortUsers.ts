import type { SortOrder } from '../types/user'

// T は「key の値が number である型」に限る。
// 例：Student[] に 'experienceDays' を渡すとコンパイルエラーになる
export const sortUsers = <T extends Record<K, number>, K extends keyof T>(
  users: readonly T[],
  key: K,
  order: SortOrder,
): T[] =>
  // 元の配列を壊さないよう、コピーしてから並べ替える
  [...users].sort((a, b) =>
    order === 'asc' ? a[key] - b[key] : b[key] - a[key],
  )
