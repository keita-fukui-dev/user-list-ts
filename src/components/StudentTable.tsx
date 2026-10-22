import { useState } from 'react'
import type { SortState, Student, StudentSortKey, User } from '../types/user'
import { sortUsers } from '../utils/sortUsers'
import { CommonCells, CommonHeaders } from './CommonColumns'
import { NoUsersMessage } from './NoUsersMessage'
import { StudentCells, StudentHeaders } from './StudentColumns'

type Props = {
  // 表示する生徒（filter 済み）
  students: Student[]
  // 対応可能なメンターを探すための全ユーザー
  users: readonly User[]
}

export const StudentTable = ({ students, users }: Props) => {
  // null は未ソート（データ順）。タブを切り替えるとこのコンポーネントが外れるので、null に戻る
  const [sort, setSort] = useState<SortState<StudentSortKey> | null>(null)

  const displayedStudents = sort
    ? sortUsers(students, sort.key, sort.order)
    : students

  // テーブルごと消すのではなくここで出し分けるので、0件になってもソート状態は残る
  if (displayedStudents.length === 0) {
    return <NoUsersMessage />
  }

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <CommonHeaders />
            <StudentHeaders sort={sort} onSortChange={setSort} />
          </tr>
        </thead>
        <tbody>
          {displayedStudents.map((student) => (
            <tr key={student.id}>
              <CommonCells user={student} />
              <StudentCells student={student} users={users} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
