// src/pages/auth.tsx
import { useState, FormEvent } from 'react'

export default function AuthPage() {
  const [mode, setMode] = useState<'signup' | 'login'>('signup')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // TODO: hook up signup/login API
    alert(`${mode === 'signup' ? 'Signing up' : 'Logging in'}...`)
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#fff',
        padding: '1rem'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 400,
          padding: '2rem',
          border: '1px solid #e5e7eb',
          borderRadius: 8,
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
        }}
      >
        {/* Toggle */}
        <div style={{ display: 'flex', marginBottom: '1.5rem' }}>
          <button
            onClick={() => setMode('signup')}
            style={{
              flex: 1,
              padding: '0.75rem',
              border: 'none',
              borderBottom: mode === 'signup' ? '3px solid #3ade4a' : '3px solid transparent',
              background: 'none',
              fontSize: '1rem',
              fontWeight: mode === 'signup' ? 600 : 400,
              color: mode === 'signup' ? '#111' : '#666',
              cursor: 'pointer'
            }}
          >
            Sign Up
          </button>
          <button
            onClick={() => setMode('login')}
            style={{
              flex: 1,
              padding: '0.75rem',
              border: 'none',
              borderBottom: mode === 'login' ? '3px solid #3ade4a' : '3px solid transparent',
              background: 'none',
              fontSize: '1rem',
              fontWeight: mode === 'login' ? 600 : 400,
              color: mode === 'login' ? '#111' : '#666',
              cursor: 'pointer'
            }}
          >
            Log In
          </button>
        </div>

        {/* Heading */}
        <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', color: '#111' }}>
          {mode === 'signup' ? 'Create your account' : 'Welcome back'}
        </h2>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          <input
            type="email"
            placeholder="Email"
            required
            style={{
              padding: '0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: 6,
              fontSize: '1rem'
            }}
          />
          <input
            type="password"
            placeholder="Password"
            required
            style={{
              padding: '0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: 6,
              fontSize: '1rem'
            }}
          />
          {mode === 'signup' && (
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input type="checkbox" />
              <span style={{ fontSize: '0.9rem', color: '#555' }}>Enable two‑factor auth</span>
            </label>
          )}

          <button
            type="submit"
            style={{
              marginTop: '0.5rem',
              background: '#3ade4a',
              color: '#000',
              padding: '0.75rem',
              border: 'none',
              borderRadius: 6,
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            {mode === 'signup' ? 'Create account' : 'Log in'}
          </button>
        </form>

        {/* Footer links */}
        <div
          style={{
            marginTop: '1rem',
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '0.9rem'
          }}
        >
          {mode === 'login' && (
            <a href="#" style={{ color: '#3ade4a', textDecoration: 'none' }}>
              Forgot password?
            </a>
          )}
          <a href="#" style={{ color: '#3ade4a', textDecoration: 'none' }}>
            Help
          </a>
        </div>
      </div>
    </div>
  )
}
