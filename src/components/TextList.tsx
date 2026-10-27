type Props = {
  items: string[]
}

// 配列を箇条書きで表示する。空のときは「なし」
export const TextList = ({ items }: Props) => {
  if (items.length === 0) {
    return <>なし</>
  }

  return (
    <ul className="text-list">
      {/* 同じ文字列が並ぶことがあるので、key に添字も含めて重複を防ぐ */}
      {items.map((item, index) => (
        <li key={`${index}-${item}`}>{item}</li>
      ))}
    </ul>
  )
}
