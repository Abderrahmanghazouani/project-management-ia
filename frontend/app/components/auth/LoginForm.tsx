'use client';
import { useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const { t } = useLanguage();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: POST /api/auth/login (Spring Boot backend)
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    router.push('/dashboard');
  };

  return (
    <>
      <style>{`
        .login-form { display: flex; flex-direction: column; gap: 18px; }
        .form-group { display: flex; flex-direction: column; gap: 6px; }
        .form-label {
          font-size: 13px; font-weight: 600; color: var(--gray-700); letter-spacing: 0.2px;
        }
        .form-input {
          width: 100%; padding: 12px 16px 12px 42px;
          background: var(--background);
          border: 1.5px solid var(--border);
          border-radius: var(--radius-lg);
          font-size: 15px; font-family: var(--font-sans); color: var(--foreground);
          outline: none; transition: border-color 0.2s, box-shadow 0.2s;
        }
        .form-input::placeholder { color: var(--gray-400); }
        .form-input:focus {
          border-color: var(--green);
          box-shadow: 0 0 0 3px rgba(22,163,74,0.08);
        }
        .input-wrapper { position: relative; }
        .input-icon {
          position: absolute; left: 14px; top: 50%;
          transform: translateY(-50%);
          color: var(--gray-400); font-size: 15px; pointer-events: none;
        }
        .show-pw-btn {
          position: absolute; right: 14px; top: 50%;
          transform: translateY(-50%);
          background: none; border: none; color: var(--gray-400);
          font-size: 12px; font-weight: 600; cursor: pointer;
          font-family: var(--font-mono); transition: color 0.15s;
        }
        .show-pw-btn:hover { color: var(--green); }
        .form-row {
          display: flex; justify-content: space-between; align-items: center; font-size: 13px;
        }
        .remember-label {
          display: flex; align-items: center; gap: 7px; color: var(--gray-600); cursor: pointer;
        }
        .remember-label input[type="checkbox"] {
          width: 15px; height: 15px; accent-color: var(--green); cursor: pointer;
        }
        .forgot-link {
          color: var(--green); font-weight: 600; text-decoration: none;
          font-size: 13px; transition: opacity 0.15s;
        }
        .forgot-link:hover { opacity: 0.75; }
        .btn-submit {
          width: 100%; padding: 14px;
          background: var(--foreground); color: var(--background);
          border: none; border-radius: var(--radius-lg);
          font-size: 15px; font-weight: 700; font-family: var(--font-sans);
          cursor: pointer; transition: all 0.2s;
          display: flex; align-items: center; justify-content: center; gap: 8px;
        }
        .btn-submit:hover:not(:disabled) {
          background: var(--green);
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(22,163,74,0.25);
        }
        .btn-submit:disabled { opacity: 0.6; cursor: not-allowed; }
        .spinner {
          width: 16px; height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white; border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .divider {
          display: flex; align-items: center; gap: 12px;
          color: var(--gray-400); font-size: 12px; font-family: var(--font-mono);
        }
        .divider::before, .divider::after {
          content: ''; flex: 1; height: 1px; background: var(--gray-200);
        }
        .btn-google {
          width: 100%; padding: 12px;
          background: var(--background); color: var(--foreground);
          border: 1.5px solid var(--border); border-radius: var(--radius-lg);
          font-size: 14px; font-weight: 600; font-family: var(--font-sans);
          cursor: pointer; transition: all 0.2s;
          display: flex; align-items: center; justify-content: center; gap: 10px;
        }
        .btn-google:hover { border-color: var(--gray-400); box-shadow: var(--shadow-sm); }
      `}</style>

      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="email">{t.auth.emailLabel}</label>
          <div className="input-wrapper">
            <span className="input-icon">✉</span>
            <input id="email" type="email" className="form-input"
              placeholder={t.auth.emailPlaceholder}
              value={email} onChange={e => setEmail(e.target.value)}
              required autoComplete="email" />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="password">{t.auth.passwordLabel}</label>
          <div className="input-wrapper">
            <span className="input-icon">🔒</span>
            <input id="password" type={showPassword ? 'text' : 'password'}
              className="form-input" placeholder={t.auth.passwordPlaceholder}
              value={password} onChange={e => setPassword(e.target.value)}
              required autoComplete="current-password" />
            <button type="button" className="show-pw-btn"
              onClick={() => setShowPassword(v => !v)}>
              {showPassword ? t.auth.hide : t.auth.show}
            </button>
          </div>
        </div>

        <div className="form-row">
          <label className="remember-label">
            <input type="checkbox" />
            {t.auth.rememberMe}
          </label>
          <a href="#" className="forgot-link">{t.auth.forgotPassword}</a>
        </div>

        <button type="submit" className="btn-submit" disabled={loading}>
          {loading
            ? <><div className="spinner" />{t.auth.signingIn}</>
            : <>{t.auth.signIn} →</>}
        </button>

        <div className="divider">{t.auth.orContinueWith}</div>

        <button type="button" className="btn-google">
          <svg width="18" height="18" viewBox="0 0 18 18">
            <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
            <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
            <path fill="#FBBC05" d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z"/>
            <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.96l3.007 2.332C4.672 5.163 6.656 3.58 9 3.58z"/>
          </svg>
          {t.auth.continueWithGoogle}
        </button>
      </form>
    </>
  );
}