import { useSelector } from 'react-redux'

export default function PostAuthor({ userId }: { userId: string }) {
  const author = useSelector((state: any) => state.users.find((user: any) => user.id === userId))
  return <span>by {author ? author.name : 'Unknown author'}</span>
}
