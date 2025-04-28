// src/components/CountryFlagSelect.tsx
import { useState } from 'react'

const options = [
  { country: 'United States', code: '+1', flag: '🇺🇸' },
  { country: 'United Kingdom', code: '+44', flag: '🇬🇧' },
]

export default function CountryFlagSelect() {
  const [idx, setIdx] = useState(0)
  const opt = options[idx]
  return (
    <div
      onClick={() => setIdx((idx + 1) % options.length)}
      className="w-full flex items-center justify-between px-4 py-3 border rounded-lg cursor-pointer"
    >
      <span className="text-2xl">{opt.flag}</span>
      <span className="flex-1 mx-2 text-gray-700">{opt.country}</span>
      <span className="text-gray-500">{opt.code}</span>
    </div>
  )
}
