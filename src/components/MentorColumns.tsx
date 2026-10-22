import type { Mentor, MentorSortKey, SortState, User } from '../types/user'
import { daysToMonths } from '../utils/experience'
import { getAvailableStudents } from '../utils/matching'
import { SortButtons } from './SortButtons'
import { TextList } from './TextList'

// 全員タブで空セルを出すときに使う。見出し・セルの数を変えたらここも合わせる
export const MENTOR_COLUMN_COUNT = 5

type HeadersProps = {
  // 渡したときだけソートボタンを表示する（全員タブでは渡さない）
  sort?: SortState<MentorSortKey> | null
  onSortChange?: (sort: SortState<MentorSortKey>) => void
}

export const MentorHeaders = ({ sort = null, onSortChange }: HeadersProps) => (
  <>
    <th>
      実務経験月数
      {onSortChange && (
        <SortButtons
          label="実務経験月数"
          sortKey="experienceDays"
          sort={sort}
          onChange={onSortChange}
        />
      )}
    </th>
    <th>現場で使っている言語</th>
    <th>担当できる課題番号初め</th>
    <th>担当できる課題番号終わり</th>
    <th>対応可能な生徒</th>
  </>
)

type CellsProps = {
  mentor: Mentor
  users: readonly User[]
}

export const MentorCells = ({ mentor, users }: CellsProps) => (
  <>
    <td>{daysToMonths(mentor.experienceDays)}ヶ月</td>
    <td>
      <TextList items={mentor.useLangs} />
    </td>
    <td>{mentor.availableStartCode}</td>
    <td>{mentor.availableEndCode}</td>
    <td>
      <TextList
        items={getAvailableStudents(mentor, users).map(
          (student) => student.name,
        )}
      />
    </td>
  </>
)
