// src/components/Button.tsx
export default function Button({ children, onClick }) {
    return (
      <button
        onClick={onClick}
        style={{
          padding:'12px 24px',
          border:'none',
          borderRadius:4,
          background:'#f4b400',
          color:'#000',
          cursor:'pointer'
        }}>
        {children}
      </button>
    )
  }
  