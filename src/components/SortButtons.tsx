import type { SortKey, SortOrder, SortState } from '../types/user'

type Props<K extends SortKey> = {
  label: string
  sortKey: K
  sort: SortState<K> | null
  onChange: (sort: SortState<K>) => void
}

const ORDER_BUTTONS: { order: SortOrder; mark: string; label: string }[] = [
  { order: 'asc', mark: '▲', label: '昇順' },
  { order: 'desc', mark: '▼', label: '降順' },
]

// K を受け取るので、生徒テーブルでは StudentSortKey、メンターテーブルでは MentorSortKey だけを扱う
export const SortButtons = <K extends SortKey>({
  label,
  sortKey,
  sort,
  onChange,
}: Props<K>) => (
  <span className="sort-buttons">
    {ORDER_BUTTONS.map(({ order, mark, label: orderLabel }) => (
      <button
        key={order}
        type="button"
        aria-label={`${label}を${orderLabel}で並べ替え`}
        aria-pressed={sort?.key === sortKey && sort.order === order}
        onClick={() => onChange({ key: sortKey, order })}
      >
        {mark}
      </button>
    ))}
  </span>
)
