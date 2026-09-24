import { useEffect, useState } from 'react'
import { getWorkouts } from '../api'

const workoutsApiEndpoint = '-8000.app.github.dev/api/workouts'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getWorkouts()
      .then(setWorkouts)
      .catch(() => setError('Unable to load workouts.'))
      .finally(() => setIsLoading(false))
  }, [])

  if (isLoading) {
    return <p className="text-secondary">Loading workouts...</p>
  }

  if (error) {
    return <p className="text-danger">{error}</p>
  }

  return (
    <section
      className="container py-4"
      aria-labelledby="workouts-heading"
      data-api-endpoint={workoutsApiEndpoint}
    >
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h1 id="workouts-heading" className="h3 mb-0">
          Workouts
        </h1>
        <span className="badge text-bg-light">{workouts.length}</span>
      </div>
      {workouts.length === 0 ? (
        <p className="text-secondary">No workouts available yet.</p>
      ) : (
        <div className="row g-3">
          {workouts.map((workout) => (
            <div className="col-12 col-md-6" key={workout._id}>
              <article className="card h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between gap-3">
                    <h2 className="h5 card-title">{workout.title}</h2>
                    <span className="badge text-bg-secondary text-capitalize">
                      {workout.difficulty}
                    </span>
                  </div>
                  {workout.description && (
                    <p className="card-text text-secondary">{workout.description}</p>
                  )}
                  <ul className="mb-3">
                    {workout.exercises?.map((exercise) => (
                      <li key={exercise.name}>
                        {exercise.name}
                        {exercise.durationMinutes
                          ? ` - ${exercise.durationMinutes} minutes`
                          : ''}
                        {exercise.repetitions ? ` - ${exercise.repetitions} reps` : ''}
                      </li>
                    ))}
                  </ul>
                  {workout.tags?.length > 0 && (
                    <small className="text-secondary">{workout.tags.join(' | ')}</small>
                  )}
                </div>
              </article>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default Workouts