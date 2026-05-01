"use client";
import { useLanguage } from '../i18n/LanguageContext';

const trustedLogos = [
  { name: "Google", icon: "G" },
  { name: "Microsoft", icon: "M" },
  { name: "Slack", icon: "S" },
  { name: "Notion", icon: "N" },
  { name: "Figma", icon: "F" },
  { name: "Linear", icon: "L" },
];

export default function StatsBar() {
  const { t } = useLanguage();
  const stats = t.stats;

  return (
    <>
      <style>{`
        /* Trusted By Section */
        .trusted-section {
          padding: 48px 24px;
          background: var(--white);
          border-top: 1px solid var(--border-light);
          border-bottom: 1px solid var(--border-light);
        }
        
        .trusted-inner {
          max-width: 1000px;
          margin: 0 auto;
          text-align: center;
        }
        
        .trusted-label {
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: var(--muted-foreground);
          margin-bottom: 28px;
        }
        
        .trusted-logos {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 48px;
          flex-wrap: wrap;
        }
        
        .logo-item {
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--gray-400);
          font-size: 18px;
          font-weight: 700;
          letter-spacing: -0.5px;
          transition: color 0.2s ease;
        }
        
        .logo-item:hover {
          color: var(--foreground);
        }
        
        .logo-icon {
          width: 32px;
          height: 32px;
          background: var(--muted);
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: 700;
          color: var(--gray-500);
        }

        /* Stats Section */
        .stats-section {
          padding: 80px 24px;
          background: var(--foreground);
        }
        
        .stats-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 32px;
        }
        
        .stat-item {
          text-align: center;
          padding: 32px 24px;
          border-radius: var(--radius-xl);
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          transition: all 0.3s ease;
        }
        
        .stat-item:hover {
          background: rgba(255,255,255,0.06);
          border-color: rgba(255,255,255,0.1);
          transform: translateY(-4px);
        }
        
        .stat-value {
          font-family: var(--font-sans);
          font-size: 56px;
          font-weight: 800;
          line-height: 1;
          color: var(--white);
          letter-spacing: -3px;
          margin-bottom: 8px;
        }
        
        .stat-suffix {
          font-size: 32px;
          color: var(--green-light);
          font-weight: 700;
        }
        
        .stat-label {
          font-size: 14px;
          color: var(--gray-400);
          font-weight: 500;
        }
        
        @media (max-width: 900px) {
          .stats-inner {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (max-width: 600px) {
          .trusted-logos { gap: 24px; }
          .logo-item span { display: none; }
          .stats-inner { grid-template-columns: 1fr 1fr; gap: 16px; }
          .stat-value { font-size: 40px; }
        }
      `}</style>

      {/* Trusted By */}
      <section className="trusted-section">
        <div className="trusted-inner">
          <div className="trusted-label">Trusted by teams at</div>
          <div className="trusted-logos">
            {trustedLogos.map(logo => (
              <div key={logo.name} className="logo-item">
                <div className="logo-icon">{logo.icon}</div>
                <span>{logo.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-section">
        <div className="stats-inner">
          {stats.map((s, i) => (
            <div 
              key={s.label} 
              className="stat-item animate-fade-up" 
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="stat-value">
                {s.value}
                {'suffix' in s && s.suffix && <span className="stat-suffix">{s.suffix}</span>}
              </div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
