"use client";
import { useLanguage } from "../i18n/LanguageContext";

export default function RolesSection() {
  const { t } = useLanguage();

  const roleConfigs = [
    {
      roleId: "Client",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      ),
      color: "#22C55E"
    },
    {
      roleId: "Manager",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
      color: "#8B5CF6"
    },
    {
      roleId: "Developer",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="16,18 22,12 16,6"/>
          <polyline points="8,6 2,12 8,18"/>
        </svg>
      ),
      color: "#F59E0B"
    },
    {
      roleId: "Admin",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3"/>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
        </svg>
      ),
      color: "#EF4444"
    }
  ];

  return (
    <>
      <style>{`
        /* ... existing styles ... */
        .roles-section {
          padding: 140px 24px;
          background: var(--muted);
          position: relative;
          overflow: hidden;
        }
        
        .roles-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--border), transparent);
        }
        
        .roles-inner {
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .roles-header {
          text-align: center;
          margin-bottom: 80px;
        }
        
        .roles-eyebrow {
          font-family: var(--font-mono);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--green);
          margin-bottom: 16px;
        }
        
        .roles-title {
          font-family: var(--font-sans);
          font-size: clamp(36px, 5vw, 56px);
          font-weight: 700;
          letter-spacing: -2px;
          line-height: 1.1;
          color: var(--foreground);
          margin-bottom: 20px;
        }
        
        .roles-desc {
          font-size: 18px;
          color: var(--muted-foreground);
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.7;
        }
        
        .roles-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }
        
        .role-card {
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: var(--radius-2xl);
          padding: 36px 28px;
          position: relative;
          transition: all 0.3s ease;
          overflow: hidden;
        }
        
        .role-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: var(--card-accent);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .role-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-xl);
          border-color: var(--gray-200);
        }
        
        .role-card:hover::before {
          opacity: 1;
        }
        
        .role-icon {
          width: 64px;
          height: 64px;
          border-radius: var(--radius-xl);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
          transition: transform 0.3s ease;
        }
        
        .role-card:hover .role-icon {
          transform: scale(1.05);
        }
        
        .role-name {
          font-family: var(--font-sans);
          font-size: 22px;
          font-weight: 700;
          color: var(--foreground);
          margin-bottom: 20px;
          letter-spacing: -0.5px;
        }
        
        .role-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        
        .role-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 14px;
          color: var(--muted-foreground);
          line-height: 1.5;
        }
        
        .role-check {
          width: 18px;
          height: 18px;
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 1px;
        }
        
        @media (max-width: 1100px) {
          .roles-grid { grid-template-columns: repeat(2, 1fr); }
        }
        
        @media (max-width: 600px) {
          .roles-section { padding: 100px 20px; }
          .roles-grid { grid-template-columns: 1fr; }
          .role-card { padding: 28px 24px; }
        }
      `}</style>

      <section className="roles-section" id="roles">
        <div className="roles-inner">
          <div className="roles-header">
            <div className="roles-eyebrow">{t.roles.eyebrow}</div>
            <h2 className="roles-title text-balance">{t.roles.title}</h2>
            <p className="roles-desc">
              {t.roles.desc}
            </p>
          </div>

          <div className="roles-grid">
            {t.roles.list.map((r, idx) => {
              const config = roleConfigs[idx];
              return (
                <div 
                  key={idx} 
                  className="role-card"
                  style={{ '--card-accent': config.color } as React.CSSProperties}
                >
                  <div 
                    className="role-icon" 
                    style={{ 
                      background: `${config.color}15`,
                      color: config.color 
                    }}
                  >
                    {config.icon}
                  </div>
                  <h3 className="role-name">{r.role}</h3>
                  <ul className="role-list">
                    {r.responsibilities.map((item, i) => (
                      <li key={i} className="role-item">
                        <div 
                          className="role-check"
                          style={{ 
                            background: `${config.color}15`,
                            color: config.color 
                          }}
                        >
                          <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M2 6l3 3 5-6"/>
                          </svg>
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}