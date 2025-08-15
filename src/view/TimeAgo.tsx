import { parseISO, formatDistanceToNow } from 'date-fns'

export default function TimeAgo({ timestamp }: { timestamp: string }) {
  let timeAgo = ''
  if (timestamp) {
    const date = parseISO(timestamp)
    timeAgo = formatDistanceToNow(date, { addSuffix: true })
  }
  return (
    <span title={timestamp}>
      {' '}
      &nbsp; <i>{timeAgo}</i>
    </span>
  )
}
