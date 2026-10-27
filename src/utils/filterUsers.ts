import type { User, UserFilter } from '../types/user'

// 生徒の studyLangs とメンターの useLangs を、同じ「言語」として取り出す
export const getLangs = (user: User): string[] =>
  user.role === 'student' ? user.studyLangs : user.useLangs

// 言語は大文字小文字を区別しない（GoLang と Golang を同じとみなす）
const isSameLang = (a: string, b: string): boolean =>
  a.toLowerCase() === b.toLowerCase()

// 大文字小文字を無視して重複を除く。表記は最初に出てきたものを残す
const uniqueIgnoringCase = (values: string[]): string[] =>
  values.filter(
    (value, index) =>
      values.findIndex((other) => isSameLang(other, value)) === index,
  )

// 選択肢を探しやすいよう並べ替える（日本語の読み順・アルファベット順。大文字小文字は区別しない）
const sortOptions = (options: string[]): string[] =>
  [...options].sort((a, b) =>
    a.localeCompare(b, 'ja', { sensitivity: 'base' }),
  )

export const getHobbyOptions = (users: readonly User[]): string[] =>
  sortOptions([...new Set(users.flatMap((user) => user.hobbies))])

export const getLangOptions = (users: readonly User[]): string[] =>
  sortOptions(uniqueIgnoringCase(users.flatMap(getLangs)))

// 趣味と言語の両方を満たすユーザーを返す（AND）。T を受け取るので Student[] は Student[] のまま返る
export const filterUsers = <T extends User>(
  users: readonly T[],
  filter: UserFilter,
): T[] => {
  const { hobby, lang } = filter

  return users.filter(
    (user) =>
      (hobby === null || user.hobbies.includes(hobby)) &&
      (lang === null || getLangs(user).some((userLang) => isSameLang(userLang, lang))),
  )
}
