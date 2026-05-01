'use client';
import { ReactNode } from 'react';
import Link from 'next/link';
import AuthPanel from './AuthPanel';
import LanguageToggle from '../LanguageToggle';
import { useLanguage } from '../../i18n/LanguageContext';

interface AuthLayoutProps {
  children: ReactNode;
  mode: 'login' | 'register';
  onToggle: () => void;
}

export default function AuthLayout({ children, mode, onToggle }: AuthLayoutProps) {
  const { t } = useLanguage();

  return (
    <>
      <style>{`
        .auth-page { display: grid; grid-template-columns: 1fr 1fr; min-height: 100vh; }
        @media (max-width: 900px) {
          .auth-page { grid-template-columns: 1fr; }
          .auth-panel-col { display: none; }
        }
        .auth-form-col {
          display: flex; flex-direction: column;
          justify-content: center; align-items: center;
          padding: 48px 40px; background: var(--background); position: relative;
          overflow: hidden;
        }
        .auth-form-col::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(0,0,0,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.02) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%);
          -webkit-mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%);
          pointer-events: none;
        }
        .auth-form-col::after {
          content: '';
          position: absolute;
          top: -150px;
          left: 50%;
          transform: translateX(-50%);
          width: 600px;
          height: 400px;
          background: radial-gradient(ellipse at center, var(--green-pale) 0%, transparent 60%);
          pointer-events: none;
          opacity: 0.6;
        }
        .auth-form-topbar {
          position: absolute; top: 24px; right: 28px;
          display: flex; align-items: center; gap: 12px;
        }
        .auth-form-inner {
          width: 100%; max-width: 420px;
          animation: fadeUp 0.5s ease forwards;
          position: relative; z-index: 10;
        }
        .auth-eyebrow {
          font-family: var(--font-mono); font-size: 11px; font-weight: 700;
          letter-spacing: 2px; text-transform: uppercase;
          color: var(--green); margin-bottom: 8px;
        }
        .auth-title {
          font-family: var(--font-sans);
          font-size: clamp(28px, 3vw, 40px); font-weight: 800;
          letter-spacing: -1.5px; color: var(--foreground); line-height: 1.1; margin-bottom: 8px;
        }
        .auth-subtitle {
          font-size: 15px; color: var(--gray-500); margin-bottom: 36px; line-height: 1.6;
        }
        .auth-subtitle a { color: var(--green); font-weight: 700; cursor: pointer; }
        .auth-subtitle a:hover { text-decoration: underline; }
        .auth-switch {
          margin-top: 28px; padding-top: 24px;
          border-top: 1px solid var(--gray-100);
          text-align: center; font-size: 14px; color: var(--gray-500);
        }
        .auth-switch-link {
          color: var(--green); font-weight: 700; background: none; border: none;
          cursor: pointer; font-size: 14px; font-family: var(--font-body); transition: opacity 0.15s;
        }
        .auth-switch-link:hover { opacity: 0.75; }
        .auth-progress { display: flex; gap: 4px; margin-bottom: 28px; }
        .progress-step { flex: 1; height: 3px; border-radius: 2px; background: var(--gray-200); }
        .progress-step.active { background: var(--green); }
        .back-link {
          font-size: 13px; font-weight: 600; color: var(--gray-500);
          text-decoration: none; display: flex; align-items: center; gap: 6px; transition: color 0.15s;
        }
        .back-link:hover { color: var(--foreground); }
      `}</style>

      <div className="auth-page">
        <div className="auth-panel-col"><AuthPanel /></div>
        <div className="auth-form-col">
          <div className="auth-form-topbar">
            <Link href="/" className="back-link">← {t.auth.backHome}</Link>
            <LanguageToggle />
          </div>
          <div className="auth-form-inner">
            <div className="auth-eyebrow">
              {mode === 'login' ? t.auth.loginEyebrow : t.auth.registerEyebrow}
            </div>
            <h1 className="auth-title">
              {mode === 'login' ? t.auth.loginTitle : t.auth.registerTitle}
            </h1>
            <p className="auth-subtitle">
              {mode === 'login' ? (
                <>{t.auth.noAccount}{' '}<a onClick={onToggle}>{t.auth.signUpLink}</a></>
              ) : (
                <>{t.auth.alreadyAccount}{' '}<a onClick={onToggle}>{t.auth.signInLink}</a></>
              )}
            </p>
            {mode === 'register' && (
              <div className="auth-progress">
                {[0,1,2].map(i => (
                  <div key={i} className={`progress-step ${i === 0 ? 'active' : ''}`} />
                ))}
              </div>
            )}
            {children}
            <div className="auth-switch">
              {mode === 'login' ? (
                <>{t.auth.noAccount}{' '}
                  <button className="auth-switch-link" onClick={onToggle}>{t.auth.signUpLink}</button></>
              ) : (
                <>{t.auth.alreadyAccount}{' '}
                  <button className="auth-switch-link" onClick={onToggle}>{t.auth.signInLink}</button></>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}