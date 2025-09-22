import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { selectUserById } from '../redux/users'

export default function PostAuthor({ userId }: { userId: string }) {
  // const author = useSelector((state: any) => state.users.find((user: any) => user.id === userId))
  const author = useSelector((state: RootState) => selectUserById(state, userId))
  return <span>by {author ? author.name : 'Unknown author'}</span>
}
