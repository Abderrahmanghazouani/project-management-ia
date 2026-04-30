"use client";
import { useLanguage } from '../i18n/LanguageContext';

export default function StatsBar() {
  const { t } = useLanguage();
  const stats = t.stats;

  return (
    <>
      <style>{`
        .stats-bar {
          border-top: 1px solid var(--gray-100);
          border-bottom: 1px solid var(--gray-100);
          background: var(--white);
        }
        .stats-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
        }
        .stat-item {
          padding: 48px 32px;
          border-right: 1px solid var(--gray-100);
          position: relative;
          overflow: hidden;
          transition: background 0.2s;
        }
        .stat-item:last-child { border-right: none; }
        .stat-item:hover { background: var(--gray-50); }
        .stat-item:hover .stat-value { color: var(--green); }
        .stat-item::before {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 0; height: 2px;
          background: var(--green);
          transition: width 0.3s ease;
        }
        .stat-item:hover::before { width: 100%; }
        .stat-value {
          font-family: var(--font-display);
          font-size: 64px;
          font-weight: 700;
          line-height: 1;
          color: var(--black);
          letter-spacing: -4px;
          transition: color 0.3s;
        }
        .stat-suffix {
          font-size: 28px;
          color: var(--green);
        }
        .stat-label {
          font-size: 13px;
          color: var(--gray-500);
          margin-top: 8px;
          font-weight: 400;
        }
      `}</style>

      <section className="stats-bar">
        <div className="stats-inner">
          {stats.map((s, i) => (
            <div key={s.label} className="stat-item animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
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