import { useState } from 'react'
import type { Mentor, MentorSortKey, SortState, User } from '../types/user'
import { sortUsers } from '../utils/sortUsers'
import { CommonCells, CommonHeaders } from './CommonColumns'
import { MentorCells, MentorHeaders } from './MentorColumns'
import { NoUsersMessage } from './NoUsersMessage'

type Props = {
  // 表示するメンター（filter 済み）
  mentors: Mentor[]
  // 対応可能な生徒を探すための全ユーザー
  users: readonly User[]
}

export const MentorTable = ({ mentors, users }: Props) => {
  // null は未ソート（データ順）。タブを切り替えるとこのコンポーネントが外れるので、null に戻る
  const [sort, setSort] = useState<SortState<MentorSortKey> | null>(null)

  // 月数ではなく日数で比べる（大小関係は同じで、切り捨ての誤差が出ない）
  const displayedMentors = sort
    ? sortUsers(mentors, sort.key, sort.order)
    : mentors

  // テーブルごと消すのではなくここで出し分けるので、0件になってもソート状態は残る
  if (displayedMentors.length === 0) {
    return <NoUsersMessage />
  }

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <CommonHeaders />
            <MentorHeaders sort={sort} onSortChange={setSort} />
          </tr>
        </thead>
        <tbody>
          {displayedMentors.map((mentor) => (
            <tr key={mentor.id}>
              <CommonCells user={mentor} />
              <MentorCells mentor={mentor} users={users} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
