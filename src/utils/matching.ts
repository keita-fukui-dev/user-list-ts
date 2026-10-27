import type { Mentor, Student, User } from '../types/user'
import { isMentor, isStudent } from './userGuards'

// 両端を含む。生徒側・メンター側の両方でこの判定を使い、結果が食い違わないようにする
const isTaskCodeInRange = (taskCode: number, mentor: Mentor): boolean =>
  mentor.availableStartCode <= taskCode && taskCode <= mentor.availableEndCode

export const getAvailableMentors = (
  student: Student,
  users: readonly User[],
): Mentor[] =>
  users
    .filter(isMentor)
    .filter((mentor) => isTaskCodeInRange(student.taskCode, mentor))

export const getAvailableStudents = (
  mentor: Mentor,
  users: readonly User[],
): Student[] =>
  users
    .filter(isStudent)
    .filter((student) => isTaskCodeInRange(student.taskCode, mentor))
