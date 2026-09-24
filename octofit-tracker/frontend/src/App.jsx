import { useEffect, useState } from 'react'
import { Navigate, NavLink, Route, Routes } from 'react-router-dom'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import { getActivities, getUsers } from './api'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [apiStatus, setApiStatus] = useState('Checking API...')

  useEffect(() => {
    Promise.all([getUsers(), getActivities()])
      .then(() => setApiStatus('API connected'))
      .catch(() => setApiStatus('API unavailable'))
  }, [])

  return (
    <>
      <nav className="navbar navbar-expand bg-dark px-3" aria-label="Primary navigation">
        <div className="navbar-nav gap-3">
          <NavLink className="nav-link text-white" to="/">
            Dashboard
          </NavLink>
          <NavLink className="nav-link text-white" to="/workouts">
            Workouts
          </NavLink>
        </div>
      </nav>
      <Routes>
        <Route
          path="/"
          element={
            <section id="center">
              <div className="hero">
                <img className="base" src={heroImg} width="170" height="179" alt="" />
                <img className="framework" src={reactLogo} alt="React logo" />
                <img className="vite" src={viteLogo} alt="Vite logo" />
              </div>
              <div>
                <h1>Get started</h1>
                <p>{apiStatus}</p>
                <p>
                  Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
                </p>
              </div>
              <button
                type="button"
                className="counter"
                onClick={() => setCount((count) => count + 1)}
              >
                Count is {count}
              </button>
              <Activities />
              <Leaderboard />
              <Teams />
              <Users />
            </section>
          }
        />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
