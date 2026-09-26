import { useState } from 'react';
import PasswordField from './PasswordField';
import { validateLogin } from '../utils/auth';

export default function LoginForm({ onLogin, onSwitchToSignup, loginError }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  function handleSubmit(event) {
    event.preventDefault();
    const validationErrors = validateLogin({ email, password });
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      onLogin({ email: email.trim(), password });
    }
  }

  return (
    <div className="card shadow-sm auth-card">
      <p className="eyebrow">Log in</p>
      <h1 className="auth-card__title">
        Welcome <em className="accent-em">back</em>
      </h1>
      <p className="text-muted mb-4">Use the email and password you signed up with.</p>

      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        <PasswordField
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
        />

        {loginError && <div className="alert alert-danger py-2">{loginError}</div>}

        <button type="submit" className="btn btn-primary w-100 mt-2">
          Log in
        </button>
      </form>

      <p className="text-center text-muted auth-switch mt-3 mb-0">
        Don&apos;t have an account?{' '}
        <button type="button" className="btn btn-link p-0" onClick={onSwitchToSignup}>
          Sign up
        </button>
      </p>
    </div>
  );
}
