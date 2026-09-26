export default function Dashboard({ user, onLogout }) {
  return (
    <div className="card shadow-sm auth-card text-center">
      <div className="avatar" aria-hidden="true">{user.name.trim().charAt(0).toUpperCase()}</div>
      <p className="eyebrow justify-content-center">Signed in</p>
      <h1 className="auth-card__title">
        Welcome, <em className="accent-em">{user.name}</em>!
      </h1>
      <p className="text-muted mb-4">You&apos;re logged in as {user.email}.</p>
      <button className="btn btn-outline-danger w-100" onClick={onLogout}>
        Log out
      </button>
    </div>
  );
}
