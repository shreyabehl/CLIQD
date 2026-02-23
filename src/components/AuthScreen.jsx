import { useState } from 'react';
import './AuthScreen.css';

export default function AuthScreen({ onLogin, onRegister }) {
  const [tab, setTab] = useState('login');

  // Login state
  const [loginEmail, setLoginEmail]   = useState('shivam@email.com');
  const [loginPass,  setLoginPass]    = useState('password123');
  const [loginErr,   setLoginErr]     = useState('');

  // Register state
  const [regName,  setRegName]  = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPass,  setRegPass]  = useState('');
  const [regErr,   setRegErr]   = useState('');

  function handleLogin(e) {
    e.preventDefault();
    if (!loginEmail || !loginPass) { setLoginErr('Please fill in all fields.'); return; }
    const err = onLogin(loginEmail, loginPass);
    if (err) setLoginErr(err);
  }

  function handleRegister(e) {
    e.preventDefault();
    if (!regName || !regEmail || !regPass) { setRegErr('Please fill in all fields.'); return; }
    const err = onRegister(regName, regEmail, regPass);
    if (err) setRegErr(err);
  }

  return (
    <div className="auth-screen">
      <div className="auth-blob top-right" />
      <div className="auth-blob bottom-left" />

      <div className="auth-box">
        <h1 className="auth-logo">Tag<span>Shop</span></h1>
        <p className="auth-tagline">Shop the look. Tag every piece.</p>

        <div className="auth-tabs">
          <button
            className={`auth-tab ${tab === 'login' ? 'active' : ''}`}
            onClick={() => { setTab('login'); setLoginErr(''); }}
          >
            Sign In
          </button>
          <button
            className={`auth-tab ${tab === 'register' ? 'active' : ''}`}
            onClick={() => { setTab('register'); setRegErr(''); }}
          >
            Create Account
          </button>
        </div>

        {tab === 'login' ? (
          <form onSubmit={handleLogin} className="auth-form">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={loginEmail}
                onChange={e => setLoginEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={loginPass}
                onChange={e => setLoginPass(e.target.value)}
              />
            </div>
            <button type="submit" className="btn-primary">Sign In →</button>
            {loginErr && <p className="auth-error">{loginErr}</p>}
          </form>
        ) : (
          <form onSubmit={handleRegister} className="auth-form">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                placeholder="Shivam Kumar"
                value={regName}
                onChange={e => setRegName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={regEmail}
                onChange={e => setRegEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Min 8 characters"
                value={regPass}
                onChange={e => setRegPass(e.target.value)}
              />
            </div>
            <button type="submit" className="btn-primary">Create Account →</button>
            {regErr && <p className="auth-error">{regErr}</p>}
          </form>
        )}
      </div>
    </div>
  );
}
