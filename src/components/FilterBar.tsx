import type { UserFilter } from '../types/user'

type SelectProps = {
  id: string
  label: string
  value: string | null
  options: string[]
  onChange: (value: string | null) => void
}

// select では「指定なし」を '' で表し、state では null に変換して持つ
const FilterSelect = ({ id, label, value, options, onChange }: SelectProps) => (
  <div className="filter-select">
    <label htmlFor={id}>{label}</label>
    <select
      id={id}
      value={value ?? ''}
      onChange={(event) =>
        onChange(event.target.value === '' ? null : event.target.value)
      }
    >
      <option value="">指定なし</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
)

type Props = {
  filter: UserFilter
  hobbyOptions: string[]
  langOptions: string[]
  onChange: (filter: UserFilter) => void
}

export const FilterBar = ({
  filter,
  hobbyOptions,
  langOptions,
  onChange,
}: Props) => (
  <div className="filter-bar">
    <FilterSelect
      id="filter-hobby"
      label="趣味"
      value={filter.hobby}
      options={hobbyOptions}
      onChange={(hobby) => onChange({ ...filter, hobby })}
    />
    <FilterSelect
      id="filter-lang"
      label="言語"
      value={filter.lang}
      options={langOptions}
      onChange={(lang) => onChange({ ...filter, lang })}
    />
  </div>
)
