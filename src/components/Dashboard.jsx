export default function Dashboard({ user, onLogout }) {
  return (
    <div className="card shadow-sm p-4 text-center" style={{ maxWidth: '420px', width: '100%' }}>
      <h1 className="h4 mb-2">Welcome, {user.name}!</h1>
      <p className="text-muted mb-4">You're logged in as {user.email}.</p>
      <button className="btn btn-outline-danger w-100" onClick={onLogout}>
        Log out
      </button>
    </div>
  );
}
