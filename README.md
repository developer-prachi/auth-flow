# Auth Flow

A signup/login flow built in React and Bootstrap - form validation, a
password strength meter, show/hide password, and a session that survives a
page refresh.

**[Live demo](https://developer-prachi.github.io/auth-flow/)** · **[Code](https://github.com/developer-prachi/auth-flow)**

**Important:** there is no real backend here. "Signing up" saves a user
into the browser's `localStorage`, and "logging in" checks the entered
details against that list. This is a UI/validation demo, not a real
authentication system - storing plain-text passwords in `localStorage`
is fine for a portfolio demo but would be a serious security problem in
a real app, which would need a real backend to check credentials safely.
Worth saying out loud if an interviewer asks about it - it shows you know
the difference.

## Features

- Sign up with name, email, password, and confirm password
- Field-level validation: required fields, a valid email format, an
  8-character minimum password, and a passwords-must-match check
- A password strength meter (weak/medium/strong) based on length and
  character variety
- Show/hide password toggle
- Login checks the entered credentials against the saved user and shows a
  clear error if they don't match
- Session persists across a page refresh (checked once on load, via
  `useEffect`) - refresh the page while logged in and you're still logged
  in

## Stack

React 18, Vite, Bootstrap 5 (via CDN link in `index.html`).

## Project structure

```
src/
  App.jsx                  view state machine (signup/login/dashboard) + session check
  index.css                 password strength bar styles
  components/
    SignupForm.jsx           name/email/password/confirm form + validation
    LoginForm.jsx             email/password form + validation
    PasswordField.jsx         reusable show/hide input, with an optional strength bar
    Dashboard.jsx             the "you're logged in" screen + logout button
  utils/
    auth.js                   mock user storage, validation rules, strength scoring
```

## Why no React Router

Three screens here are handled with a single `view` state
(`'signup' | 'login' | 'dashboard'`) instead of real routes - the same
pattern the other portfolio projects use. React Router would be the
natural next step for real, bookmarkable URLs, but it's left out here on
purpose to keep this project consistent with the rest of the portfolio.

## Running it locally

```bash
npm install
npm run dev
```

## Deploying

```bash
npm run deploy
```

Builds the app and pushes `dist/` to a `gh-pages` branch - enable GitHub
Pages on that branch in your repo settings. Or drag the `dist/` folder
(after `npm run build`) onto [app.netlify.com/drop](https://app.netlify.com/drop).

---

Part of my portfolio: [developer-prachi.github.io](https://developer-prachi.github.io)
