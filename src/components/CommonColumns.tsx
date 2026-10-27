import type { User } from '../types/user'
import { ROLE_LABELS } from '../utils/roleLabels'
import { TextList } from './TextList'

export const CommonHeaders = () => (
  <>
    <th>名前</th>
    <th>ロール</th>
    <th>メールアドレス</th>
    <th>年齢</th>
    <th>郵便番号</th>
    <th>電話番号</th>
    <th>趣味</th>
    <th>URL</th>
  </>
)

type Props = {
  user: User
}

export const CommonCells = ({ user }: Props) => (
  <>
    <td>{user.name}</td>
    <td>{ROLE_LABELS[user.role]}</td>
    <td>{user.email}</td>
    <td>{user.age}</td>
    <td>{user.postCode}</td>
    <td>{user.phone}</td>
    <td>
      <TextList items={user.hobbies} />
    </td>
    <td>
      <a href={user.url} target="_blank" rel="noopener noreferrer">
        {user.url}
      </a>
    </td>
  </>
)
