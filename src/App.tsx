import { useState } from 'react'
import { AllUsersTable } from './components/AllUsersTable'
import { FilterBar } from './components/FilterBar'
import { MentorTable } from './components/MentorTable'
import { StudentTable } from './components/StudentTable'
import { TabBar } from './components/TabBar'
import { UserForm } from './components/UserForm'
import { USER_LIST } from './data/users'
import type { NewUser, Tab, User, UserFilter } from './types/user'
import {
  filterUsers,
  getHobbyOptions,
  getLangOptions,
} from './utils/filterUsers'
import { getNextId } from './utils/userForm'
import { isMentor, isStudent } from './utils/userGuards'
import './App.css'

const INITIAL_FILTER: UserFilter = { hobby: null, lang: null }

function App() {
  // 新規登録したユーザーも含む一覧。state にだけ持つので、リロードすると USER_LIST に戻る
  const [users, setUsers] = useState<User[]>(USER_LIST)
  const [tab, setTab] = useState<Tab>('all')
  // タブの外に置くので、タブを切り替えても filter は維持される
  const [filter, setFilter] = useState<UserFilter>(INITIAL_FILTER)

  const handleAdd = (newUser: NewUser) => {
    setUsers((prev) => [...prev, { ...newUser, id: getNextId(prev) }])
  }

  // 処理の順序：タブ → filter → ソート（ソートは各テーブルの中で行う）
  return (
    <main className="app">
      <h1>ユーザー一覧</h1>
      <UserForm users={users} onAdd={handleAdd} />
      <FilterBar
        filter={filter}
        hobbyOptions={getHobbyOptions(users)}
        langOptions={getLangOptions(users)}
        onChange={setFilter}
      />
      <TabBar currentTab={tab} onChange={setTab} />
      {tab === 'all' && (
        <AllUsersTable displayedUsers={filterUsers(users, filter)} users={users} />
      )}
      {tab === 'student' && (
        <StudentTable
          students={filterUsers(users.filter(isStudent), filter)}
          users={users}
        />
      )}
      {tab === 'mentor' && (
        <MentorTable
          mentors={filterUsers(users.filter(isMentor), filter)}
          users={users}
        />
      )}
    </main>
  )
}

export default App
