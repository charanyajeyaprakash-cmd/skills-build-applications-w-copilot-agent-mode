import { useEffect, useState } from 'react'
import { getActivities } from '../api'

const activitiesApiEndpoint = '-8000.app.github.dev/api/activities'

function Activities() {
  const [activities, setActivities] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getActivities()
      .then(setActivities)
      .catch(() => setError('Unable to load activities.'))
      .finally(() => setIsLoading(false))
  }, [])

  if (isLoading) {
    return <p className="text-secondary">Loading activities...</p>
  }

  if (error) {
    return <p className="text-danger">{error}</p>
  }

  return (
    <section aria-labelledby="activities-heading" data-api-endpoint={activitiesApiEndpoint}>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h2 id="activities-heading" className="h4 mb-0">
          Recent activities
        </h2>
        <span className="badge text-bg-light">{activities.length}</span>
      </div>
      {activities.length === 0 ? (
        <p className="text-secondary">No activities recorded yet.</p>
      ) : (
        <div className="list-group">
          {activities.map((activity) => (
            <article className="list-group-item" key={activity._id}>
              <div className="d-flex justify-content-between gap-3">
                <strong className="text-capitalize">{activity.type}</strong>
                <span>{activity.points ?? 0} points</span>
              </div>
              <small className="text-secondary">
                {activity.durationMinutes ?? 0} minutes
                {activity.distanceKm ? ` | ${activity.distanceKm} km` : ''}
              </small>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default Activities