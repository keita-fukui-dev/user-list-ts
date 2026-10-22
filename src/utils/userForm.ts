import type {
  NewUser,
  Role,
  User,
  UserFormErrors,
  UserFormField,
  UserFormValues,
} from '../types/user'
import { monthsToDays } from './experience'
import {
  isNumberText,
  isValidEmail,
  isValidPhone,
  isValidPostCode,
  isValidUrl,
  toHalfWidth,
} from './validators'

type ParseResult =
  | { ok: true; user: NewUser }
  | { ok: false; errors: UserFormErrors }

// 数値項目で受け付ける範囲。数値項目はすべて整数とする
type NumberRange = {
  min: number
  max?: number
}

const REQUIRED_MESSAGE = '必須です'
const NOT_NUMBER_MESSAGE = '数値で入力してください'
const NOT_INTEGER_MESSAGE = '整数で入力してください'

// カンマ区切りを配列にする。全角の「，」「、」も区切りとして扱い、空の要素と重複は除く
export const splitList = (text: string): string[] => [
  ...new Set(
    text
      .split(/[,，、]/)
      .map((item) => item.trim())
      .filter((item) => item !== ''),
  ),
]

// 現在の一覧の最大値 + 1。一覧が空なら 1
export const getNextId = (users: readonly User[]): number =>
  Math.max(0, ...users.map((user) => user.id)) + 1

// 入力値を検証し、問題がなければ登録用のユーザーに変換する
// users はメールアドレスの重複チェックに使う。引数は書き換えない（errors は関数の中で作る新しいオブジェクト）
export const parseUserForm = (
  role: Role,
  values: UserFormValues,
  users: readonly User[],
): ParseResult => {
  const errors: UserFormErrors = {}

  const toText = (field: UserFormField): string => {
    const text = values[field].trim()
    if (text === '') {
      errors[field] = REQUIRED_MESSAGE
    }
    return text
  }

  // 必須チェックのあと、形式が正しくなければ message をエラーにする
  const toCheckedText = (
    field: UserFormField,
    text: string,
    isValid: (text: string) => boolean,
    message: string,
  ): string => {
    if (text !== '' && !isValid(text)) {
      errors[field] = message
    }
    return text
  }

  const toNumber = (field: UserFormField, { min, max }: NumberRange): number => {
    const text = toHalfWidth(toText(field))
    if (text === '') {
      return 0
    }
    if (!isNumberText(text)) {
      errors[field] = NOT_NUMBER_MESSAGE
      return 0
    }
    const value = Number(text)
    if (!Number.isInteger(value)) {
      errors[field] = NOT_INTEGER_MESSAGE
    } else if (value < min) {
      errors[field] = `${min}以上で入力してください`
    } else if (max !== undefined && value > max) {
      errors[field] = `${max}以下で入力してください`
    }
    return value
  }

  const toList = (field: UserFormField): string[] => {
    const items = splitList(values[field])
    if (items.length === 0) {
      errors[field] = REQUIRED_MESSAGE
    }
    return items
  }

  const email = toCheckedText(
    'email',
    toText('email'),
    isValidEmail,
    'メールアドレスの形式で入力してください',
  )
  if (
    errors.email === undefined &&
    users.some((user) => user.email.toLowerCase() === email.toLowerCase())
  ) {
    errors.email = 'このメールアドレスは登録済みです'
  }

  const common = {
    name: toText('name'),
    email,
    age: toNumber('age', { min: 0, max: 150 }),
    postCode: toCheckedText(
      'postCode',
      toHalfWidth(toText('postCode')),
      isValidPostCode,
      '123-4567 の形式で入力してください',
    ),
    // 元データに合わせて、ハイフンを除いた数字だけで保存する
    phone: toCheckedText(
      'phone',
      toHalfWidth(toText('phone')).replaceAll('-', ''),
      isValidPhone,
      '0から始まる10〜11桁の数字で入力してください',
    ),
    hobbies: toList('hobbies'),
    url: toCheckedText(
      'url',
      toText('url'),
      isValidUrl,
      'http:// または https:// から始まるURLを入力してください',
    ),
  }

  // role で分けて組み立てると、それぞれ NewStudent / NewMentor として型チェックされる
  let user: NewUser
  if (role === 'student') {
    user = {
      ...common,
      role: 'student',
      studyMinutes: toNumber('studyMinutes', { min: 0 }),
      taskCode: toNumber('taskCode', { min: 0 }),
      studyLangs: toList('studyLangs'),
      score: toNumber('score', { min: 0, max: 100 }),
    }
  } else {
    user = {
      ...common,
      role: 'mentor',
      experienceDays: monthsToDays(toNumber('experienceMonths', { min: 0 })),
      useLangs: toList('useLangs'),
      availableStartCode: toNumber('availableStartCode', { min: 0 }),
      availableEndCode: toNumber('availableEndCode', { min: 0 }),
    }
    // 両方とも正しい数値のときだけ、大小関係を確認する
    if (
      errors.availableStartCode === undefined &&
      errors.availableEndCode === undefined &&
      user.availableStartCode > user.availableEndCode
    ) {
      errors.availableEndCode = '担当できる課題番号初め以上にしてください'
    }
  }

  return Object.keys(errors).length === 0
    ? { ok: true, user }
    : { ok: false, errors }
}
