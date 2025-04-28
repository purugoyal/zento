// src/pages/account.tsx
import NavBar from "../components/Navbar";

export default function AccountPage() {
  return (
    <>
      <Navbar />
      <main style={{
        maxWidth: 640,
        margin: "2rem auto",
        padding: "0 1rem",
      }}>
        <h1 style={{
          fontSize: "2rem",
          fontWeight: 700,
          marginBottom: "1.5rem",
          color: "#111827",
        }}>
          My Account
        </h1>

        <form style={{
          display: "grid",
          gap: "1rem",
        }}>
          {/* Example field */}
          <div>
            <label style={{
              display: "block",
              marginBottom: "0.25rem",
              fontWeight: 500,
              color: "#374151",
            }}>
              Full Name
            </label>
            <input
              type="text"
              placeholder="Jane Doe"
              style={{
                width: "100%",
                padding: "0.5rem",
                border: "1px solid #d1d5db",
                borderRadius: 4,
              }}
            />
          </div>

          <div>
            <label style={{
              display: "block",
              marginBottom: "0.25rem",
              fontWeight: 500,
              color: "#374151",
            }}>
              Email Address
            </label>
            <input
              type="email"
              placeholder="jane@example.com"
              style={{
                width: "100%",
                padding: "0.5rem",
                border: "1px solid #d1d5db",
                borderRadius: 4,
              }}
            />
          </div>

          {/* Add more profile fields here */}
          <button type="submit" style={{
            marginTop: "1rem",
            padding: "0.75rem 1.5rem",
            backgroundColor: "#00c805",
            color: "#fff",
            border: "none",
            borderRadius: 4,
            fontWeight: 600,
            cursor: "pointer",
          }}>
            Save Changes
          </button>
        </form>
      </main>
    </>
  );
}
