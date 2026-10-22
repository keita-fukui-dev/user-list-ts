type Props = {
  count: number
}

// 全員タブで、そのロールにない列を空欄で埋める
export const EmptyCells = ({ count }: Props) => (
  <>
    {Array.from({ length: count }, (_, index) => (
      <td key={index} />
    ))}
  </>
)
