"use client";
import { useLanguage } from '../i18n/LanguageContext';

export function CTASection() {
  const { t } = useLanguage();
  return (
    <>
      <style>{`
        .cta-section {
          padding: 160px 24px;
          background: var(--foreground);
          position: relative;
          overflow: hidden;
        }
        
        /* Noise texture overlay */
        .cta-section::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
        }
        
        /* Grid pattern */
        .cta-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 64px 64px;
          pointer-events: none;
        }
        
        /* Glow effect */
        .cta-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 800px;
          height: 400px;
          background: radial-gradient(ellipse, rgba(22,163,74,0.15) 0%, transparent 60%);
          pointer-events: none;
        }
        
        .cta-inner {
          position: relative;
          z-index: 1;
          max-width: 800px;
          margin: 0 auto;
          text-align: center;
        }
        
        .cta-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--green-light);
          background: rgba(22,163,74,0.1);
          border: 1px solid rgba(22,163,74,0.2);
          border-radius: var(--radius-full);
          padding: 8px 20px;
          margin-bottom: 40px;
        }
        
        .cta-title {
          font-family: var(--font-sans);
          font-size: clamp(40px, 7vw, 72px);
          font-weight: 700;
          letter-spacing: -3px;
          line-height: 1.05;
          color: var(--white);
          margin-bottom: 24px;
        }
        
        .cta-title .highlight {
          color: var(--green-light);
        }
        
        .cta-desc {
          color: var(--gray-400);
          font-size: 18px;
          line-height: 1.7;
          margin-bottom: 48px;
          max-width: 560px;
          margin-left: auto;
          margin-right: auto;
        }
        
        .cta-actions {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }
        
        .btn-cta-primary {
          background: var(--primary);
          color: var(--white);
          border: none;
          border-radius: var(--radius-lg);
          padding: 18px 36px;
          font-size: 16px;
          font-weight: 600;
          transition: all 0.2s ease;
          font-family: var(--font-sans);
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .btn-cta-primary:hover {
          background: var(--primary-light);
          transform: translateY(-2px);
          box-shadow: 0 16px 48px rgba(22,163,74,0.35);
        }
        
        .btn-cta-ghost {
          background: transparent;
          color: var(--gray-400);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: var(--radius-lg);
          padding: 18px 36px;
          font-size: 16px;
          font-weight: 500;
          transition: all 0.2s ease;
          font-family: var(--font-sans);
        }
        
        .btn-cta-ghost:hover {
          border-color: rgba(255,255,255,0.25);
          color: var(--white);
          background: rgba(255,255,255,0.03);
        }
      `}</style>

      <section className="cta-section">
        <div className="cta-grid" />
        <div className="cta-glow" />
        <div className="cta-inner">
          <div className="cta-badge">{t.cta.label}</div>
          <h2 className="cta-title text-balance">
            {t.cta.title1}<br />
            {t.cta.title2} <span className="highlight">{t.cta.title3}</span>
          </h2>
          <p className="cta-desc">
            {t.cta.desc}
          </p>
          <div className="cta-actions">
            <button className="btn-cta-primary">
              {t.cta.btn1}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </button>
            <button className="btn-cta-ghost">{t.cta.btn2}</button>
          </div>
        </div>
      </section>
    </>
  );
}

export function Footer() {
  const { t } = useLanguage();
  const modules = ["Dashboard", "Projets", "Backlog", "Kanban", "Sprints", "Ressources", "Couts", "Livrables", "Risques", "Assistant IA"];

  return (
    <>
      <style>{`
        .footer {
          background: var(--black);
          padding: 80px 24px 40px;
          color: var(--gray-500);
        }
        
        .footer-inner {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .footer-top {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 60px;
          margin-bottom: 64px;
          padding-bottom: 64px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        
        .footer-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          color: var(--white);
          font-family: var(--font-sans);
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 20px;
        }
        
        .footer-logo {
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
          border-radius: var(--radius-lg);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 16px;
          font-family: var(--font-mono);
          font-weight: 600;
        }
        
        .footer-tagline {
          font-size: 14px;
          line-height: 1.7;
          color: var(--gray-500);
          max-width: 280px;
        }
        
        .footer-social {
          display: flex;
          gap: 12px;
          margin-top: 24px;
        }
        
        .social-link {
          width: 40px;
          height: 40px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--gray-500);
          transition: all 0.2s ease;
        }
        
        .social-link:hover {
          background: rgba(255,255,255,0.08);
          border-color: rgba(255,255,255,0.12);
          color: var(--white);
        }
        
        .footer-col-title {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--gray-400);
          margin-bottom: 20px;
          font-family: var(--font-mono);
        }
        
        .footer-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        
        .footer-links a {
          font-size: 14px;
          color: var(--gray-500);
          transition: color 0.15s ease;
        }
        
        .footer-links a:hover {
          color: var(--white);
        }
        
        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 13px;
          color: var(--gray-600);
        }
        
        .footer-team {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .team-divider {
          width: 4px;
          height: 4px;
          background: var(--gray-700);
          border-radius: 50%;
        }
        
        @media (max-width: 900px) {
          .footer-top { grid-template-columns: 1fr 1fr; gap: 40px; }
        }
        
        @media (max-width: 600px) {
          .footer-top { grid-template-columns: 1fr; }
          .footer-bottom { flex-direction: column; gap: 16px; text-align: center; }
          .footer-team { flex-wrap: wrap; justify-content: center; }
        }
      `}</style>

      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-top">
            <div>
              <div className="footer-brand">
                <div className="footer-logo">P</div>
                <span>Proj<span style={{ color: 'var(--green-light)' }}>AI</span></span>
              </div>
              <p className="footer-tagline">
                {t.footer.tagline}
              </p>
              <div className="footer-social">
                <a href="#" className="social-link">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                </a>
                <a href="#" className="social-link">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
              </div>
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

            <div>
              <div className="footer-col-title">Stack</div>
              <ul className="footer-links">
                <li><a href="#">Next.js 14</a></li>
                <li><a href="#">Spring Boot</a></li>
                <li><a href="#">PostgreSQL</a></li>
                <li><a href="#">Gemini AI</a></li>
                <li><a href="#">Docker</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <span>2025-2026 ProjAI - EMSI</span>
            <div className="footer-team">
              <span>Abderrazik Yassine</span>
              <div className="team-divider" />
              <span>Ghazouani Abderrahman</span>
              <div className="team-divider" />
              <span>Essaoudi Soufiane</span>
            </div>
            <span>Next.js + Spring Boot + Gemini</span>
          </div>
        </div>
      </footer>
    </>
  );
}