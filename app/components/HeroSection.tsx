"use client";
import { useLanguage } from '../i18n/LanguageContext';

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <>
      <style>{`
        .hero {
          padding: 120px 24px 160px;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          overflow: hidden;
          background: var(--background);
        }
        
        /* Subtle grid background */
        .hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(0,0,0,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.02) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%);
          -webkit-mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%);
        }
        
        /* Green glow from top */
        .hero-glow {
          position: absolute;
          top: -200px;
          left: 50%;
          transform: translateX(-50%);
          width: 800px;
          height: 500px;
          background: radial-gradient(ellipse at center, var(--green-pale) 0%, transparent 60%);
          pointer-events: none;
          opacity: 0.6;
        }
        
        .hero-content {
          max-width: 900px;
          text-align: center;
          position: relative;
          z-index: 1;
          margin-bottom: 64px;
        }
        
        .hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: var(--radius-full);
          padding: 8px 8px 8px 20px;
          font-size: 14px;
          font-weight: 500;
          color: var(--muted-foreground);
          margin-bottom: 32px;
          box-shadow: var(--shadow-sm);
          animation: fadeUp 0.6s ease forwards;
        }
        
        .eyebrow-badge {
          background: var(--green);
          color: var(--white);
          border-radius: var(--radius-full);
          padding: 6px 14px;
          font-size: 12px;
          font-weight: 600;
        }
        
        .hero-title {
          font-family: var(--font-sans);
          font-size: clamp(44px, 7vw, 72px);
          font-weight: 700;
          line-height: 1.05;
          letter-spacing: -2px;
          color: var(--foreground);
          margin-bottom: 24px;
          animation: fadeUp 0.6s ease 0.1s forwards;
          opacity: 0;
        }
        
        .hero-title .highlight {
          color: var(--green);
        }
        
        .hero-desc {
          color: var(--muted-foreground);
          font-size: 18px;
          line-height: 1.7;
          max-width: 620px;
          margin: 0 auto 40px;
          animation: fadeUp 0.6s ease 0.2s forwards;
          opacity: 0;
        }
        
        .hero-actions {
          display: flex;
          gap: 14px;
          justify-content: center;
          flex-wrap: wrap;
          animation: fadeUp 0.6s ease 0.3s forwards;
          opacity: 0;
        }
        
        .btn-hero-primary {
          background: var(--foreground);
          color: var(--white);
          border: none;
          border-radius: var(--radius-lg);
          padding: 16px 32px;
          font-size: 16px;
          font-weight: 600;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
        }
        
        .btn-hero-primary:hover {
          background: var(--gray-800);
          transform: translateY(-2px);
          box-shadow: var(--shadow-xl);
        }
        
        .btn-hero-secondary {
          background: var(--white);
          color: var(--foreground);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 16px 32px;
          font-size: 16px;
          font-weight: 500;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
        }
        
        .btn-hero-secondary:hover {
          border-color: var(--gray-300);
          background: var(--muted);
        }

        /* Dashboard Preview */
        .dashboard-preview {
          width: 100%;
          max-width: 1100px;
          position: relative;
          z-index: 1;
          animation: fadeUp 0.6s ease 0.4s forwards;
          opacity: 0;
        }
        
        .dashboard-wrapper {
          position: relative;
          perspective: 2000px;
        }
        
        .dashboard-card {
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: var(--radius-2xl);
          box-shadow: var(--shadow-2xl);
          overflow: hidden;
          transform: rotateX(8deg);
          transform-origin: center top;
          transition: transform 0.5s ease;
        }
        
        .dashboard-card:hover {
          transform: rotateX(2deg);
        }
        
        .dash-topbar {
          background: var(--muted);
          border-bottom: 1px solid var(--border);
          padding: 14px 20px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .win-btn {
          width: 12px; 
          height: 12px;
          border-radius: 50%;
        }
        
        .dash-url {
          margin-left: 16px;
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--muted-foreground);
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 6px 14px;
        }
        
        .dash-body {
          display: grid;
          grid-template-columns: 220px 1fr;
          min-height: 420px;
        }
        
        /* Sidebar */
        .dash-sidebar {
          background: var(--gray-50);
          border-right: 1px solid var(--border);
          padding: 20px 0;
        }
        
        .sidebar-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0 20px 20px;
          border-bottom: 1px solid var(--border-light);
          margin-bottom: 16px;
        }
        
        .sidebar-logo-mark {
          width: 32px;
          height: 32px;
          background: linear-gradient(135deg, var(--green) 0%, var(--green-light) 100%);
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 14px;
          font-weight: 700;
          font-family: var(--font-mono);
        }
        
        .sidebar-logo-text {
          font-size: 16px;
          font-weight: 700;
          color: var(--foreground);
        }
        
        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 0 12px;
        }
        
        .sidebar-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 12px;
          border-radius: var(--radius-md);
          font-size: 13px;
          font-weight: 500;
          color: var(--muted-foreground);
          transition: all 0.15s ease;
        }
        
        .sidebar-item.active {
          background: var(--white);
          color: var(--foreground);
          box-shadow: var(--shadow-sm);
        }
        
        .sidebar-item svg {
          width: 18px;
          height: 18px;
          flex-shrink: 0;
        }
        
        /* Main content */
        .dash-main {
          padding: 24px;
          background: var(--white);
        }
        
        .dash-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }
        
        .dash-header-left h3 {
          font-size: 20px;
          font-weight: 700;
          color: var(--foreground);
          margin-bottom: 4px;
        }
        
        .dash-header-left p {
          font-size: 13px;
          color: var(--muted-foreground);
        }
        
        .dash-sprint-badge {
          font-family: var(--font-mono);
          font-size: 12px;
          font-weight: 600;
          background: var(--green-pale);
          color: var(--green);
          border: 1px solid var(--green-muted);
          border-radius: var(--radius-full);
          padding: 6px 14px;
        }
        
        /* Stats */
        .dash-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: 24px;
        }
        
        .dash-stat {
          background: var(--muted);
          border-radius: var(--radius-lg);
          padding: 16px;
        }
        
        .dash-stat-value {
          font-size: 28px;
          font-weight: 700;
          color: var(--foreground);
          letter-spacing: -1px;
        }
        
        .dash-stat-label {
          font-size: 11px;
          font-family: var(--font-mono);
          color: var(--muted-foreground);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-top: 4px;
        }
        
        /* Kanban mini */
        .kanban-mini {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }
        
        .kanban-col {
          border-radius: var(--radius-lg);
          padding: 12px;
        }
        
        .kanban-col-header {
          font-size: 10px;
          font-family: var(--font-mono);
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          margin-bottom: 10px;
        }
        
        .kanban-ticket {
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 10px;
          font-size: 12px;
          color: var(--foreground);
          font-weight: 500;
          margin-bottom: 8px;
          box-shadow: var(--shadow-xs);
        }
        
        .kanban-ticket:last-child {
          margin-bottom: 0;
        }

        /* Floating badges */
        .floating-badge {
          position: absolute;
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 12px 18px;
          font-size: 13px;
          font-weight: 600;
          box-shadow: var(--shadow-lg);
          display: flex;
          align-items: center;
          gap: 10px;
          animation: float 6s ease-in-out infinite;
          z-index: 10;
        }
        
        .floating-badge.top-right {
          top: -16px;
          right: -16px;
          color: var(--green);
          background: var(--green-pale);
          border-color: var(--green-muted);
        }
        
        .floating-badge.bottom-left {
          bottom: 40px;
          left: -24px;
          animation-delay: 2s;
        }
        
        @media (max-width: 900px) {
          .dash-body { grid-template-columns: 1fr; }
          .dash-sidebar { display: none; }
          .floating-badge { display: none; }
          .dashboard-card { transform: none; }
        }
        
        @media (max-width: 600px) {
          .hero { padding: 80px 20px 100px; }
          .dash-stats { grid-template-columns: 1fr; }
          .kanban-mini { grid-template-columns: 1fr; }
        }
      `}</style>

      <section className="hero">
        <div className="hero-glow" />
        
        <div className="hero-content">
          <div className="hero-eyebrow">
            <span>{t.hero.badge}</span>
            <span className="eyebrow-badge">{t.hero.new}</span>
          </div>

          <h1 className="hero-title text-balance">
            {t.hero.title1}<br />
            {t.hero.title2}<span className="highlight">{t.hero.title3}</span><br />
            {t.hero.title4}
          </h1>

          <p className="hero-desc text-pretty">
            {t.hero.desc}
          </p>

          <div className="hero-actions">
            <button className="btn-hero-primary">
              {t.hero.cta1}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 8h10M9 4l4 4-4 4"/>
              </svg>
            </button>
            <button className="btn-hero-secondary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--green)">
                <polygon points="5,3 19,12 5,21"/>
              </svg>
              {t.hero.cta2}
            </button>
          </div>
        </div>

        <div className="dashboard-preview">
          <div className="dashboard-wrapper">
            <div className="floating-badge top-right">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
              Gemini AI actif
            </div>
            <div className="floating-badge bottom-left">
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 12 }}>docker-compose up</span>
            </div>
            
            <div className="dashboard-card">
              <div className="dash-topbar">
                <div className="win-btn" style={{ background: "#EF4444" }} />
                <div className="win-btn" style={{ background: "#F59E0B" }} />
                <div className="win-btn" style={{ background: "#22C55E" }} />
                <div className="dash-url">localhost:3000/dashboard</div>
              </div>
              
              <div className="dash-body">
                <div className="dash-sidebar">
                  <div className="sidebar-logo">
                    <div className="sidebar-logo-mark">P</div>
                    <span className="sidebar-logo-text">ProjAI</span>
                  </div>
                  <nav className="sidebar-nav">
                    {[
                      { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>, label: "Dashboard", active: true },
                      { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>, label: "Projets" },
                      { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/></svg>, label: "Backlog" },
                      { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>, label: "Kanban" },
                      { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>, label: "Sprints" },
                      { icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>, label: "Assistant IA" },
                    ].map((item, i) => (
                      <div key={i} className={`sidebar-item ${item.active ? 'active' : ''}`}>
                        {item.icon}
                        <span>{item.label}</span>
                      </div>
                    ))}
                  </nav>
                </div>
                
                <div className="dash-main">
                  <div className="dash-header">
                    <div className="dash-header-left">
                      <h3>Sprint 2 - Semaine 3</h3>
                      <p>Projet: SI Gestion Projets</p>
                    </div>
                    <div className="dash-sprint-badge">ACTIF</div>
                  </div>
                  
                  <div className="dash-stats">
                    <div className="dash-stat">
                      <div className="dash-stat-value">24</div>
                      <div className="dash-stat-label">Tickets</div>
                    </div>
                    <div className="dash-stat">
                      <div className="dash-stat-value">17</div>
                      <div className="dash-stat-label">Completes</div>
                    </div>
                    <div className="dash-stat">
                      <div className="dash-stat-value">3</div>
                      <div className="dash-stat-label">Risques</div>
                    </div>
                  </div>
                  
                  <div className="kanban-mini">
                    <div className="kanban-col" style={{ background: 'var(--muted)', border: '1px solid var(--border)' }}>
                      <div className="kanban-col-header" style={{ color: 'var(--muted-foreground)' }}>TO DO</div>
                      <div className="kanban-ticket">CDC Form UI</div>
                      <div className="kanban-ticket">Auth Middleware</div>
                    </div>
                    <div className="kanban-col" style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.2)' }}>
                      <div className="kanban-col-header" style={{ color: '#8B5CF6' }}>IN PROGRESS</div>
                      <div className="kanban-ticket">Gemini API</div>
                      <div className="kanban-ticket">Kanban Board</div>
                    </div>
                    <div className="kanban-col" style={{ background: 'var(--green-pale)', border: '1px solid var(--green-muted)' }}>
                      <div className="kanban-col-header" style={{ color: 'var(--green)' }}>DONE</div>
                      <div className="kanban-ticket">JWT Auth</div>
                      <div className="kanban-ticket">DB Schema</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
