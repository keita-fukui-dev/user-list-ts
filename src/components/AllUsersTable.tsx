import type { User } from '../types/user'
import { CommonCells, CommonHeaders } from './CommonColumns'
import { EmptyCells } from './EmptyCells'
import { MENTOR_COLUMN_COUNT, MentorCells, MentorHeaders } from './MentorColumns'
import { NoUsersMessage } from './NoUsersMessage'
import {
  STUDENT_COLUMN_COUNT,
  StudentCells,
  StudentHeaders,
} from './StudentColumns'

type Props = {
  // 表示する行（filter 済み）
  displayedUsers: readonly User[]
  // 対応可能な人を探すための全ユーザー
  users: readonly User[]
}

export const AllUsersTable = ({ displayedUsers, users }: Props) => {
  if (displayedUsers.length === 0) {
    return <NoUsersMessage />
  }

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <CommonHeaders />
            <StudentHeaders />
            <MentorHeaders />
          </tr>
        </thead>
        <tbody>
          {displayedUsers.map((user) => (
            <tr key={user.id}>
              <CommonCells user={user} />
              {/* role で分岐すると、各ブロックの中で user が Student / Mentor に絞られる */}
              {user.role === 'student' ? (
                <>
                  <StudentCells student={user} users={users} />
                  <EmptyCells count={MENTOR_COLUMN_COUNT} />
                </>
              ) : (
                <>
                  <EmptyCells count={STUDENT_COLUMN_COUNT} />
                  <MentorCells mentor={user} users={users} />
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
