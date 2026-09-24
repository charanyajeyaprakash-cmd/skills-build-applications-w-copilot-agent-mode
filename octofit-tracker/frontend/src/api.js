const codespaceName = import.meta.env.VITE_CODESPACE_NAME || import.meta.env.CODESPACE_NAME || ''

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

async function getCollection(resource) {
  const response = await fetch(`${API_BASE_URL}/api/${resource}`)

  if (!response.ok) {
    throw new Error(`Unable to load ${resource}: ${response.status}`)
  }

  return response.json()
}

export function getUsers() {
  return getCollection('users')
}

export function getActivities() {
  return getCollection('activities')
}