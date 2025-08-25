import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../redux/store'
import { notificationType, selectAllNotifications, fetchNotifications } from '../redux/notifications'

export const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>()

  const notifications = useSelector(selectAllNotifications)
  const numUnreadNotifications = notifications.filter((n: notificationType) => !n.read).length

  let notificationBadge
  if (numUnreadNotifications > 0) {
    notificationBadge = <span className="badge">{numUnreadNotifications}</span>
  }

  function fetchNewNotifications() {
    dispatch(fetchNotifications())
  }

  return (
    <nav>
      <section>
        <h1>Essentials Example</h1>

        <div className="navContent">
          <div className="navLinks">
            <Link to="/">Posts</Link>
            <Link to="/users">Users</Link>
            <Link to="/notifications">Notifications {notificationBadge}</Link>
          </div>
          <button className="button" onClick={fetchNewNotifications}>
            Refresh Notifications
          </button>
        </div>
      </section>
    </nav>
  )
}
