import { useLayoutEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { formatDistanceToNow, parseISO } from 'date-fns'
import { notificationType, selectAllNotifications, allNotificationsRead } from '../redux/notifications'
import { userType, selectAllUsers } from '../redux/users'

export default function NotificationsList() {
  const dispatch = useDispatch()

  const notifications = useSelector(selectAllNotifications)
  const users = useSelector(selectAllUsers)

  useLayoutEffect(() => {
    dispatch(allNotificationsRead())
  })

  const renderedNotifications = notifications.map((notification: notificationType) => {
    const date = parseISO(notification.date)
    const timeAgo = formatDistanceToNow(date, { addSuffix: true })
    const user = users.find((user: userType) => user.id === notification.user) || {
      name: 'Unknown User',
    }

    return (
      <li key={notification.id} className={notification.isNew ? 'notification new' : 'notification'}>
        <div>
          <b>{user.name}</b>: {notification.message}
        </div>
        <div title={notification.date}>
          <span>
            &nbsp; <i>{timeAgo}</i>
          </span>
        </div>
      </li>
    )
  })

  return (
    <section className="notifications-list">
      <h2>Notifications</h2>
      <ul>{renderedNotifications}</ul>
    </section>
  )
}
