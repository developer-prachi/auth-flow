import { useEffect, useState } from 'react';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import { saveUser, findUserByEmail, saveSession, getSession, clearSession } from './utils/auth';

// view: 'signup' | 'login' | 'dashboard'
export default function App() {
  const [view, setView] = useState('signup');
  const [currentUser, setCurrentUser] = useState(null);
  const [loginError, setLoginError] = useState('');

  // On first load, check whether someone's already "logged in" from a
  // previous visit (their email is saved in localStorage).
  useEffect(() => {
    const savedEmail = getSession();
    if (savedEmail) {
      const user = findUserByEmail(savedEmail);
      if (user) {
        setCurrentUser(user);
        setView('dashboard');
      }
    }
  }, []);

  function handleSignup(newUser) {
    saveUser(newUser);
    saveSession(newUser.email);
    setCurrentUser(newUser);
    setView('dashboard');
  }

  function handleLogin({ email, password }) {
    const user = findUserByEmail(email);
    if (!user || user.password !== password) {
      setLoginError('Invalid email or password.');
      return;
    }
    setLoginError('');
    saveSession(user.email);
    setCurrentUser(user);
    setView('dashboard');
  }

  function handleLogout() {
    clearSession();
    setCurrentUser(null);
    setLoginError('');
    setView('login');
  }

  return (
    <div className="app-shell d-flex align-items-center justify-content-center p-3">
      {view === 'signup' && (
        <SignupForm onSignup={handleSignup} onSwitchToLogin={() => setView('login')} />
      )}

      {view === 'login' && (
        <LoginForm
          onLogin={handleLogin}
          onSwitchToSignup={() => setView('signup')}
          loginError={loginError}
        />
      )}

      {view === 'dashboard' && currentUser && (
        <Dashboard user={currentUser} onLogout={handleLogout} />
      )}
    </div>
  );
}
