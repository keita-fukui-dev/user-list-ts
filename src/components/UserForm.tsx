import { useState } from 'react'
import type {
  CommonFormValues,
  MentorFormValues,
  NewUser,
  Role,
  StudentFormValues,
  User,
  UserFormErrors,
  UserFormField,
  UserFormValues,
} from '../types/user'
import { ROLE_LABELS } from '../utils/roleLabels'
import { parseUserForm } from '../utils/userForm'

const INITIAL_VALUES: UserFormValues = {
  name: '',
  email: '',
  age: '',
  postCode: '',
  phone: '',
  hobbies: '',
  url: '',
  studyMinutes: '',
  taskCode: '',
  studyLangs: '',
  score: '',
  experienceMonths: '',
  useLangs: '',
  availableStartCode: '',
  availableEndCode: '',
}

// K で、その一覧に置ける項目を絞る（生徒の一覧にメンターの項目を書くとエラーになる）
type FieldConfig<K extends UserFormField> = {
  field: K
  label: string
  type?: 'email' | 'url'
  numeric?: boolean
  placeholder?: string
}

const LIST_PLACEHOLDER = 'カンマ区切り（例：Rails, PHP）'

const COMMON_FIELDS: FieldConfig<keyof CommonFormValues>[] = [
  { field: 'name', label: '名前' },
  { field: 'email', label: 'メールアドレス', type: 'email' },
  { field: 'age', label: '年齢', numeric: true },
  { field: 'postCode', label: '郵便番号', placeholder: '100-0001' },
  { field: 'phone', label: '電話番号' },
  { field: 'hobbies', label: '趣味', placeholder: 'カンマ区切り（例：旅行, 読書）' },
  { field: 'url', label: 'URL', type: 'url', placeholder: 'https://' },
]

const STUDENT_FIELDS: FieldConfig<keyof StudentFormValues>[] = [
  { field: 'studyMinutes', label: '勉強時間（分）', numeric: true },
  { field: 'taskCode', label: '課題番号', numeric: true },
  { field: 'studyLangs', label: '勉強中の言語', placeholder: LIST_PLACEHOLDER },
  { field: 'score', label: 'ハピネススコア', numeric: true },
]

const MENTOR_FIELDS: FieldConfig<keyof MentorFormValues>[] = [
  { field: 'experienceMonths', label: '実務経験月数', numeric: true },
  { field: 'useLangs', label: '現場で使っている言語', placeholder: LIST_PLACEHOLDER },
  { field: 'availableStartCode', label: '担当できる課題番号初め', numeric: true },
  { field: 'availableEndCode', label: '担当できる課題番号終わり', numeric: true },
]

const ROLES: Role[] = ['student', 'mentor']

type Props = {
  // メールアドレスの重複チェックに使う
  users: readonly User[]
  onAdd: (user: NewUser) => void
}

export const UserForm = ({ users, onAdd }: Props) => {
  const [role, setRole] = useState<Role>('student')
  const [values, setValues] = useState<UserFormValues>(INITIAL_VALUES)
  const [errors, setErrors] = useState<UserFormErrors>({})
  const [message, setMessage] = useState('')

  const fields = [
    ...COMMON_FIELDS,
    ...(role === 'student' ? STUDENT_FIELDS : MENTOR_FIELDS),
  ]

  const handleChange = (field: UserFormField, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }))
  }

  const handleRoleChange = (nextRole: Role) => {
    setRole(nextRole)
    // 前のロールのエラーは表示しない
    setErrors({})
  }

  const handleSubmit = () => {
    const result = parseUserForm(role, values, users)
    if (!result.ok) {
      setErrors(result.errors)
      setMessage('')
      return
    }
    onAdd(result.user)
    setValues(INITIAL_VALUES)
    setErrors({})
    setMessage(`${result.user.name}さんを登録しました`)
  }

  // ロールはそのままにして、入力・エラー・メッセージを消す
  const handleClear = () => {
    setValues(INITIAL_VALUES)
    setErrors({})
    setMessage('')
  }

  return (
    <section className="user-form">
      <h2>新規登録</h2>
      {/* noValidate：ブラウザの入力チェックを止め、エラー表示をこのフォームに揃える */}
      <form
        noValidate
        onSubmit={(event) => {
          event.preventDefault()
          handleSubmit()
        }}
      >
        <fieldset className="role-select">
          <legend>ロール</legend>
          {ROLES.map((value) => (
            <label key={value}>
              <input
                type="radio"
                name="role"
                value={value}
                checked={role === value}
                onChange={() => handleRoleChange(value)}
              />
              {ROLE_LABELS[value]}
            </label>
          ))}
        </fieldset>

        <div className="form-fields">
          {fields.map(({ field, label, type, numeric, placeholder }) => {
            const id = `user-form-${field}`
            const error = errors[field]
            return (
              <div key={field} className="form-field">
                <label htmlFor={id}>{label}</label>
                <input
                  id={id}
                  type={type ?? 'text'}
                  inputMode={numeric ? 'numeric' : undefined}
                  placeholder={placeholder}
                  value={values[field]}
                  aria-invalid={error !== undefined}
                  aria-describedby={error ? `${id}-error` : undefined}
                  onChange={(event) => handleChange(field, event.target.value)}
                />
                {error && (
                  <p id={`${id}-error`} className="form-error">
                    {error}
                  </p>
                )}
              </div>
            )
          })}
        </div>

        <div className="form-buttons">
          <button type="submit" className="submit-button">
            登録する
          </button>
          <button type="button" className="clear-button" onClick={handleClear}>
            入力をクリア
          </button>
        </div>
        {message && <p className="form-message">{message}</p>}
      </form>
    </section>
  )
}
