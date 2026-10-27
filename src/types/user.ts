// 全ユーザー共通の項目
export type BaseUser = {
  id: number
  name: string
  email: string
  age: number
  postCode: string
  phone: string
  hobbies: string[]
  url: string
}

// role をタグにした判別可能な Union 型
export type Student = BaseUser & {
  role: 'student'
  studyMinutes: number
  taskCode: number
  studyLangs: string[]
  score: number
}

export type Mentor = BaseUser & {
  role: 'mentor'
  experienceDays: number
  useLangs: string[]
  availableStartCode: number
  availableEndCode: number
}

export type User = Student | Mentor

// 'student' | 'mentor'（User から取り出すので、ロールを増やしたときに書き忘れない）
export type Role = User['role']

// タブ：全員 + 各ロール
export type Tab = 'all' | Role

// ソートのキー（タブごとに使えるキーを分ける）
export type StudentSortKey = 'studyMinutes' | 'score'
export type MentorSortKey = 'experienceDays'
export type SortKey = StudentSortKey | MentorSortKey

// ソートの順序
export type SortOrder = 'asc' | 'desc'

// ソート状態。K でキーを絞る（生徒テーブルなら StudentSortKey だけ受け付ける）
export type SortState<K extends SortKey> = {
  key: K
  order: SortOrder
}

// 登録前のユーザー（id は登録時に採番する）
// Omit<User, 'id'> と書くと Union の区別が消えるので、Student と Mentor それぞれに Omit をかける
export type NewStudent = Omit<Student, 'id'>
export type NewMentor = Omit<Mentor, 'id'>
export type NewUser = NewStudent | NewMentor

// フォームの入力値。input の value は文字列なので、数値や配列もすべて string で持つ
export type CommonFormValues = {
  name: string
  email: string
  age: string
  postCode: string
  phone: string
  hobbies: string
  url: string
}

export type StudentFormValues = {
  studyMinutes: string
  taskCode: string
  studyLangs: string
  score: string
}

// 入力は月数。保存するときに experienceDays（日数）へ変換する
export type MentorFormValues = {
  experienceMonths: string
  useLangs: string
  availableStartCode: string
  availableEndCode: string
}

// ロールを切り替えても入力が消えないよう、両ロールの項目をまとめて持つ
export type UserFormValues = CommonFormValues & StudentFormValues & MentorFormValues
export type UserFormField = keyof UserFormValues

// 項目ごとのエラーメッセージ。エラーがない項目は持たない
export type UserFormErrors = Partial<Record<UserFormField, string>>

// filter の条件。null は「指定なし」
export type UserFilter = {
  hobby: string | null
  lang: string | null
}
