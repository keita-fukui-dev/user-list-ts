import type { Mentor, Student, User } from '../types/user'

// filter に渡すと、戻り値の型が Student[] / Mentor[] に絞られる
export const isStudent = (user: User): user is Student =>
  user.role === 'student'

export const isMentor = (user: User): user is Mentor => user.role === 'mentor'
