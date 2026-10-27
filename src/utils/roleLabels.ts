import type { Role } from '../types/user'

// データは student / mentor のまま持ち、画面では日本語で表示する（一覧と登録フォームで使う）
export const ROLE_LABELS: Record<Role, string> = {
  student: '生徒',
  mentor: 'メンター',
}
