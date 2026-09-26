import { useState } from 'react';
import { getPasswordStrength } from '../utils/auth';

export default function PasswordField({ label, value, onChange, error, showStrength }) {
  const [visible, setVisible] = useState(false);
  const strength = showStrength ? getPasswordStrength(value) : null;

  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      <div className="input-group has-validation">
        <input
          type={visible ? 'text' : 'password'}
          className={`form-control ${error ? 'is-invalid' : ''}`}
          value={value}
          onChange={onChange}
        />
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => setVisible(!visible)}
          tabIndex={-1}
        >
          {visible ? 'Hide' : 'Show'}
        </button>
        {error && <div className="invalid-feedback">{error}</div>}
      </div>

      {showStrength && value && (
        <div className="mt-2">
          <div className="strength-bar">
            <div
              className={`strength-bar__fill ${strength.color}`}
              style={{ width: `${strength.percent}%` }}
            />
          </div>
          <span className="small text-muted">{strength.label} password</span>
        </div>
      )}
    </div>
  );
}
