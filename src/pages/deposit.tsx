// src/pages/deposit.tsx
import { useEffect, useState } from 'react'

export default function DepositPage() {
  const [address, setAddress] = useState('')

  useEffect(() => {
    // Fetch your generated deposit address from the API
    fetch('/api/deposits', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
      .then(res => res.json())
      .then(data => setAddress(data.address))
      .catch(console.error)
  }, [])

  return (
    <div style={{ padding: 20 }}>
      <h1>Your Deposit Address</h1>
      {address
        ? <code>{address}</code>
        : <p>Loading address…</p>
      }
    </div>
  )
}
