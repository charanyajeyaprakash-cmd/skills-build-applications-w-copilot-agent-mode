import { useEffect, useState } from 'react'
import { getTeams } from '../api'

const teamsApiEndpoint = '-8000.app.github.dev/api/teams'

function Teams() {
  const [teams, setTeams] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getTeams()
      .then(setTeams)
      .catch(() => setError('Unable to load teams.'))
      .finally(() => setIsLoading(false))
  }, [])

  if (isLoading) {
    return <p className="text-secondary">Loading teams...</p>
  }

  if (error) {
    return <p className="text-danger">{error}</p>
  }

  return (
    <section aria-labelledby="teams-heading" data-api-endpoint={teamsApiEndpoint}>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h2 id="teams-heading" className="h4 mb-0">
          Teams
        </h2>
        <span className="badge text-bg-light">{teams.length}</span>
      </div>
      {teams.length === 0 ? (
        <p className="text-secondary">No teams created yet.</p>
      ) : (
        <div className="list-group">
          {teams.map((team) => (
            <article className="list-group-item" key={team._id}>
              <div className="d-flex justify-content-between gap-3">
                <strong>{team.name}</strong>
                <span>{team.points ?? 0} points</span>
              </div>
              <small className="text-secondary">
                {team.memberIds?.length ?? 0} members
              </small>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default Teams