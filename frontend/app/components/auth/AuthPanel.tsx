'use client';
import { useLanguage } from '../../i18n/LanguageContext';

export default function AuthPanel() {
  const { t } = useLanguage();
  const features = [
    { icon: '✦', text: t.auth.panel1 },
    { icon: '◈', text: t.auth.panel2 },
    { icon: '⊞', text: t.auth.panel3 },
    { icon: '◎', text: t.auth.panel4 },
  ];

  return (
    <>
      <style>{`
        .auth-panel {
          background: var(--foreground);
          display: flex; flex-direction: column;
          justify-content: space-between;
          padding: 48px; position: relative;
          overflow: hidden; min-height: 100vh;
        }
        
        /* Noise texture */
        .auth-panel::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 1;
        }
        
        /* Grid pattern */
        .auth-panel-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 64px 64px;
          pointer-events: none;
        }
        
        /* Glow */
        .auth-panel::after {
          content: '';
          position: absolute;
          top: -20%;
          left: -20%;
          width: 800px;
          height: 600px;
          background: radial-gradient(ellipse, rgba(22,163,74,0.15) 0%, transparent 60%);
          pointer-events: none;
        }
        .panel-logo {
          display: flex; align-items: center; gap: 10px;
          position: relative; z-index: 1;
        }
        .panel-logo-mark {
          width: 36px; height: 36px; background: var(--green);
          border-radius: 10px; display: flex; align-items: center; justify-content: center;
          color: white; font-size: 18px; font-family: var(--font-mono); font-weight: 600;
        }
        .panel-logo-name {
          font-family: var(--font-sans); font-size: 24px; font-weight: 700;
          color: #FFFFFF; letter-spacing: -0.5px;
        }
        .panel-logo-name em { color: var(--green-light); font-style: normal; }
        .panel-main { position: relative; z-index: 2; }
        .panel-tag {
          display: inline-block; font-family: var(--font-mono);
          font-size: 11px; font-weight: 600; letter-spacing: 2px;
          text-transform: uppercase; color: var(--green-light);
          background: rgba(34,197,94,0.1); border: 1px solid rgba(34,197,94,0.2);
          border-radius: var(--radius-full); padding: 6px 16px; margin-bottom: 24px;
        }
        .panel-title {
          font-family: var(--font-sans);
          font-size: clamp(36px, 4vw, 56px); font-weight: 800;
          line-height: 1.05; letter-spacing: -2px; color: #FFFFFF; margin-bottom: 20px;
        }
        .panel-title em { 
          background: linear-gradient(135deg, var(--green) 0%, var(--green-light) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-style: normal; 
        }
        .panel-desc { font-size: 15px; color: #94A3B8; line-height: 1.7; margin-bottom: 40px; max-width: 360px; }
        .panel-features { display: flex; flex-direction: column; gap: 14px; }
        .panel-feature {
          display: flex; align-items: center; gap: 12px;
          padding: 14px 16px;
          background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07);
          border-radius: var(--radius-md); transition: background 0.2s;
        }
        .panel-feature:hover { background: rgba(255,255,255,0.07); }
        .panel-feature-icon {
          width: 32px; height: 32px;
          background: rgba(22,163,74,0.15); border: 1px solid rgba(22,163,74,0.25);
          border-radius: 8px; display: flex; align-items: center; justify-content: center;
          color: var(--green-light); font-size: 14px; flex-shrink: 0;
        }
        .panel-feature-text { font-size: 13px; color: #CBD5E1; font-weight: 500; }
        .panel-footer {
          position: relative; z-index: 2;
          padding-top: 32px; border-top: 1px solid rgba(255,255,255,0.07);
        }
        .panel-footer-text { font-size: 12px; color: #64748B; font-family: var(--font-mono); margin-bottom: 12px; }
        .panel-avatars { display: flex; align-items: center; }
        .avatar {
          width: 36px; height: 36px; border-radius: 50%;
          background: var(--gray-800); border: 2px solid var(--foreground);
          margin-right: -8px; display: flex; align-items: center; justify-content: center;
          font-size: 12px; font-weight: 700; color: #FFFFFF;
        }
        .avatar-count {
          width: 36px; height: 36px; border-radius: 50%;
          background: var(--green); border: 2px solid var(--foreground);
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; font-weight: 800; color: #FFFFFF; margin-left: 4px;
        }
        .panel-team { display: flex; align-items: center; gap: 14px; margin-top: 16px; }
        .panel-team-names { font-size: 12px; color: #64748B; font-family: var(--font-mono); line-height: 1.6; }
      `}</style>

      <div className="auth-panel">
        <div className="auth-panel-grid" />
        <div className="panel-logo">
          <div className="panel-logo-mark">P</div>
          <span className="panel-logo-name">Proj<em>AI</em></span>
        </div>
        <div className="panel-main">
          <div className="panel-tag">EMSI · 2025–2026</div>
          <h2 className="panel-title">Gérez vos projets<br />avec <em>l&apos;IA</em></h2>
          <p className="panel-desc">{t.auth.panelDesc}</p>
          <div className="panel-features">
            {features.map((f, i) => (
              <div key={i} className="panel-feature">
                <div className="panel-feature-icon">{f.icon}</div>
                <span className="panel-feature-text">{f.text}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="panel-footer">
          <div className="panel-footer-text">{t.auth.builtBy}</div>
          <div className="panel-team">
            <div className="panel-avatars">
              {['YA', 'GA', 'ES'].map(initials => (
                <div key={initials} className="avatar">{initials}</div>
              ))}
              <div className="avatar-count">3</div>
            </div>
            <div className="panel-team-names">
              Abderrazik · Ghazouani<br />Essaoudi · Mr Essabar
            </div>
          </div>
        </div>
      </div>
    </>
  );
}