import { useEffect, useState } from 'react'
import { getUsers } from '../api'

function Users() {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch(() => setError('Unable to load users.'))
      .finally(() => setIsLoading(false))
  }, [])

  if (isLoading) {
    return <p className="text-secondary">Loading users...</p>
  }

  if (error) {
    return <p className="text-danger">{error}</p>
  }

  return (
    <section aria-labelledby="users-heading">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h2 id="users-heading" className="h4 mb-0">
          Members
        </h2>
        <span className="badge text-bg-light">{users.length}</span>
      </div>
      {users.length === 0 ? (
        <p className="text-secondary">No users registered yet.</p>
      ) : (
        <div className="list-group">
          {users.map((user) => (
            <article className="list-group-item" key={user._id}>
              <div className="d-flex justify-content-between gap-3">
                <strong>{user.username}</strong>
                <span>{user.points ?? 0} points</span>
              </div>
              <small className="text-secondary">{user.email}</small>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default Users