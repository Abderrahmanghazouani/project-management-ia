'use client';
import { useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';

export default function RegisterForm() {
  const { t } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState('');
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [strength, setStrength] = useState(0);

  const calcStrength = (pw: string) => {
    let s = 0;
    if (pw.length >= 8) s++;
    if (/[A-Z]/.test(pw)) s++;
    if (/[0-9]/.test(pw)) s++;
    if (/[^A-Za-z0-9]/.test(pw)) s++;
    setStrength(s);
  };

  const handleChange = (field: string, value: string) => {
    setForm(f => ({ ...f, [field]: value }));
    if (field === 'password') calcStrength(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: POST /api/auth/register (Spring Boot backend)
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
  };

  const strengthColors = ['var(--gray-200)', '#EF4444', '#F59E0B', '#22C55E', '#16A34A'];
  const strengthLabels = ['', t.auth.strengthWeak, t.auth.strengthFair, t.auth.strengthGood, t.auth.strengthStrong];

  return (
    <>
      <style>{`
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
        .form-label {
          font-size: 13px; font-weight: 600; color: var(--gray-700); letter-spacing: 0.2px;
        }
        .form-group { display: flex; flex-direction: column; gap: 6px; }
        .form-row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .strength-bar { display: flex; gap: 4px; margin-top: 6px; }
        .strength-segment { flex: 1; height: 3px; border-radius: 2px; transition: background 0.3s; }
        .strength-label { font-size: 11px; font-family: var(--font-mono); font-weight: 600; margin-top: 4px; }
        .role-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
        .role-btn {
          padding: 10px 12px; background: var(--background);
          border: 1.5px solid var(--border); border-radius: var(--radius-lg);
          font-size: 13px; font-weight: 600; font-family: var(--font-sans);
          color: var(--gray-600); cursor: pointer; transition: all 0.15s;
          text-align: left; display: flex; align-items: center; gap: 8px;
        }
        .role-btn:hover { border-color: var(--gray-400); color: var(--foreground); }
        .role-btn.selected { border-color: var(--green); background: var(--green-pale); color: var(--green); }
        .role-icon {
          width: 24px; height: 24px; border-radius: 6px;
          display: flex; align-items: center; justify-content: center;
          font-size: 12px; background: var(--gray-100); flex-shrink: 0;
        }
        .role-btn.selected .role-icon { background: var(--green-muted); }
        .terms-label {
          display: flex; align-items: flex-start; gap: 9px;
          font-size: 13px; color: var(--gray-500); cursor: pointer; line-height: 1.5;
        }
        .terms-label input { margin-top: 2px; accent-color: var(--green); }
        .terms-link { color: var(--green); font-weight: 600; text-decoration: none; }
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
      `}</style>

      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="name">{t.auth.fullName}</label>
          <div className="input-wrapper">
            <span className="input-icon">👤</span>
            <input id="name" type="text" className="form-input"
              placeholder={t.auth.fullNamePlaceholder}
              value={form.name} onChange={e => handleChange('name', e.target.value)} required />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="reg-email">{t.auth.emailLabel}</label>
          <div className="input-wrapper">
            <span className="input-icon">✉</span>
            <input id="reg-email" type="email" className="form-input"
              placeholder={t.auth.emailPlaceholder}
              value={form.email} onChange={e => handleChange('email', e.target.value)} required />
          </div>
        </div>

        <div className="form-row-2">
          <div className="form-group">
            <label className="form-label" htmlFor="reg-password">{t.auth.passwordLabel}</label>
            <div className="input-wrapper">
              <span className="input-icon">🔒</span>
              <input id="reg-password" type={showPassword ? 'text' : 'password'}
                className="form-input" placeholder="••••••••"
                value={form.password} onChange={e => handleChange('password', e.target.value)}
                required minLength={8} />
              <button type="button" className="show-pw-btn"
                onClick={() => setShowPassword(v => !v)}>
                {showPassword ? t.auth.hide : t.auth.show}
              </button>
            </div>
            {form.password && (
              <>
                <div className="strength-bar">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="strength-segment"
                      style={{ background: i <= strength ? strengthColors[strength] : 'var(--gray-200)' }} />
                  ))}
                </div>
                <div className="strength-label" style={{ color: strengthColors[strength] }}>
                  {strengthLabels[strength]}
                </div>
              </>
            )}
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="confirm-pw">{t.auth.confirmPassword}</label>
            <div className="input-wrapper">
              <span className="input-icon">🔒</span>
              <input id="confirm-pw" type={showPassword ? 'text' : 'password'}
                className="form-input" placeholder="••••••••"
                value={form.confirmPassword}
                onChange={e => handleChange('confirmPassword', e.target.value)} required
                style={{ borderColor: form.confirmPassword
                  ? (form.confirmPassword === form.password ? 'var(--green)' : '#EF4444')
                  : undefined }} />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">{t.auth.selectRole}</label>
          <div className="role-grid">
            {[
              { key: 'Client', icon: '💼' },
              { key: 'Manager', icon: '📊' },
              { key: 'Développeur', icon: '💻' },
              { key: 'Administrateur', icon: '⚙️' },
            ].map(r => (
              <button key={r.key} type="button"
                className={`role-btn ${role === r.key ? 'selected' : ''}`}
                onClick={() => setRole(r.key)}>
                <div className="role-icon">{r.icon}</div>
                {r.key}
              </button>
            ))}
          </div>
        </div>

        <label className="terms-label">
          <input type="checkbox" required />
          {t.auth.agreeToTerms}{' '}
          <a href="#" className="terms-link">{t.auth.termsLink}</a>
          {' '}{t.auth.andThe}{' '}
          <a href="#" className="terms-link">{t.auth.privacyLink}</a>
        </label>

        <button type="submit" className="btn-submit" disabled={loading || !role} style={{ marginTop: 4 }}>
          {loading
            ? <><div className="spinner" />{t.auth.creating}</>
            : <>{t.auth.createAccount} →</>}
        </button>
      </form>
    </>
  );
}