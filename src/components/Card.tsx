// src/components/Card.tsx
export default function Card({ children, style }) {
    return (
      <div style={{
        padding:20, border:'1px solid #ddd',
        borderRadius:8, background:'#fff', ...(style||{})
      }}>
        {children}
      </div>
    )
  }

  