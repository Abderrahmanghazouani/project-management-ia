"use client";
import { useLanguage } from '../i18n/LanguageContext';

export function CTASection() {
  const { t } = useLanguage();
  return (
    <>
      <style>{`
        .cta-section {
          padding: 120px 40px;
          background: var(--black);
          position: relative;
          overflow: hidden;
          text-align: center;
        }
        .cta-section::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          opacity: 0.4;
          z-index: 0;
        }
        .cta-bg-lines {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
        }
        .cta-orb {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 600px; height: 300px;
          background: radial-gradient(ellipse, rgba(22,163,74,0.12) 0%, transparent 70%);
          pointer-events: none;
        }
        .cta-inner { position: relative; z-index: 1; max-width: 720px; margin: 0 auto; }
        .cta-label {
          display: inline-block;
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--green-light);
          background: rgba(34,197,94,0.1);
          border: 1px solid rgba(34,197,94,0.2);
          border-radius: 100px;
          padding: 5px 16px;
          margin-bottom: 32px;
        }
        .cta-title {
          font-family: var(--font-display);
          font-size: clamp(44px, 6vw, 80px);
          font-weight: 400;
          letter-spacing: -4px;
          line-height: 1;
          color: var(--white);
          margin-bottom: 20px;
        }
        .cta-title em { color: var(--green-light); font-style: italic; }
        .cta-desc {
          color: #94A3B8;
          font-size: 17px;
          line-height: 1.7;
          margin-bottom: 48px;
        }
        .cta-actions {
          display: flex;
          gap: 14px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .btn-cta-primary {
          background: var(--green);
          color: var(--white);
          border: none;
          border-radius: var(--radius-md);
          padding: 16px 36px;
          font-size: 16px;
          font-weight: 600;
          transition: all 0.2s;
          font-family: var(--font-body);
        }
        .btn-cta-primary:hover {
          background: #15803d;
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(22,163,74,0.3);
        }
        .btn-cta-ghost {
          background: transparent;
          color: #94A3B8;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: var(--radius-md);
          padding: 16px 36px;
          font-size: 16px;
          font-weight: 500;
          transition: all 0.2s;
          font-family: var(--font-body);
        }
        .btn-cta-ghost:hover {
          border-color: rgba(255,255,255,0.25);
          color: var(--white);
        }
      `}</style>

      <section className="cta-section">
        <div className="cta-bg-lines" />
        <div className="cta-orb" />
        <div className="cta-inner">
          <div className="cta-label">{t.cta.label}</div>
          <h2 className="cta-title">
            {t.cta.title1}<br />
            {t.cta.title2} <em>{t.cta.title3}</em>
          </h2>
          <p className="cta-desc">
            {t.cta.desc}
          </p>
          <div className="cta-actions">
            <button className="btn-cta-primary">{t.cta.btn1}</button>
            <button className="btn-cta-ghost">{t.cta.btn2}</button>
          </div>
        </div>
      </section>
    </>
  );
}

export function Footer() {
  const { t } = useLanguage();
  const modules = ["Dashboard", "Projets", "Backlog", "Kanban", "Sprints", "Ressources", "Coûts", "Livrables", "Risques", "Assistant IA"];

  return (
    <>
      <style>{`
        .footer {
          background: var(--black);
          border-top: 1px solid rgba(255,255,255,0.06);
          padding: 60px 40px 32px;
          color: #64748B;
        }
        .footer-inner {
          max-width: 1200px;
          margin: 0 auto;
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 60px;
          margin-bottom: 48px;
          padding-bottom: 48px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .footer-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--white);
          font-family: var(--font-display);
          font-size: 18px;
          margin-bottom: 16px;
        }
        .footer-mark {
          width: 28px; height: 28px;
          background: var(--green);
          border-radius: 7px;
          display: flex; align-items: center; justify-content: center;
          color: white;
          font-size: 14px;
          font-family: var(--font-mono);
        }
        .footer-tagline {
          font-size: 13px;
          line-height: 1.7;
          color: #64748B;
          max-width: 260px;
        }
        .footer-col-title {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: #94A3B8;
          margin-bottom: 16px;
          font-family: var(--font-mono);
        }
        .footer-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .footer-links a {
          font-size: 13px;
          color: #64748B;
          transition: color 0.15s;
        }
        .footer-links a:hover { color: var(--white); }
        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 12px;
          font-family: var(--font-mono);
        }
        .footer-team {
          display: flex;
          align-items: center;
          gap: 16px;
        }
      `}</style>

      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-grid">
            <div>
              <div className="footer-brand">
                <div className="footer-mark">P</div>
                ProjAI
              </div>
              <p className="footer-tagline">
                {t.footer.tagline}
              </p>
            </div>
            <div>
              <div className="footer-col-title">{t.footer.modules}</div>
              <ul className="footer-links">
                {modules.slice(0, 5).map(m => (
                  <li key={m}><a href="#">{m}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <div className="footer-col-title">{t.footer.suite}</div>
              <ul className="footer-links">
                {modules.slice(5).map(m => (
                  <li key={m}><a href="#">{m}</a></li>
                ))}
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <span>© 2025–2026 ProjAI · EMSI</span>
            <div className="footer-team">
              <span>Abderrazik Yassine</span>
              <span style={{ color: "#2D3748" }}>·</span>
              <span>Ghazouani Abderrahman</span>
              <span style={{ color: "#2D3748" }}>·</span>
              <span>Essaoudi Soufiane</span>
            </div>
            <span>Next.js · Spring Boot · Gemini</span>
          </div>
        </div>
      </footer>
    </>
  );
}