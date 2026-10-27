import type { SortState, Student, StudentSortKey, User } from '../types/user'
import { getAvailableMentors } from '../utils/matching'
import { minutesToHours } from '../utils/studyTime'
import { SortButtons } from './SortButtons'
import { TextList } from './TextList'

// 全員タブで空セルを出すときに使う。見出し・セルの数を変えたらここも合わせる
export const STUDENT_COLUMN_COUNT = 5

type HeadersProps = {
  // 渡したときだけソートボタンを表示する（全員タブでは渡さない）
  sort?: SortState<StudentSortKey> | null
  onSortChange?: (sort: SortState<StudentSortKey>) => void
}

export const StudentHeaders = ({ sort = null, onSortChange }: HeadersProps) => (
  <>
    <th>
      勉強時間
      {onSortChange && (
        <SortButtons
          label="勉強時間"
          sortKey="studyMinutes"
          sort={sort}
          onChange={onSortChange}
        />
      )}
    </th>
    <th>課題番号</th>
    <th>勉強中の言語</th>
    <th>
      ハピネススコア
      {onSortChange && (
        <SortButtons
          label="ハピネススコア"
          sortKey="score"
          sort={sort}
          onChange={onSortChange}
        />
      )}
    </th>
    <th>対応可能なメンター</th>
  </>
)

type CellsProps = {
  student: Student
  users: readonly User[]
}

export const StudentCells = ({ student, users }: CellsProps) => (
  <>
    <td>{minutesToHours(student.studyMinutes)}時間</td>
    <td>{student.taskCode}</td>
    <td>
      <TextList items={student.studyLangs} />
    </td>
    <td>{student.score}</td>
    <td>
      <TextList
        items={getAvailableMentors(student, users).map((mentor) => mentor.name)}
      />
    </td>
  </>
)
