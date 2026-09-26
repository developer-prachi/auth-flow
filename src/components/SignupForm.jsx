import { useState } from 'react';
import PasswordField from './PasswordField';
import { validateSignup } from '../utils/auth';

export default function SignupForm({ onSignup, onSwitchToLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  function handleSubmit(event) {
    event.preventDefault();
    const validationErrors = validateSignup({ name, email, password, confirmPassword });
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      onSignup({ name: name.trim(), email: email.trim(), password });
    }
  }

  return (
    <div className="card shadow-sm p-4" style={{ maxWidth: '420px', width: '100%' }}>
      <h1 className="h4 mb-1">Create an account</h1>
      <p className="text-muted mb-4">No real backend - this just demonstrates the form and its validation.</p>

      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label className="form-label">Full name</label>
          <input
            type="text"
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>

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
          showStrength
        />

        <PasswordField
          label="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={errors.confirmPassword}
        />

        <button type="submit" className="btn btn-primary w-100 mt-2">
          Sign up
        </button>
      </form>

      <p className="text-center text-muted mt-3 mb-0">
        Already have an account?{' '}
        <button type="button" className="btn btn-link p-0" onClick={onSwitchToLogin}>
          Log in
        </button>
      </p>
    </div>
  );
}
