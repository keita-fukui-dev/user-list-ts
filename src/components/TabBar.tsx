import type { Tab } from '../types/user'

const TABS: { value: Tab; label: string }[] = [
  { value: 'all', label: '全員' },
  { value: 'student', label: '生徒のみ' },
  { value: 'mentor', label: 'メンターのみ' },
]

type Props = {
  currentTab: Tab
  onChange: (tab: Tab) => void
}

export const TabBar = ({ currentTab, onChange }: Props) => (
  <div className="tab-bar" role="tablist">
    {TABS.map(({ value, label }) => (
      <button
        key={value}
        type="button"
        role="tab"
        aria-selected={currentTab === value}
        onClick={() => onChange(value)}
      >
        {label}
      </button>
    ))}
  </div>
)
