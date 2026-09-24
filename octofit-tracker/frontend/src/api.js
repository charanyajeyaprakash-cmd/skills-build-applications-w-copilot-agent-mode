const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api'

async function getCollection(resource) {
  const response = await fetch(`${API_BASE_URL}/${resource}/`)

  if (!response.ok) {
    throw new Error(`Unable to load ${resource}: ${response.status}`)
  }

  const payload = await response.json()

  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload.data)) return payload.data
  if (Array.isArray(payload.results)) return payload.results
  if (Array.isArray(payload.items)) return payload.items
  if (Array.isArray(payload.data?.items)) return payload.data.items

  return []
}

export function getUsers() {
  return getCollection('users')
}

export function getActivities() {
  return getCollection('activities')
}

export function getLeaderboard() {
  return getCollection('leaderboard')
}

export function getTeams() {
  return getCollection('teams')
}

export function getWorkouts() {
  return getCollection('workouts')
}