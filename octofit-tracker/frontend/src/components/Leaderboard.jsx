import { useEffect, useState } from 'react'
import { getLeaderboard } from '../api'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getLeaderboard()
      .then(setEntries)
      .catch(() => setError('Unable to load the leaderboard.'))
      .finally(() => setIsLoading(false))
  }, [])

  if (isLoading) {
    return <p className="text-secondary">Loading leaderboard...</p>
  }

  if (error) {
    return <p className="text-danger">{error}</p>
  }

  const sortedEntries = [...entries].sort((first, second) => {
    if (first.rank && second.rank) return first.rank - second.rank
    return (second.points ?? 0) - (first.points ?? 0)
  })

  return (
    <section aria-labelledby="leaderboard-heading">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h2 id="leaderboard-heading" className="h4 mb-0">
          Leaderboard
        </h2>
        <span className="badge text-bg-light">{sortedEntries.length}</span>
      </div>
      {sortedEntries.length === 0 ? (
        <p className="text-secondary">No leaderboard entries yet.</p>
      ) : (
        <div className="list-group">
          {sortedEntries.map((entry, index) => (
            <article className="list-group-item" key={entry._id}>
              <div className="d-flex justify-content-between gap-3">
                <strong>#{entry.rank ?? index + 1}</strong>
                <span>{entry.points ?? 0} points</span>
              </div>
              <small className="text-secondary">
                {entry.period ?? 'monthly'} | User {entry.userId}
              </small>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default Leaderboard