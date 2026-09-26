// There's no backend here. "Signing up" just saves a user into localStorage,
// and "logging in" checks the entered details against that list. This is
// purely a UI/validation demo - never store real passwords in localStorage
// like this in an actual app; a real login always needs a real backend.
const USERS_KEY = 'authFlow_users';
const SESSION_KEY = 'authFlow_currentUserEmail';

export function getUsers() {
  const raw = localStorage.getItem(USERS_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function saveUser(user) {
  const users = getUsers();
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function findUserByEmail(email) {
  return getUsers().find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export function saveSession(email) {
  localStorage.setItem(SESSION_KEY, email);
}

export function getSession() {
  return localStorage.getItem(SESSION_KEY);
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateSignup({ name, email, password, confirmPassword }) {
  const errors = {};

  if (!name.trim()) errors.name = 'Name is required.';

  if (!email.trim()) {
    errors.email = 'Email is required.';
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = 'Enter a valid email address.';
  } else if (findUserByEmail(email)) {
    errors.email = 'An account with this email already exists.';
  }

  if (!password) {
    errors.password = 'Password is required.';
  } else if (password.length < 8) {
    errors.password = 'Password must be at least 8 characters.';
  }

  if (confirmPassword !== password) {
    errors.confirmPassword = 'Passwords do not match.';
  }

  return errors;
}

export function validateLogin({ email, password }) {
  const errors = {};
  if (!email.trim()) errors.email = 'Email is required.';
  if (!password) errors.password = 'Password is required.';
  return errors;
}

// A simple, beginner-friendly strength check - not a security measure, just
// feedback for the user. Longer passwords with a mix of character types
// score higher.
export function getPasswordStrength(password) {
  if (!password) return { label: '', percent: 0, color: 'bg-secondary' };

  let score = 0;
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;

  if (score <= 1) return { label: 'Weak', percent: 33, color: 'bg-danger' };
  if (score <= 3) return { label: 'Medium', percent: 66, color: 'bg-warning' };
  return { label: 'Strong', percent: 100, color: 'bg-success' };
}
