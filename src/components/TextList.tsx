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
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}
