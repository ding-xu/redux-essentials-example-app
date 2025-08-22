import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { userType, selectAllUsers } from '../redux/users'

export default function UserList() {
  const users = useSelector(selectAllUsers)

  const renderedUsers = users.map((user: userType) => (
    <li key={user.id}>
      <Link to={`/users/${user.id}`}>{user.name}</Link>
    </li>
  ))

  return (
    <section className="user-list">
      <h2>Users</h2>
      <ul>{renderedUsers}</ul>
    </section>
  )
}
